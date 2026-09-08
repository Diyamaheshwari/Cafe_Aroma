// Global UI Toast Helper
export const showToast = (message) => {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
    }, 3800);
};

// Global UI Components
const initHeader = () => {
    const header = document.querySelector('header');
    const container = header?.querySelector('.container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = currentPath === 'index.html';
    
    if (isHome) {
        header.classList.add('header-transparent');
    } else {
        header.classList.add('header-solid');
    }

    container.innerHTML = `
        <nav>
            <div class="logo">Café Aroma</div>
            <ul class="nav-links" id="navLinks">
                <li class="mobile-drawer-header">
                    <span class="mobile-drawer-ornament">✦ ~ Café Aroma Santorini ~ ✦</span>
                </li>
                <li><a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="about.html" class="${currentPath === 'about.html' ? 'active' : ''}">Our Story</a></li>
                <li><a href="menu.html" class="${currentPath === 'menu.html' ? 'active' : ''}">Full Menu</a></li>
                <li><a href="gallery.html" class="${currentPath === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
                <li><a href="contact.html" class="${currentPath === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
                <li class="mobile-book-li"><a href="book.html" class="btn btn-primary nav-mobile-book-btn">Book a Table</a></li>
                <li class="mobile-drawer-footer">
                    <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>123 Santorini Street, Downtown</p>
                    <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Mon - Sun: 7:00 AM – 11:00 PM</p>
                </li>
            </ul>
            <div class="header-btns">
                <a href="book.html" class="btn btn-primary desktop-book-btn">Book Table</a>
                <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;

    // Ensure backdrop exists
    let backdrop = document.getElementById('navBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'navBackdrop';
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    // Mobile Menu Toggle Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    const closeMenu = () => {
        if (navLinks) navLinks.classList.remove('nav-active');
        if (mobileToggle) {
            mobileToggle.classList.remove('toggle-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    const openMenu = () => {
        if (navLinks) navLinks.classList.add('nav-active');
        if (mobileToggle) {
            mobileToggle.classList.add('toggle-active');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
        if (backdrop) backdrop.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    if (mobileToggle && navLinks) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('nav-active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu on backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', closeMenu);
        }

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-active')) {
                closeMenu();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }


    // Handle Scroll Transitions
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            if (isHome) header.classList.remove('header-transparent');
        } else {
            header.classList.remove('header-scrolled');
            if (isHome) header.classList.add('header-transparent');
        }
    });
};

// Intersection Observer for Reveal on Scroll
const initReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => observer.observe(reveal));
};

const initFooter = () => {
    const footer = document.querySelector('footer');
    const container = footer?.querySelector('.container');
    if (!container) return;

    container.innerHTML = `
        <div class="footer-grid">
            <div class="footer-section">
                <h3 class="footer-logo">Café Aroma</h3>
                <p class="footer-description">A sanctuary of Mediterranean flavors and Santorini vibes. Join us for a journey of handcrafted coffee and authentic meals.</p>
                <div class="social-links">
                    <a href="#" class="social-icon">IG</a>
                    <a href="#" class="social-icon">FB</a>
                    <a href="#" class="social-icon">TW</a>
                    <a href="#" class="social-icon">WA</a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Explore</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">Our Story</a></li>
                    <li><a href="menu.html">Full Menu</a></li>
                    <li><a href="gallery.html">Visual Gallery</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Visit Us</h4>
                <ul class="footer-links">
                    <li><a href="book.html">Table Booking</a></li>
                    <li><a href="contact.html">Find Us</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Newsletter</h4>
                <p class="newsletter-desc">Join our community for exclusive offers and events.</p>
                <form id="newsletterForm">
                    <input type="email" placeholder="Email Address" required class="newsletter-input">
                    <button type="submit" class="newsletter-btn">JOIN</button>
                </form>
            </div>
        </div>

        <div class="copyright">
            &copy; 2026 Café Aroma. All rights reserved. | Designed with ❤️ in Greek Style.
        </div>
    `;

    // Handle Newsletter Submission (Simulation)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('✨ Thank you for joining our newsletter! Welcome to the Café Aroma family.');
            newsletterForm.reset();
        });
    }
};

// Menu Data & Logic
const menuData = [
    // Coffee (10)
    { name: "Signature Espresso", price: 3.50, desc: "Rich, bold, and served with a traditional Greek twist.", category: "Coffee", tags: ["Bestseller"] },
    { name: "Freddo Espresso", price: 4.50, desc: "Chilled double espresso over ice, whisked to perfection.", category: "Coffee", tags: ["New"] },
    { name: "Greek Coffee", price: 4.00, desc: "Traditional strong brew served in a briki.", category: "Coffee", tags: ["Authentic"] },
    { name: "Aegean Mocha", price: 5.50, desc: "Espresso with dark chocolate and a hint of sea salt.", category: "Coffee", tags: [] },
    { name: "Santorini Latte", price: 5.00, desc: "Smooth espresso with steamed milk and honey.", category: "Coffee", tags: [] },
    { name: "Americano", price: 3.75, desc: "Classic espresso diluted with hot water.", category: "Coffee", tags: [] },
    { name: "Flat White", price: 4.80, desc: "Velvety microfoam over a double shot of espresso.", category: "Coffee", tags: [] },
    { name: "Cappuccino", price: 4.50, desc: "Equal parts espresso, steamed milk, and foam.", category: "Coffee", tags: [] },
    { name: "Nitro Cold Brew", price: 5.25, desc: "Infused with nitrogen for a creamy, stout-like texture.", category: "Coffee", tags: [] },
    { name: "Decaf Pour Over", price: 4.25, desc: "Carefully filtered decaffeinated beans.", category: "Coffee", tags: [] },

    // Beverages (10)
    { name: "Iced Hibiscus Tea", price: 4.25, desc: "Refreshing floral tea with a touch of mint.", category: "Beverages", tags: ["Refreshing"] },
    { name: "Fresh Lemonade", price: 3.50, desc: "House-made with organic Mediterranean lemons.", category: "Beverages", tags: [] },
    { name: "Santorini Sunset", price: 6.50, desc: "Orange, pomegranate, and sparkling water mocktail.", category: "Beverages", tags: ["Chef's Choice"] },
    { name: "Sparkling Mineral Water", price: 3.00, desc: "Naturally carbonated Greek spring water.", category: "Beverages", tags: [] },
    { name: "Rose Water Fizz", price: 5.50, desc: "Sparkling water infused with organic rose petals.", category: "Beverages", tags: [] },
    { name: "Ginger Beer", price: 4.00, desc: "Spiced and effervescent house-brewed ginger tea.", category: "Beverages", tags: [] },
    { name: "Green Goddess Smoothie", price: 7.00, desc: "Spinach, apple, cucumber, and Greek honey.", category: "Beverages", tags: ["Healthy"] },
    { name: "Pineapple Mint Fix", price: 5.75, desc: "Fresh pineapple juice with crushed mint leaves.", category: "Beverages", tags: [] },
    { name: "Iced Matcha Latte", price: 6.00, desc: "Premium grade matcha with almond milk.", category: "Beverages", tags: [] },
    { name: "Double Berry Shake", price: 6.50, desc: "Strawberries and blueberries with Greek yogurt.", category: "Beverages", tags: [] },

    // Food (10)
    { name: "Classic Greek Salad", price: 12.50, desc: "Vine-ripened tomatoes, cucumbers, feta, and Kalamata olives.", category: "Food", tags: ["Authentic"] },
    { name: "Traditional Moussaka", price: 16.00, desc: "Layers of eggplant, spiced meat, and creamy béchamel.", category: "Food", tags: ["Bestseller"] },
    { name: "Lamb Gyros Plate", price: 14.50, desc: "Slow-roasted lamb with pita, tzatziki, and onions.", category: "Food", tags: [] },
    { name: "Spanakopita Pinsa", price: 13.00, desc: "Spinach and feta cheese in a crispy dough base.", category: "Food", tags: [] },
    { name: "Grilled Octopus", price: 18.50, desc: "Charred octopus with lemon, oregano, and olive oil.", category: "Food", tags: ["Premium"] },
    { name: "Aegean Lobster Pasta", price: 24.00, desc: "Spaghetti with fresh lobster and a light tomato sauce.", category: "Food", tags: ["New"] },
    { name: "Falafel Mezze", price: 11.00, desc: "Handmade falafel with hummus and pickled veggies.", category: "Food", tags: ["Vegetarian"] },
    { name: "Chicken Souvlakia", price: 13.50, desc: "Skewered char-grilled chicken with lemon rice.", category: "Food", tags: [] },
    { name: "Zucchini Fritters", price: 10.50, desc: "Crispy Kolokithokeftedes with herb yogurt dip.", category: "Food", tags: [] },
    { name: "Santorini Fava Dip", price: 9.50, desc: "Yellow split pea puree with capers and red onions.", category: "Food", tags: [] },

    // Desserts (10)
    { name: "Honey Baklava", price: 8.00, desc: "Layers of crisp filo, nuts, and aromatic Greek honey.", category: "Desserts", tags: ["Bestseller"] },
    { name: "Loukoumades", price: 7.50, desc: "Greek donuts drizzled with honey and cinnamon.", category: "Desserts", tags: ["Authentic"] },
    { name: "Galaktoboureko", price: 8.50, desc: "Semolina custard in filo pastry with lemon syrup.", category: "Desserts", tags: [] },
    { name: "Yogurt with Fig", price: 9.00, desc: "Creamy Greek yogurt with caramelized figs and walnuts.", category: "Desserts", tags: [] },
    { name: "Chocolate Tahini Tart", price: 9.50, desc: "Rich dark chocolate with a nutty tahini twist.", category: "Desserts", tags: ["Chef's Choice"] },
    { name: "Revani Cake", price: 7.00, desc: "Traditional semolina sponge cake soaked in syrup.", category: "Desserts", tags: [] },
    { name: "Rizogalo (Rice Pudding)", price: 6.50, desc: "Creamy rice pudding with a dash of cinnamon.", category: "Desserts", tags: [] },
    { name: "Kataifi Nest", price: 8.25, desc: "Shredded pastry with nuts and sweet syrup.", category: "Desserts", tags: [] },
    { name: "Orange Pie (Portokalopita)", price: 8.00, desc: "Spongy orange-infused cake with phyllo crust.", category: "Desserts", tags: ["New"] },
    { name: "Mastic Ice Cream", price: 6.00, desc: "Unique resin-flavored ice cream from Chios.", category: "Desserts", tags: [] }
];

const renderMenu = (filter = 'Coffee', query = '') => {
    const menuContent = document.getElementById('menu-content');
    if (!menuContent) return;

    const filteredItems = menuData.filter(item => {
        const matchesCategory = filter === 'All' || item.category === filter;
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                             item.desc.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    if (filteredItems.length === 0) {
        menuContent.innerHTML = `
            <div class="booklet-container" style="text-align: center; padding: 4rem 2rem;">
                <span class="booklet-ornament">✦ Search Results ✦</span>
                <h3 class="serif" style="margin-top: 0.5rem; color: #1A1A1A;">No items found matching "${query}"</h3>
                <p style="color: #666; margin-top: 0.5rem; font-size: 0.9rem;">Try searching for another specialty or select a category tab above.</p>
            </div>
        `;
        return;
    }

    // Helper to render an item row inside booklet
    const renderBookletItem = (item) => `
        <div class="booklet-item">
            <div class="booklet-item-header">
                <span class="booklet-item-title">${item.name}
                    ${item.tags.map(t => `<span class="booklet-badge" style="background-color: ${t === 'Bestseller' ? '#005EA6' : '#C5A059'}; color: white;">${t}</span>`).join('')}
                </span>
                <div class="booklet-dots"></div>
                <span class="booklet-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <p class="booklet-item-desc">${item.desc}</p>
        </div>
    `;

    // Render single category booklet view or full booklet view
    if (filter !== 'All' && !query) {
        const half = Math.ceil(filteredItems.length / 2);
        const col1 = filteredItems.slice(0, half);
        const col2 = filteredItems.slice(half);

        menuContent.innerHTML = `
            <div class="booklet-container reveal active">
                <div class="booklet-header">
                    <span class="booklet-ornament">✦ ~ Café Aroma Santorini ~ ✦</span>
                    <h2 class="booklet-chapter-title">${filter} Menu Selection</h2>
                </div>
                <div class="booklet-page-grid">
                    <div class="booklet-page-column">
                        ${col1.map(renderBookletItem).join('')}
                    </div>
                    <div class="booklet-page-column">
                        ${col2.map(renderBookletItem).join('')}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Full Booklet grouped by category
        const categories = ["Coffee", "Beverages", "Food", "Desserts"];
        const visibleCategories = filter === 'All' ? categories : Array.from(new Set(filteredItems.map(i => i.category)));

        menuContent.innerHTML = `
            <div class="booklet-container reveal active">
                <div class="booklet-header" style="margin-bottom: 3rem;">
                    <span class="booklet-ornament">✦ ~ The Complete Booklet ~ ✦</span>
                    <h2 class="booklet-chapter-title">Aegean Culinary Menu</h2>
                </div>
                ${visibleCategories.map((cat, idx) => {
                    const catItems = filteredItems.filter(i => i.category === cat);
                    if (catItems.length === 0) return '';
                    const half = Math.ceil(catItems.length / 2);
                    const col1 = catItems.slice(0, half);
                    const col2 = catItems.slice(half);
                    return `
                        <div style="margin-bottom: 3.5rem;">
                            <div style="text-align: center; margin-bottom: 2rem;">
                                <span style="font-size: 0.75rem; letter-spacing: 3px; color: #C5A059; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.3rem;">✦ Chapter 0${idx + 1} ✦</span>
                                <h3 class="serif" style="font-size: 1.5rem; color: #1A1A1A;">${cat}</h3>
                            </div>
                            <div class="booklet-page-grid">
                                <div class="booklet-page-column">
                                    ${col1.map(renderBookletItem).join('')}
                                </div>
                                <div class="booklet-page-column">
                                    ${col2.map(renderBookletItem).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initFooter();
    initReveal();

    // Menu Logic Initialization
    const menuTabs = document.querySelectorAll('.tab-btn');
    const searchInput = document.querySelector('.menu-search-input');
    
    if (menuTabs.length > 0) {
        let currentFilter = 'Coffee';
        let currentQuery = '';

        menuTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                menuTabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.innerText;
                renderMenu(currentFilter, currentQuery);
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentQuery = e.target.value;
                renderMenu(currentFilter, currentQuery);
            });
        }
    }

    // Initial Render
    if (document.getElementById('menu-content')) {
        renderMenu('Coffee');
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('✉️ Thank you! Your message has been sent to Café Aroma.');
            contactForm.reset();
        });
    }

    const reservationForm = document.getElementById('reservationForm');
    const bookingSlipContainer = document.getElementById('booking-slip-container');
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (reservationForm && bookingSlipContainer) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const bookingId = 'AROMA-' + Math.random().toString(36).substr(2, 6).toUpperCase();

            // Generate Slip HTML
            bookingSlipContainer.innerHTML = `
                <div class="booking-slip">
                    <div class="slip-header">
                        <h3 class="serif">Booking Confirmed</h3>
                        <p>ID: <strong id="slipBookingId">${bookingId}</strong></p>
                    </div>
                    <div class="slip-body">
                        <div class="slip-row">
                            <span class="slip-label">Guest</span>
                            <span class="slip-value">${name}</span>
                        </div>
                        <div class="slip-row">
                            <span class="slip-label">Phone</span>
                            <span class="slip-value">${phone}</span>
                        </div>
                        <div class="slip-row">
                            <span class="slip-label">Date</span>
                            <span class="slip-value">${date}</span>
                        </div>
                        <div class="slip-row">
                            <span class="slip-label">Time</span>
                            <span class="slip-value">${time}</span>
                        </div>
                        <div class="slip-row">
                            <span class="slip-label">Table for</span>
                            <span class="slip-value">${guests} Person(s)</span>
                        </div>
                    </div>
                    <div class="slip-footer">
                        <p style="margin-bottom: 0.5rem; font-size: 0.85rem; color: #555;">Please present this slip upon arrival.</p>
                        <div class="slip-qr" style="margin-bottom: 1.25rem;">Scan at Concierge | Café Aroma Santorini</div>
                        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                            <button class="print-btn" id="copyCodeBtn" style="background: white; border: 1.5px solid var(--aegean-blue); color: var(--aegean-blue); margin-top: 0;">Copy Code</button>
                            <button class="print-btn" style="margin-top: 0;" onclick="window.print()">Print Slip</button>
                        </div>
                        <button class="btn btn-outline" style="margin-top: 1rem; width: 100%; border-radius: 6px;" onclick="location.reload()">Book Another</button>
                    </div>
                </div>
            `;

            // Copy Code Listener
            const copyCodeBtn = document.getElementById('copyCodeBtn');
            if (copyCodeBtn) {
                copyCodeBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(bookingId).then(() => {
                        showToast(`📋 Confirmation code ${bookingId} copied to clipboard!`);
                    }).catch(() => {
                        showToast(`📋 Confirmation ID: ${bookingId}`);
                    });
                });
            }

            // Transition & Toast
            reservationForm.style.display = 'none';
            bookingSlipContainer.style.display = 'block';
            bookingSlipContainer.scrollIntoView({ behavior: 'smooth' });
            showToast('🎉 Reservation confirmed! Your digital slip is ready.');
        });
    }

    console.log('Café Aroma Website Loaded ☕🌊');
});
