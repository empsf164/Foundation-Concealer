# TONE / FORM — Premium Beauty-Tech Web App
> **"Your Shade. Your Match. Your Finish."**
> A modern, commercial-quality foundation & concealer discovery experience combining luxury beauty aesthetics with intelligent shade calibration.

---

## 🌟 Overview

**TONE / FORM** is a production-quality, responsive HTML5 beauty-tech web application template. Designed for modern complexion cosmetic brands, it combines editorial beauty presentation with smart interactive matching tools and an internal inventory operations dashboard.

### Core Pillars
- **Personalized Complexion Discovery**: A 5-step diagnostic wizard calculating foundation and concealer pairings with match confidence scores.
- **Undertone Analyzer**: Educational quiz exploring vein color, jewelry resonance, and daylight optical cues.
- **Custom Kit Builder**: Dynamic 4-step base regimen builder with real-time pricing and bundle discount calculations.
- **Authentic Customer Photo Reviews**: Masonry photo gallery categorized by skin depth and finish.
- **Internal Inventory Operations**: Brand-consistent dashboard for monitoring 48 shades, safety thresholds, and restock batches.

---

## 🛠️ Technology Stack

- **Markup**: HTML5 (Semantic, Accessible, SEO-optimized)
- **Styling**: Bootstrap 5.3.3 + Custom Vanilla CSS3 Design Tokens
- **Icons**: Bootstrap Icons (Local SVG and webfonts)
- **Interactivity**: Vanilla JavaScript (ES6+ modular engines)
- **Animations**: GSAP 3.12.5 (Subtle, respecting `prefers-reduced-motion`)
- **No Heavy SPA Frameworks**: Completely self-contained, no React/Vue build step needed.

---

## 📁 Project Directory Structure

```text
tone-form/
│
├── index.html                    # Homepage (Hero match, Undertone preview, Kit teaser, Reviews)
├── shop.html                     # Product Catalogue with filters (Category, Finish, Undertone, Sort)
├── product-details.html          # Editorial PDP with multi-angle gallery and shade matrix
├── shade-match.html              # 5-Step interactive shade matcher wizard
├── undertone-analyzer.html       # Educational optical undertone quiz & recommendation
├── kit-builder.html              # Custom base regimen builder with live sticky summary
├── reviews.html                  # Customer photo reviews masonry with review modal
├── about.html                    # Brand philosophy, science, and inclusive discovery
├── contact.html                  # Advisory desk inquiry form & FAQ accordion
│
├── login.html                    # Split-layout authentication with password toggle
├── signup.html                   # Registration with beauty profile preferences
├── forgot-password.html          # Password recovery with instant success state
│
├── dashboard/
│   ├── index.html                # Internal operations overview & KPI counters
│   ├── inventory.html            # Searchable stock ledger with Update Stock modal
│   ├── products.html             # Product lines catalogue management
│   ├── low-stock.html            # Critical and low-stock alerts queue
│   └── inventory-details.html    # Single shade (M420) analytics & timeline chart
│
├── 404.html                      # Editorial error page
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css     # Local Bootstrap 5.3.3
│   │   ├── bootstrap-icons.min.css # Local Bootstrap Icons
│   │   └── style.css             # TONE / FORM Master Design Tokens & Styles
│   ├── js/
│   │   ├── bootstrap.bundle.min.js # Local Bootstrap JS
│   │   ├── gsap.min.js           # Local GSAP 3.12.5
│   │   └── main.js               # Theme engine & interactive feature logic
│   ├── images/                   # 100% Local high-resolution beauty assets
│   │   ├── hero/
│   │   ├── foundation/
│   │   ├── concealer/
│   │   ├── beauty/
│   │   ├── reviews/
│   │   └── editorial/
│   └── icons/
│       └── favicon.svg           # Geometric brand glyph
│
├── documentation/
│   └── index.html                # Template documentation & developer guide
└── README.md
```

---

## 🎨 Color System & Design Tokens

| Variable | Light Mode | Dark Mode | Purpose |
| :--- | :--- | :--- | :--- |
| `--tf-primary` | `#1C1917` (Deep Espresso) | `#F5EFEB` (Warm Off-White) | Typography & primary CTAs |
| `--tf-bg` | `#FAF7F2` (Warm Ivory) | `#12100E` (Deep Charcoal) | Canvas background |
| `--tf-surface` | `#F4EFEA` (Soft Cream) | `#1A1715` (Rich Dark) | Sections & card surfaces |
| `--tf-accent` | `#C87D6F` (Terracotta/Rose) | `#D48E80` (Warm Rose Glow) | Active states & highlights |
| `--tf-secondary` | `#7D7569` (Warm Taupe) | `#9C9286` (Muted Taupe) | Neutral badges & secondary tags |

---

## 🚀 How to Run Locally

You can run this project with any local HTTP server:

```powershell
# Using Python
py -m http.server 8000

# Open in browser:
http://localhost:8000/tone-form/index.html
```

Or simply open `tone-form/index.html` directly in your browser.

---

## ♿ Accessibility & Quality Standards

- **Semantic HTML5**: Proper landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Accessible Shade Chips**: Every color swatch includes accessible `aria-label` and `title` tags.
- **Theme Persistence**: Light and dark mode states are saved to `localStorage` and respect OS preferences.
- **Zero Remote Asset Dependencies**: All CSS, fonts, and images are stored locally for stable offline execution.
- **No Lorem Ipsum**: Realistic, editorial copy tailored to cosmetic chemistry and shade precision.

---

© 2026 TONE / FORM. Fictional demo brand template.
