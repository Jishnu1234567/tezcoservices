# 🚀 Tezco Pvt Ltd Website — Deployment Guide

## Folder Structure
```
tezco-website/
├── index.html          ← Home page
├── about.html          ← About Us
├── services.html       ← Services
├── projects.html       ← Projects / Portfolio
├── college.html        ← College Projects & Guidance
├── contact.html        ← Contact page
├── css/style.css       ← All styles
├── js/script.js        ← All JavaScript
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← SEO robots
├── vercel.json         ← Vercel config
├── netlify.toml        ← Netlify config
└── DEPLOY.md           ← This file
```

---

## ✅ Deploy on Vercel (Recommended)

### Method 1: Drag & Drop (Fastest)
1. Go to https://vercel.com
2. Sign up / log in
3. Click **"Add New… → Project"**
4. Drag the entire `tezco-website/` folder into the upload zone
5. Click **Deploy**
6. Your site is live in ~30 seconds at `your-project.vercel.app`

### Method 2: Via GitHub (Best for updates)
1. Create a GitHub account at https://github.com
2. Create a new repository called `tezco-website`
3. Upload all files to the repository (drag & drop in GitHub UI)
4. Go to https://vercel.com → "Add New → Project"
5. Click **"Import Git Repository"** → select your GitHub repo
6. Click **Deploy**
7. Every time you push to GitHub, Vercel auto-deploys ✨

---

## ✅ Deploy on Netlify

### Method 1: Drag & Drop
1. Go to https://app.netlify.com
2. Sign up / log in
3. On the dashboard, drag the `tezco-website/` folder to **"Drop your site folder here"**
4. Done! Live in seconds at `random-name.netlify.app`

### Method 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir=. --prod
```

---

## 🌐 Connect a Custom Domain (tezco.in / tezco.com)

### On Vercel:
1. Go to your project dashboard on Vercel
2. Click **"Settings" → "Domains"**
3. Add your domain: `tezco.in`
4. Vercel gives you DNS records (A record and CNAME)
5. Go to your domain registrar (GoDaddy, Namecheap, BigRock, etc.)
6. In DNS settings, add the records provided by Vercel:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
7. Wait 24–48 hours for DNS propagation
8. Vercel auto-issues SSL (HTTPS) certificate via Let's Encrypt ✅

### On Netlify:
1. Go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter `tezco.in`
4. Set your domain's nameservers to Netlify's:
   - `dns1.p04.nsone.net`
   - `dns2.p04.nsone.net`
   - `dns3.p04.nsone.net`
   - `dns4.p04.nsone.net`
5. Or use Netlify's DNS records at your registrar
6. HTTPS is auto-enabled ✅

---

## 📧 Enable Contact Form (Without Backend)

The contact form currently simulates submission. To make it real, use one of:

### Option A: Formspree (Free)
1. Go to https://formspree.io → create free account
2. Create a new form → get your form endpoint (e.g. `https://formspree.io/f/xabcdef`)
3. In `contact.html`, update the form:
   ```html
   <form action="https://formspree.io/f/YOUR_CODE" method="POST" id="contactForm">
   ```
4. Remove the JS form handler (or keep it for UX — Formspree works with both)

### Option B: EmailJS (100% client-side)
1. Go to https://www.emailjs.com
2. Set up email service (Gmail, etc.)
3. Add their SDK and call `emailjs.send()` in script.js

---

## ⚡ Performance Checklist
- [x] Fonts loaded from Google Fonts with `preconnect`
- [x] Images use `loading="lazy"` 
- [x] CSS and JS minification recommended for production
- [x] No blocking scripts (all JS is `defer`)
- [x] Cache headers set in vercel.json / netlify.toml

## 🔍 SEO Checklist
- [x] Meta title and description on all pages
- [x] Open Graph tags for social sharing
- [x] Semantic HTML5 structure
- [x] sitemap.xml at root
- [x] robots.txt at root
- [x] Submit sitemap at: https://search.google.com/search-console

---

Built with ❤️ by Tezco Pvt Ltd — The Technical Expertzs, ALUVA
