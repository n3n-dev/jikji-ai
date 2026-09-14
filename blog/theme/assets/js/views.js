// No requests or visitor storage until an endpoint is explicitly configured.
(async () => {
  const element = document.querySelector('[data-article-views]');
  if (!element || !element.dataset.viewsEndpoint || /\/p\//.test(location.pathname)) return;
  try {
    const endpoint = new URL(element.dataset.viewsEndpoint, location.origin);
    if (endpoint.protocol !== 'https:' && !(location.origin === 'http://localhost:2368' && endpoint.origin === 'http://localhost:2369')) return;
    const key = 'jikji-view-visitor';
    let visitor = localStorage.getItem(key);
    if (!/^[a-f0-9-]{36}$/.test(visitor || '')) {
      visitor = crypto.randomUUID();
      localStorage.setItem(key, visitor);
    }
    const shareCount = document.querySelector('[data-share-count]');
    const format = new Intl.NumberFormat('ko-KR');
    // Serialize the initial view and later shares so stale replies cannot
    // overwrite newer totals. The server enforces 30-minute deduplication.
    let pending = Promise.resolve();
    function send(action) {
      pending = pending.then(async () => {
        try {
          const response = await fetch(endpoint.href, {
            method:'POST', headers:{'Content-Type':'application/json'}, credentials:'omit',
            body:JSON.stringify({postId:element.dataset.postId, visitor, action}),
            signal:AbortSignal.timeout(5000)
          });
          if (!response.ok) return;
          const {views, shares} = await response.json();
          if (Number.isSafeInteger(views) && views >= 1) {
            element.querySelector('[data-view-label]').textContent = '조회수 ' + format.format(views);
            element.hidden = false;
          }
          if (shareCount && Number.isSafeInteger(shares) && shares >= 0) {
            shareCount.textContent = format.format(shares);
            shareCount.setAttribute('aria-label', '링크 복사 ' + format.format(shares) + '회');
            shareCount.hidden = false;
          }
        } catch {
          // Keep sharing usable when counting is offline. No automatic retry.
        }
      });
      return pending;
    }
    document.addEventListener('jikji:share-copied', () => { void send('share'); });
    await send('view');
  } catch {
    // Storage/network unavailable: omit the count, never fabricate a zero.
  }
})();
