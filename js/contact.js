// js/contact.js — Contact form validation

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Clear error on each field as user types
  ['name', 'email', 'phone', 'message'].forEach(id => {
    const el = form.elements[id];
    if (el) el.addEventListener('input', () => clearError(id));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.elements['name'].value.trim();
    const email   = form.elements['email'].value.trim();
    const phone   = form.elements['phone'].value.trim();
    const message = form.elements['message'].value.trim();

    let valid = true;

    if (!name) {
      showError('name', 'Full name is required.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Email address is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!phone) {
      showError('phone', 'Phone number is required.');
      valid = false;
    } else if (!isDigitsOnly(phone)) {
      showError('phone', 'Phone number must contain digits only.');
      valid = false;
    }

    if (!message) {
      showError('message', 'Message is required.');
      valid = false;
    }

    if (!valid) return;

    // Show success feedback
    const successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.textContent = `Thanks, ${name}! Your message has been received.`;
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
    setTimeout(() => { if (successEl) successEl.hidden = true; }, 6000);
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showError(fieldId, msg) {
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) { errEl.textContent = msg; errEl.hidden = false; }
    const field = document.getElementById(fieldId);
    if (field) field.setAttribute('aria-invalid', 'true');
  }

  function clearError(fieldId) {
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
    const field = document.getElementById(fieldId);
    if (field) field.removeAttribute('aria-invalid');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isDigitsOnly(phone) {
    return /^\d+$/.test(phone);
  }
});
