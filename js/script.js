// AI Bible Study - Interactive JavaScript

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupScrollAnimations();
    setupStudyThemes();
    setupPromptCopying();
    setupActiveNavigation();
    setupSmoothScrolling();
    setupAnalysisPanel();
    
    console.log('AI Bible Study app initialized successfully!');
}

// ===== NAVIGATION FUNCTIONS =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1));
        });
    });
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active navigation on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
            }
        });
        
        // Close mobile menu when clicking nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80; // Account for fixed navigation
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function setupSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step-card, .feature-card, .study-theme');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== STUDY THEMES FUNCTIONALITY =====
function setupStudyThemes() {
    const studyThemes = document.querySelectorAll('.study-theme');
    
    studyThemes.forEach(theme => {
        theme.addEventListener('click', function() {
            const themeName = this.getAttribute('data-theme');
            showAIAnalysis(themeName);
            
            // Update active state
            studyThemes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupAnalysisPanel() {
    const closeBtn = document.getElementById('close-analysis');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideAIAnalysis();
        });
    }
}

function showAIAnalysis(theme) {
    const panel = document.getElementById('ai-analysis-panel');
    const themeTitle = document.getElementById('current-theme');
    const content = document.getElementById('ai-content');
    
    if (!panel || !themeTitle || !content) return;
    
    // Theme content data
    const themeContent = {
        love: {
            title: "God's Love",
            content: `
                <div class="space-y-4">
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">🔍 Key Insight</h5>
                        <p>The Greek word "agapao" used here represents unconditional, sacrificial love - not based on merit but on God's character.</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">💡 AI Prompt to Try</h5>
                        <p class="font-mono text-sm bg-white/20 p-3 rounded">"Explain the difference between 'agapao' (God's love in John 3:16) and other types of love mentioned in Scripture. How does this affect my understanding of being loved by God?"</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">📖 Cross References</h5>
                        <p>Romans 5:8, 1 John 4:9-10, Ephesians 2:4-5</p>
                    </div>
                </div>
            `
        },
        sacrifice: {
            title: "Divine Sacrifice",
            content: `
                <div class="space-y-4">
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">🔍 Key Insight</h5>
                        <p>"Only begotten" (monogenes) emphasizes Jesus' unique relationship with the Father - one of a kind, irreplaceable.</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">💡 AI Prompt to Try</h5>
                        <p class="font-mono text-sm bg-white/20 p-3 rounded">"What does it mean that God 'gave' His Son? Explore the theological implications of this sacrifice and what it cost the Father."</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">📖 Cross References</h5>
                        <p>Isaiah 53:10, Romans 8:32, 2 Corinthians 5:21</p>
                    </div>
                </div>
            `
        },
        belief: {
            title: "Faith & Belief",
            content: `
                <div class="space-y-4">
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">🔍 Key Insight</h5>
                        <p>"Believeth" (pisteuo) implies ongoing trust and commitment, not just intellectual agreement.</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">💡 AI Prompt to Try</h5>
                        <p class="font-mono text-sm bg-white/20 p-3 rounded">"What's the difference between believing about Jesus and believing in Jesus? How does true biblical faith manifest in daily life?"</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">📖 Cross References</h5>
                        <p>John 1:12, Romans 10:9-10, James 2:19</p>
                    </div>
                </div>
            `
        },
        eternal: {
            title: "Eternal Life",
            content: `
                <div class="space-y-4">
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">🔍 Key Insight</h5>
                        <p>"Everlasting life" (aionios zoe) isn't just about duration but quality - God's own kind of life, starting now.</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">💡 AI Prompt to Try</h5>
                        <p class="font-mono text-sm bg-white/20 p-3 rounded">"How does eternal life begin now, not just in the future? What does it mean to have 'God's kind of life' today?"</p>
                    </div>
                    <div class="bg-white/10 p-4 rounded-lg">
                        <h5 class="font-semibold mb-2">📖 Cross References</h5>
                        <p>John 17:3, 1 John 5:13, John 10:10</p>
                    </div>
                </div>
            `
        }
    };
    
    const selectedTheme = themeContent[theme];
    if (selectedTheme) {
        themeTitle.textContent = selectedTheme.title;
        content.innerHTML = selectedTheme.content;
        
        panel.classList.remove('hidden');
        
        // Smooth scroll to panel
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function hideAIAnalysis() {
    const panel = document.getElementById('ai-analysis-panel');
    const studyThemes = document.querySelectorAll('.study-theme');
    
    if (panel) {
        panel.classList.add('hidden');
    }
    
    // Remove active states
    studyThemes.forEach(theme => {
        theme.classList.remove('active');
    });
}

// ===== PROMPT COPYING FUNCTIONALITY =====
function setupPromptCopying() {
    // Add event listeners to all copy buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('button') && e.target.closest('button').textContent.includes('Copy')) {
            const button = e.target.closest('button');
            const promptElement = button.previousElementSibling;
            
            if (promptElement && promptElement.classList.contains('font-mono')) {
                copyPrompt(button);
            }
        }
    });
}

function copyPrompt(button) {
    // Find the prompt text (previous sibling with font-mono class)
    const promptElement = button.parentElement.querySelector('.font-mono, p.font-mono');
    
    if (!promptElement) {
        console.error('Prompt element not found');
        return;
    }
    
    const promptText = promptElement.textContent.trim();
    
    // Copy to clipboard
    navigator.clipboard.writeText(promptText).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        button.classList.add('bg-green-600', 'hover:bg-green-700');
        button.classList.remove('bg-white/20', 'hover:bg-white/30', 'text-purple-600', 'hover:text-purple-800');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('bg-green-600', 'hover:bg-green-700');
            if (button.classList.contains('text-purple-600')) {
                button.classList.add('text-purple-600', 'hover:text-purple-800');
            } else {
                button.classList.add('bg-white/20', 'hover:bg-white/30');
            }
        }, 2000);
        
        // Show toast notification
        showToast('Prompt copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy prompt:', err);
        showToast('Failed to copy. Please try again.', 'error');
    });
}

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform translate-x-full transition-all duration-300 ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PROGRESSIVE ENHANCEMENT =====
function enhanceForAccessibility() {
    // Add ARIA labels and roles where needed
    const interactiveElements = document.querySelectorAll('button, .study-theme, .prompt-template');
    
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent.trim().substring(0, 50);
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could implement error reporting here
});

// ===== SCROLL TO TOP =====
function addScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'fixed bottom-6 right-6 bg-bible-blue hover:bg-blue-800 text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }, 100));
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    addScrollToTop();
    enhanceForAccessibility();
    lazyLoadImages();
});

// ===== ANALYTICS AND TRACKING =====
function trackInteraction(action, element) {
    // Placeholder for analytics tracking
    console.log(`User interaction: ${action} on ${element}`);
    // Could integrate with Google Analytics, etc.
}

// Add interaction tracking
document.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        trackInteraction('click', 'button');
    }
    if (e.target.closest('.study-theme')) {
        trackInteraction('click', 'study-theme');
    }
});

// ===== SERVICE WORKER REGISTRATION (PWA READY) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register service worker here for PWA functionality
        console.log('Service Worker support detected');
    });
}

console.log('🙏 AI Bible Study JavaScript loaded successfully!');