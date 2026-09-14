// Upgrade consecutive Ghost Toggle cards to accessible, exclusive accordions.
// Replacing the wrappers also removes Ghost's click handlers, avoiding a double toggle.
document.querySelectorAll('.gh-content').forEach((content) => {
  // Older articles use H2 FAQ / H3 question / body instead of Toggle cards.
  // Normalize only explicitly titled FAQ sections; other article headings stay intact.
  content.querySelectorAll(':scope > h2').forEach((heading) => {
    if (!/^(자주\s*묻는\s*질문|FAQ)$/i.test(heading.textContent.trim())) return;
    let question = heading.nextElementSibling;
    while (question && !question.matches('h1, h2')) {
      if (!question.matches('h3')) {
        question = question.nextElementSibling;
        continue;
      }
      const nodes = [];
      let next = question.nextSibling;
      while (next && !(next.nodeType === 1 && next.matches('h1, h2, h3, .kg-toggle-card'))) {
        nodes.push(next);
        next = next.nextSibling;
      }
      if (nodes.some((node) => node.nodeType === 1 || node.textContent.trim())) {
        const card = document.createElement('div');
        card.className = 'kg-toggle-card';
        if (question.id) card.id = question.id;
        const title = document.createElement('div');
        title.className = 'kg-toggle-heading-text';
        title.append(...question.childNodes);
        const answer = document.createElement('div');
        answer.className = 'kg-toggle-content';
        answer.append(...nodes);
        card.append(title, answer);
        question.replaceWith(card);
      }
      question = next?.nodeType === 1 ? next : next?.nextElementSibling;
    }
  });

  let group = [];
  let previousCard;
  content.querySelectorAll('.kg-toggle-card').forEach((card) => {
    const title = card.querySelector('.kg-toggle-heading-text');
    const answer = card.querySelector('.kg-toggle-content');
    if (!title || !answer) return;
    if (card.previousElementSibling !== previousCard) group = [];

    const details = document.createElement('details');
    details.className = 'kg-card jikji-faq-item';
    if (card.id) details.id = card.id;
    const summary = document.createElement('summary');
    summary.className = 'jikji-faq-question';
    const label = document.createElement('span');
    label.append(...title.childNodes);
    summary.append(label);
    answer.classList.remove('kg-toggle-content');
    answer.classList.add('jikji-faq-answer');
    details.append(summary, answer);
    details.open = group.length === 0;
    group.push(details);
    const siblings = group;
    // Close peers synchronously, including browsers without details[name] support.
    summary.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      event.preventDefault();
      const opening = !details.open;
      siblings.forEach((item) => { item.open = item === details && opening; });
    });
    card.replaceWith(details);
    previousCard = details;
  });
});
