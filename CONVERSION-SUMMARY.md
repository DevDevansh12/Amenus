# Express + Pug Conversion Summary

## Project Structure

```
Amenus-main/
├── public/                 # Static assets
│   ├── css/
│   │   ├── styles.css
│   │   └── vendor.css
│   ├── js/
│   │   ├── contact-modal.js
│   │   ├── main.js
│   │   └── plugins.js
│   ├── images/
│   │   ├── amenus_logo.png
│   │   ├── geometric_shape.svg
│   │   ├── avatars/
│   │   ├── books/
│   │   └── icons/
│   ├── favicon.ico
│   ├── favicon.png
│   └── site.webmanifest
├── views/                  # Pug templates
│   ├── partials/
│   │   ├── header.pug
│   │   ├── footer.pug
│   │   └── contact-modal.pug
│   ├── layout.pug
│   ├── index.pug
│   ├── about.pug
│   └── site-copyright.pug
├── .env
├── package.json
└── server.js
```

## Server Configuration (server.js)

```javascript
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// Set Pug as view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/site-copyright", (req, res) => {
    res.render("site-copyright");
});

// Contact form handler
app.post("/contact", async(req, res) => {
    // ... email handling code
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Routes

- `/` → index.pug (Homepage)
- `/about` → about.pug (About page)
- `/site-copyright` → site-copyright.pug (Privacy & Copyright)
- `POST /contact` → Contact form submission

## Template Structure

### layout.pug
Main layout template that all pages extend. Includes:
- HTML head with meta tags, CSS links
- Preloader
- Header (via partial)
- Content block (overridden by child templates)
- Footer (via partial)
- Contact modal (via partial)
- JavaScript files

### Partials

**header.pug**
- Logo linking to `/`
- Mobile menu toggle
- Navigation links: `/about`, `/site-copyright`
- "Connect With Me!" button

**footer.pug**
- Logo
- Copyright notice
- Back to top button

**contact-modal.pug**
- Contact form with name, email, message fields
- Company info and email

### Page Templates

**index.pug**
- Hero section with intro text
- Books section with featured titles
- CTA section

**about.pug**
- Page header
- About content sections
- CTA section

**site-copyright.pug**
- Privacy policy
- Copyright information
- Terms & conditions

## Key Changes

1. **File Structure**: Moved css/, js/, images/ into public/ folder
2. **View Engine**: Configured Pug as the template engine
3. **Static Files**: Configured express.static to serve from public/
4. **Routes**: Created Express routes for all pages (no .html extensions)
5. **Links**: Updated all internal links to use Express routes:
   - `index.html` → `/`
   - `about.html` → `/about`
   - `site-copyright.html` → `/site-copyright`
6. **Asset Paths**: All CSS, JS, and image paths now use absolute paths starting with `/`
   - `css/styles.css` → `/css/styles.css`
   - `images/logo.png` → `/images/logo.png`
7. **Template Inheritance**: All pages extend layout.pug
8. **Partials**: Header, footer, and contact modal extracted into reusable partials

## Running the Application

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or use nodemon for development
npm run dev
```

The application will run on `http://localhost:3000` (or the PORT specified in .env)

## Design Preservation

- No CSS files were modified
- No JavaScript files were modified
- All classes and IDs remain identical
- Layout structure is preserved exactly
- All inline styles maintained
- Mobile menu functionality intact
