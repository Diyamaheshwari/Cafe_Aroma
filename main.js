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
                <li><a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="about.html" class="${currentPath === 'about.html' ? 'active' : ''}">About</a></li>
                <li><a href="menu.html" class="${currentPath === 'menu.html' ? 'active' : ''}">Menu</a></li>
                <li><a href="gallery.html" class="${currentPath === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
                <li><a href="contact.html" class="${currentPath === 'contact.html' ? 'active' : ''}">Contact</a></li>
            </ul>
            <div class="header-btns">
                <a href="book.html" class="btn btn-primary">Book Table</a>
                <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;

    // Mobile Menu Toggle Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileToggle.classList.toggle('toggle-active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileToggle.classList.remove('toggle-active');
                document.body.classList.remove('no-scroll');
            });
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
                <p style="color: var(--text-light); max-width: 300px;">A sanctuary of Mediterranean flavors and Santorini vibes. Join us for a journey of handcrafted coffee and authentic meals.</p>
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
                <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 1rem;">Join our community for exclusive offers and events.</p>
                <form id="newsletterForm" style="display: flex; gap: 0.5rem;">
                    <input type="email" placeholder="Email Address" required style="flex: 1; padding: 0.6rem; border: 1px solid #ddd; border-radius: 4px;">
                    <button type="submit" class="btn btn-primary" style="padding: 0.6rem 1rem; font-size: 0.8rem;">JOIN</button>
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
            alert('Thank you for joining our newsletter! Welcome to the Café Aroma family.');
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
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 class="serif">No dishes found matching "${query}"</h3>
                <p>Try searching for something else or browse another category.</p>
            </div>
        `;
        return;
    }

    menuContent.innerHTML = `
        <div class="menu-grid">
            ${filteredItems.map(item => `
                <div class="menu-card">
                    <div>
                        <div class="menu-card-header">
                            <h3>${item.name}</h3>
                            <div class="dots"></div>
                            <span class="menu-card-price">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="menu-card-desc">${item.desc}</p>
                    </div>
                    <div class="menu-card-footer">
                        ${item.tags.map(tag => `<span class="badge" style="background-color: ${tag === 'Bestseller' ? 'var(--aegean-blue)' : 'var(--soft-gold)'}">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
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
                        <p>ID: ${bookingId}</p>
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
                        <p>Please present this slip upon arrival.</p>
                        <div class="slip-qr">Scan at Concierge | Café Aroma Santorini</div>
                        <button class="print-btn" onclick="window.print()">Print Slip</button>
                        <button class="btn btn-outline" style="margin-top: 1rem; width: 100%;" onclick="location.reload()">Book Another</button>
                    </div>
                </div>
            `;

            // Transition
            reservationForm.style.display = 'none';
            bookingSlipContainer.style.display = 'block';
            bookingSlipContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    console.log('Café Aroma Website Loaded ☕🌊');
});
