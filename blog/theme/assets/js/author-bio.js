// Ghost Bio convention: optional department | introduction.
// Without JavaScript the full, escaped Bio remains readable.
document.querySelectorAll('[data-author-profile]').forEach((profile) => {
  const bio = profile.querySelector('[data-author-bio]');
  if (!bio) return;
  const text = bio.textContent.trim();
  const separator = text.indexOf('|');
  const team = profile.querySelector('[data-author-team]');
  if (separator >= 0) {
    team.textContent = text.slice(0, separator).trim();
    team.hidden = !team.textContent;
    bio.textContent = text.slice(separator + 1).trim();
  } else {
    bio.textContent = text;
  }
  bio.hidden = !bio.textContent;
});
