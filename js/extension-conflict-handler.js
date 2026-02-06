// Extension conflict handler
// This script detects and handles conflicts with browser extensions
// that might inject security libraries like SES/lockdown

(function() {
    'use strict';
    
    // Check for extension conflicts
    function checkExtensionConflicts() {
        const conflicts = [];
        
        // Check for SES/lockdown
        if (typeof window.lockdown !== 'undefined') {
            conflicts.push('SES Lockdown detected');
        }
        
        // Check for common extension modifications
        if (window.chrome && window.chrome.runtime) {
            conflicts.push('Chrome extension runtime detected');
        }
        
        // Check for ad blockers that might inject security scripts
        if (typeof window.uBlock !== 'undefined' || typeof window.AdguardSettings !== 'undefined') {
            conflicts.push('Ad blocker security scripts detected');
        }
        
        if (conflicts.length > 0) {
            console.info('[Security] Extension conflicts detected:', conflicts.join(', '));
            console.info('[Security] These are normal and will be handled gracefully');
        }
        
        return conflicts.length === 0;
    }
    
    // Handle extension-injected errors gracefully
    function setupExtensionErrorHandling() {
        // Override console.error to filter extension noise
        const originalError = console.error;
        console.error = function(...args) {
            const message = args.join(' ');
            const isExtensionError = [
                'lockdown-install',
                'SES removing',
                'removing intrinsics',
                'MapPrototype',
                'DatePrototype',
                'chrome-extension',
                'moz-extension'
            ].some(pattern => message.includes(pattern));
            
            if (!isExtensionError) {
                originalError.apply(console, args);
            }
        };
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            checkExtensionConflicts();
            setupExtensionErrorHandling();
        });
    } else {
        checkExtensionConflicts();
        setupExtensionErrorHandling();
    }
})();
