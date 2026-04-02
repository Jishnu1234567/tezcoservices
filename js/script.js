// ── 1. NAVIGATION, ANIMATIONS & SLIDERS ──
(function() {
    const setupUI = () => {
        const ham = document.getElementById('hamburger');
        const mob = document.getElementById('mobileMenu');
        const nav = document.getElementById('navbar');

        // 1. Navbar Scroll Effect
        window.onscroll = () => {
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
        };

        // 2. Mobile Menu Toggle
        if (ham && mob) {
            ham.onclick = (e) => {
                e.preventDefault();
                ham.classList.toggle('open');
                mob.classList.toggle('open');
                document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : 'auto';
            };

            mob.querySelectorAll('a').forEach(link => {
                link.onclick = () => {
                    ham.classList.remove('open');
                    mob.classList.remove('open');
                    document.body.style.overflow = 'auto';
                };
            });
        }

        // 3. REVEAL ON SCROLL (This fixes your missing data/sections)
        const revealEls = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => observer.observe(el));

        // 4. HERO SLIDERS
        const initSliders = () => {
            const mainSlides = document.querySelectorAll('.hero-img-slider img');
            if (mainSlides.length > 0) {
                let current = 0;
                setInterval(() => {
                    mainSlides[current].classList.remove('active');
                    current = (current + 1) % mainSlides.length;
                    mainSlides[current].classList.add('active');
                }, 5000);
            }
        };
        initSliders();
    };

    if (document.readyState === 'complete') {
        setupUI();
    } else {
        window.addEventListener('load', setupUI);
    }
})();

// ── 2. CONFIG ──
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://your-backend.up.railway.app';

// ── 3. TOAST HELPER ──
function showToast(msg, type = 'ok') {
    const t = document.getElementById('toast');
    if (!t) { alert(msg); return; }
    t.textContent = msg;
    t.className = 'show' + (type === 'error' ? ' error' : '');
    setTimeout(() => t.className = '', 4000);
}

// ── 4. FORM HANDLER (Left Untouched) ──
async function handleForm(formId, endpoint, statusId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById(statusId);
        const originalBtnText = btn.innerHTML;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        btn.disabled = true;
        btn.innerHTML = "Sending...";

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            if (result.success) {
                showToast("Success!");
                form.reset();
                
                if (statusDiv) statusDiv.innerHTML = "<p style='color:#22c55e;'>✓ Submitted successfully!</p>";

                if (formId === 'contactForm') {
                    form.style.display = 'none';
                    const successCard = document.getElementById('formSuccess');
                    if (successCard) successCard.classList.add('show');
                }

                if (formId === 'collegeForm') {
                    const grid = form.querySelector('.form-grid');
                    if (grid) grid.style.display = 'none';
                    btn.style.display = 'none';
                    if (statusDiv) {
                        statusDiv.innerHTML = `
                            <div style="text-align:center; padding:20px; background:#f0f9ff; border:1px solid #00C8FF; border-radius:10px;">
                                <h3 style="color:#0088bb;">Application Received!</h3>
                                <p>We will contact you shortly.</p>
                            </div>`;
                    }
                }
            } else {
                throw new Error(result.message || "Failed");
            }
        } catch (err) {
            console.error("Error:", err);
            showToast("Failed to send", "error");
            if (statusDiv) statusDiv.innerHTML = "<p style='color:#ef4444;'>× Submission failed. Try again.</p>";
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        }
    });
}

// ── 5. INITIALIZE ──
document.addEventListener('DOMContentLoaded', () => {
    handleForm('contactForm', '/api/contact', 'formStatus');
    handleForm('collegeForm', '/api/college', 'collegeStatus');
});