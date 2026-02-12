/**
 * Tuskers Cricket Club - Main JavaScript
 * Handles shared functionality like navigation, footer, and dark mode.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    injectHeader();
    injectFooter();
    highlightActiveLink();
});

/**
 * Dark Mode Toggle
 */
function initDarkMode() {
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle';
    themeToggleBtn.innerHTML = '🌙'; // Default icon
    themeToggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Auto-detect system preference
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // We'll append this to the nav once the header is injected
    window.themeToggleBtn = themeToggleBtn;
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    // Logic to toggle the .nav-links class on mobile
    // This will be attached after header injection
}

/**
 * Inject Shared Header
 */
function injectHeader() {
    const headerHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">Tuskers CC</a>
                <button class="hamburger" aria-label="Menu">☰</button>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="matches.html">Matches</a>
                    <a href="players.html">Players</a>
                    <a href="events.html">Events</a>
                    <a href="contact.html">Contact</a>
                </div>
            </nav>
        </div>
    `;
    
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        
        // Attach Dark Mode Toggle to Nav
        const navLinks = headerElement.querySelector('.nav-links');
        if (window.themeToggleBtn) {
            navLinks.appendChild(window.themeToggleBtn);
        }

        // Attach Mobile Menu Listener
        const hamburger = headerElement.querySelector('.hamburger');
        const navLinksContainer = headerElement.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('show');
            hamburger.innerHTML = navLinksContainer.classList.contains('show') ? '✕' : '☰';
        });
    }
}

/**
 * Inject Shared Footer
 */
function injectFooter() {
    const currentYear = new Date().getFullYear();
    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Tuskers Cricket Club</h4>
                    <p>Saskatoon, Saskatchewan</p>
                    <p>Est. 2012 (Re-est. 2022)</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="matches.html">Matches</a></li>
                        <li><a href="players.html">Join the Team</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📷</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${currentYear} Tuskers Cricket Club. All rights reserved.</p>
            </div>
        </div>
    `;
    
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}

/**
 * Highlight Active Link
 */
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
