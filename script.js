/**
 * FixIt Pro - Landing Page Script
 * Form validation with domain verification for service requests
 */

(function () {
    'use strict';

    // ===== Mobile Navigation =====
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav--open');
            navToggle.setAttribute('aria-expanded', nav.classList.contains('nav--open'));
        });

        // Close nav when clicking a link
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('nav--open'));
        });
    }

    // ===== Disposable/Invalid Email Domains (Domain Verification) =====
    const DISPOSABLE_DOMAINS = [
        'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
        'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
        'yopmail.com', 'maildrop.cc', 'getnada.com', 'tempail.com',
        'sharklasers.com', 'guerrillamail.info', 'grr.la', 'spam4.me',
        'dispostable.com', 'mailnesia.com', 'mohmal.com', 'emailondeck.com',
        'tempinbox.com', 'inboxkitten.com', 'anonymbox.com', 'mytemp.email',
        'tmpeml.com', 'tempmailo.com', 'discard.email', 'disposable.com',
        'example.com', 'test.com', 'localhost', 'invalid.com'
    ];

    // Common valid US/legitimate domains (whitelist for reference - we block bad, not restrict good)
    const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

    function getEmailDomain(email) {
        const parts = email.trim().toLowerCase().split('@');
        return parts.length === 2 ? parts[1] : null;
    }

    function isDisposableEmail(email) {
        const domain = getEmailDomain(email);
        if (!domain) return true;
        return DISPOSABLE_DOMAINS.some(d => domain === d || domain.endsWith('.' + d));
    }

    function isValidEmailFormat(email) {
        return VALID_EMAIL_REGEX.test(email.trim());
    }

    function validateEmailDomain(email) {
        if (!email || !email.trim()) return { valid: false, message: 'Email is required.' };
        if (!isValidEmailFormat(email)) return { valid: false, message: 'Please enter a valid email address.' };
        if (isDisposableEmail(email)) return { valid: false, message: 'Please use a permanent email address. Temporary/disposable emails are not accepted.' };
        return { valid: true };
    }

    // ===== US Phone Validation =====
    function formatPhone(value) {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits.replace(/(\d{0,3})/, '($1');
        if (digits.length <= 6) return digits.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        return digits.replace(/(\d{3})(\d{3})(\d{0,4})/, '($1) $2-$3').slice(0, 14);
    }

    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        if (digits.length < 10) return { valid: false, message: 'Please enter a valid 10-digit US phone number.' };
        if (digits.length > 10) return { valid: false, message: 'Phone number is too long.' };
        return { valid: true };
    }

    // ===== Form Validation =====
    const form = document.getElementById('service-form');
    const formSuccess = document.getElementById('form-success');

    const validators = {
        firstName: (v) => {
            if (!v || v.trim().length < 2) return 'First name must be at least 2 characters.';
            if (v.trim().length > 50) return 'First name is too long.';
            return null;
        },
        lastName: (v) => {
            if (!v || v.trim().length < 2) return 'Last name must be at least 2 characters.';
            if (v.trim().length > 50) return 'Last name is too long.';
            return null;
        },
        email: (v) => {
            const result = validateEmailDomain(v);
            return result.valid ? null : result.message;
        },
        phone: (v) => {
            const result = validatePhone(v);
            return result.valid ? null : result.message;
        },
        address: (v) => {
            if (!v || v.trim().length < 5) return 'Please enter a valid street address (at least 5 characters).';
            return null;
        },
        appliance: (v) => {
            if (!v) return 'Please select an appliance type.';
            return null;
        },
        description: (v) => {
            if (!v || v.trim().length < 20) return 'Please describe the issue in at least 20 characters.';
            return null;
        },
        terms: (v) => {
            if (!v) return 'You must agree to the terms and privacy policy.';
            return null;
        }
    };

    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (input && errorEl) {
            input.classList.add('error');
            errorEl.textContent = message || '';
        }
    }

    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (input && errorEl) {
            input.classList.remove('error');
            errorEl.textContent = '';
        }
    }

    function clearAllErrors() {
        Object.keys(validators).forEach(key => {
            const fieldId = key === 'terms' ? 'terms' : key;
            clearError(fieldId);
        });
    }

    // Phone formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }

    // Real-time validation on blur
    ['firstName', 'lastName', 'email', 'phone', 'address', 'appliance', 'description'].forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('blur', () => {
                const validator = validators[fieldId];
                if (validator) {
                    const msg = validator(input.value);
                    if (msg) showError(fieldId, msg);
                    else clearError(fieldId);
                }
            });
        }
    });

    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            const msg = validators.terms(termsCheckbox.checked);
            if (msg) showError('terms', msg);
            else clearError('terms');
        });
    }

    // Form submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearAllErrors();

            const fields = [
                { id: 'firstName', value: document.getElementById('firstName')?.value },
                { id: 'lastName', value: document.getElementById('lastName')?.value },
                { id: 'email', value: document.getElementById('email')?.value },
                { id: 'phone', value: document.getElementById('phone')?.value },
                { id: 'address', value: document.getElementById('address')?.value },
                { id: 'appliance', value: document.getElementById('appliance')?.value },
                { id: 'description', value: document.getElementById('description')?.value },
                { id: 'terms', value: document.getElementById('terms')?.checked }
            ];

            let hasError = false;
            fields.forEach(({ id, value }) => {
                const validator = validators[id];
                if (validator) {
                    const msg = validator(value);
                    if (msg) {
                        showError(id, msg);
                        hasError = true;
                    }
                }
            });

            if (hasError) {
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            // Success - hide form, show success message
            form.hidden = true;
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
})();
