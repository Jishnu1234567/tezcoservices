# Tezco Pvt Ltd — Website

**The Technical Expertzs** | Kochi, Kerala  
Static HTML/CSS/JS website — deploy-ready for Vercel or Netlify.

---

## 📁 Project Structure

```
tezco-website/
├── index.html              ← Home page
├── about.html              ← About Us
├── services.html           ← Services (AI, SaaS, Mobile, Web, Marketing)
├── projects.html           ← Portfolio / Projects
├── college-projects.html   ← College Project Guidance
├── contact.html            ← Contact form & info
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← Search engine instructions
├── netlify.toml            ← Netlify config (headers, cache, redirects)
├── css/
│   └── style.css           ← All styles
├── js/
│   └── script.js           ← All JavaScript
└── images/                 ← Add your images here
```

---

## 🚀 Deploy on Netlify (Recommended)

### Option A — Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in / create account
3. Drag the entire `tezco-website/` folder onto the deploy area
4. Your site is live at a `*.netlify.app` URL in seconds

### Option B — Git Deploy (Best for ongoing updates)
1. Push the folder to a GitHub/GitLab repository
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import from Git"
3. Select your repo
4. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
5. Click **Deploy site**

---

## ▲ Deploy on Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd tezco-website
vercel
```
Follow prompts. Your site goes live immediately.

### Option B — Dashboard
1. Go to [vercel.com](https://vercel.com) → "New Project"
2. Import your GitHub repository
3. Framework: **Other** (Static HTML)
4. Root directory: `.`
5. Click **Deploy**

---

## 🌐 Connect Custom Domain (tezco.com or tezco.in)

### On Netlify:
1. Dashboard → your site → **Domain settings** → **Add custom domain**
2. Enter `tezco.in` (or `tezco.com`)
3. Update DNS at your registrar:
   - **A record:** `75.2.60.5`
   - **CNAME record:** `www` → `your-site.netlify.app`
4. Netlify auto-provisions free SSL (Let's Encrypt) within minutes

### On Vercel:
1. Dashboard → your project → **Settings** → **Domains**
2. Add `tezco.in` and `www.tezco.in`
3. Update DNS at your registrar:
   - **A record:** `76.76.21.21`
   - **CNAME record:** `www` → `cname.vercel-dns.com`
4. SSL is automatic

> **DNS propagation** may take up to 24-48 hours, though usually it's within 1 hour.

---

## 📧 Activate the Contact Form

The contact form is currently front-end only with a simulated submission. To receive real emails:

### Option A — Netlify Forms (Free, easiest)
Add `netlify` attribute to the form tag in `contact.html`:
```html
<form id="contact-form" name="contact" netlify netlify-honeypot="bot-field">
```
Netlify auto-captures submissions. View them in **Dashboard → Forms**.

### Option B — Formspree (Free up to 50/month)
1. Create account at [formspree.io](https://formspree.io)
2. Create a form and copy your form ID
3. In `js/script.js`, replace the `initFormHandler` function's simulated delay with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
```

---

## ✅ SEO Checklist
- [x] Meta title, description, robots on all pages
- [x] Open Graph tags for social sharing
- [x] Canonical URLs
- [x] Semantic HTML5 structure
- [x] `sitemap.xml` included
- [x] `robots.txt` included
- [ ] Update all URLs from `https://tezco.in/` to your actual domain
- [ ] Add real images to `/images/` directory
- [ ] Submit sitemap to Google Search Console

---

## ⚡ Performance Features
- Google Fonts loaded asynchronously via CSS `@import`
- No JavaScript frameworks — pure vanilla JS (~3KB)
- Images use `loading="lazy"` via browser native lazy load
- CSS variables for theming — no render-blocking overhead
- Netlify CDN serves assets globally with long cache headers

---

## 📞 Support
**Tezco Pvt Ltd** | info@tezco.in | +91 98765 43210 | Kochi, Kerala
