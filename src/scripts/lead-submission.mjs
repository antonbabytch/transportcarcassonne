// Only an accepted POST is a lead. Opening/reloading a thank-you page is not.
export async function postLead(data, fetcher = fetch) {
  const body = new URLSearchParams();
  for (const [key, value] of data) {
    if (typeof value !== 'string') throw new Error('Unsupported form field');
    body.append(key, value);
  }
  const response = await fetcher('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error('Form was not accepted');
}

export function trackAcceptedLead(formName, language, consent, gtag, isTest = false) {
  if (consent !== 'granted' || typeof gtag !== 'function' || isTest) return false;
  // Deliberate allowlist: no name, email, phone, address, message or URL query.
  gtag('event', 'generate_lead', {
    form_name: formName,
    language,
    transport_type: 'beacon',
  });
  return true;
}

export function enhanceLeadForms() {
  if (!window.fetch || !window.FormData || !AbortSignal.timeout) return;
  const busy = new WeakSet();
  // Bubble after the wizard's own validation and derived-field updates.
  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) ||
        !['devis-transport', 'devis-intelligent'].includes(form.name)) return;
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (busy.has(form)) return;
    if (!form.reportValidity()) return;
    busy.add(form);

    const english = document.documentElement.lang.startsWith('en');
    const buttons = [...form.querySelectorAll('button[type="submit"]')];
    const originalButtons = buttons.map(button => ({ button, text: button.textContent, disabled: button.disabled }));
    form.setAttribute('aria-busy', 'true');
    buttons.forEach(button => { button.disabled = true; button.textContent = english ? 'Sending…' : 'Envoi en cours…'; });
    let status = form.querySelector('.lead-submit-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'lead-submit-status';
      status.setAttribute('role', 'alert');
      status.tabIndex = -1;
      form.append(status);
    }
    status.hidden = true;

    try {
      const data = new FormData(form);
      await postLead(data);
      // Analytics/storage failures must never turn an accepted lead into a retry.
      try {
        trackAcceptedLead(form.name, english ? 'en' : 'fr', localStorage.getItem('cc-consent'), window.gtag,
          new URLSearchParams(window.location.search).get('qa') === '1');
      } catch { /* Analytics is optional; delivery has already succeeded. */ }
      window.location.assign(form.action);
    } catch {
      busy.delete(form);
      form.removeAttribute('aria-busy');
      originalButtons.forEach(({ button, text, disabled }) => { button.disabled = disabled; button.textContent = text; });
      status.textContent = english
        ? 'We could not confirm receipt. Your details are still here. Check your connection and try again, or call +33 6 80 87 30 47. If a previous attempt reached us, please mention it to avoid a duplicate.'
        : 'La réception n’a pas pu être confirmée. Vos informations sont conservées à l’écran. Vérifiez votre connexion et réessayez, ou appelez le 06 80 87 30 47. Signalez une tentative précédente pour éviter les doublons.';
      status.hidden = false;
      status.focus();
    }
  });
}
