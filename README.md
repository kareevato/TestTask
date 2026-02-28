# FixIt Pro — Appliance Repair Landing Page

A fully-working landing page for a household appliances repair company based in the USA.

## Features

- **Header** — Fixed navigation with logo, menu links (Home, Services, About, Request Service, Contact), and CTA button. Mobile-responsive hamburger menu.
- **Hero Section** — Headline, supporting copy, and call-to-action buttons.
- **Services Section** — Four repair services: Refrigerator & Freezer, Washer & Dryer, Range & Oven, Dishwasher & Disposal.
- **About Section** — Company value proposition with image and feature list.
- **Application Form** — Service request form with:
  - Client-side validation (required fields, lengths, formats)
  - Domain verification (blocks disposable/temporary email addresses)
  - US phone number formatting `(555) 123-4567`
  - Success confirmation message
- **Footer** — Brand info, quick links, service areas, business hours.

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no frameworks)

## Project Structure

```
├── index.html          # Main page markup
├── styles.css          # Styles and layout
├── script.js           # Form validation, domain checks, mobile nav
├── about-technician.jpg # About section image
└── README.md           # This file
```

## Running Locally

1. Open a terminal in the project directory.
2. Start a local server:

   ```bash
   python3 -m http.server 5500
   ```

3. Open [http://localhost:5500](http://localhost:5500) in your browser.

Alternatively, open `index.html` directly in a browser (some features may behave differently without a server).

## Form Validation

- **Required fields:** First name, last name, email, phone, address, appliance type, description, terms checkbox.
- **Email:** Valid format and non-disposable domain (e.g. blocks tempmail.com, guerrillamail.com).
- **Phone:** 10-digit US format with auto-formatting.
- **Description:** Minimum 20 characters.

## Browser Support

Works in modern browsers (Chrome, Firefox, Safari, Edge).

## License

© 2025 FixIt Pro. All rights reserved.
