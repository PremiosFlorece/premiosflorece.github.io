// Modern form validation replacement for Bootstrap 5
// Replaces the old jqBootstrapValidation library

$(function() {
    'use strict';
    
    // Only initialize if forms exist
    const forms = document.querySelectorAll('form[novalidate]');
    if (forms.length === 0) return;
    
    console.log('[Form Validation] Initializing modern validation for', forms.length, 'forms');
    
    // Add Bootstrap 5 validation classes
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                console.log('[Form Validation] Form validation failed');
                return false;
            }
            
            form.classList.add('was-validated');
            console.log('[Form Validation] Form validation passed');
            
            // Handle form submission here if needed
            // For now, just log success
            if (typeof window.handleFormSubmit === 'function') {
                window.handleFormSubmit(form);
            }
        }, false);
    });
    
    // Add real-time validation feedback
    $('input, textarea').on('blur change', function() {
        const field = $(this)[0];
        const feedback = field.closest('.floating-label-form-group')?.querySelector('.invalid-feedback');
        
        if (!field.checkValidity()) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (feedback) {
                feedback.style.display = 'block';
            }
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (feedback) {
                feedback.style.display = 'none';
            }
        }
    });
    
    console.log('[Form Validation] Modern validation initialized successfully');
});
