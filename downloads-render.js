/* =========================================================================
   KYRO — js/downloads-render.js
   Builds every download card on the Downloads page from the data in
   /data/downloads.js. Nothing here should need editing when you add,
   remove, or update an app — just edit the data file.

   Runs on DOMContentLoaded, and (important) this script tag must be
   included BEFORE js/script.js in downloads.html, so the cards already
   exist in the DOM by the time script.js wires up scroll-reveal and
   the search/filter toolbar.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('downloadsGrid');

  if (!grid) return;

  if (typeof downloads === 'undefined' || !downloads || typeof downloads !== 'object') {
    console.error('KYRO downloads: /data/downloads.js was not found or is invalid.');
    return;
  }

  const FALLBACK_ICON = 'assets/icons/placeholder.svg';
  const keys = Object.keys(downloads);
  const noResults = grid.querySelector('.no-results');

  keys.forEach((key, index) => {
    const app = downloads[key];
    if (!app || typeof app !== 'object') return;

    const card = buildCard(app, index);
    if (noResults) {
      grid.insertBefore(card, noResults);
    } else {
      grid.appendChild(card);
    }
  });

  function buildCard(app, index) {
    const title = app.title || 'Untitled';
    const version = app.version || '—';
    const category = (app.category || 'app').toLowerCase();
    const description = app.description || '';
    const icon = app.icon || FALLBACK_ICON;
    const badge = app.badge || '';
    const openLink = app.openLink || '#';
    const downloadLink = app.downloadLink || '#';

    const card = document.createElement('div');
    card.className = 'download-card glow-border reveal' + (index % 3 !== 0 ? ' reveal-delay-' + (index % 3) : '');
    card.dataset.name = title;
    card.dataset.category = category;

    const thumb = document.createElement('div');
    thumb.className = 'download-thumb';

    if (badge) {
      const badgeWrap = document.createElement('div');
      badgeWrap.className = 'download-badges';
      badgeWrap.innerHTML = `<span class="badge badge-primary">${escapeHTML(badge)}</span>`;
      thumb.appendChild(badgeWrap);
    }

    const img = document.createElement('img');
    img.src = icon;
    img.alt = `${title} icon`;
    img.loading = 'lazy';
    img.onerror = function () {
      this.onerror = null;
      this.src = FALLBACK_ICON;
    };
    thumb.appendChild(img);

    const body = document.createElement('div');
    body.className = 'download-body';
    body.innerHTML = `
      <h3>${escapeHTML(title)} <span class="badge badge-muted">${escapeHTML(capitalize(category))}</span></h3>
      <p>${escapeHTML(description)}</p>
      <div class="download-version">
        <span>Version</span>
        <strong>${escapeHTML(version)}</strong>
      </div>
      <div class="download-actions">
        <a href="${escapeAttr(downloadLink)}" class="btn btn-primary">
          <i class="fa-solid fa-download"></i> Download
        </a>
        <a href="${escapeAttr(openLink)}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Link
        </a>
      </div>
    `;

    card.appendChild(thumb);
    card.appendChild(body);
    return card;
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }
});
