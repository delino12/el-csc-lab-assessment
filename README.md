# Ekpoto Liberty Bernard — Student Portfolio

A fully responsive, multi-page personal academic portfolio and student management website built with pure HTML, CSS, and JavaScript. Designed and developed as a CSC lab assessment project.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero section, animated stats, feature cards |
| About | `about.html` | Bio, education table, skills, career aspirations, hobbies |
| Projects | `projects.html` | Three IoT/drone-focused project showcases |
| Planner | `planner.html` | Interactive academic task manager |
| Contact | `contact.html` | Contact form with full JS validation |

---

## Features Built

### HTML
- Semantic elements — `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer`
- Education and skills tables with `caption`, `thead`, `tbody`, `th scope`
- `<meter>` elements for skill proficiency levels
- Ordered and unordered lists throughout
- Responsive images with `loading="lazy"`
- Hyperlinks with `target="_blank" rel="noopener"` for external links

### CSS (`css/style.css`)
- CSS custom properties (design tokens) for colours, spacing, and transitions
- Mobile-first responsive layout with breakpoints at `520px`, `720px`, and `1024px`
- **Flexbox** — header, hero section, footer, contact layout
- **CSS Grid** — feature cards, stats bar, project grid, hobbies list
- Glassmorphism navigation bar with `backdrop-filter`
- Animated floating profile photo (`@keyframes floaty`)
- Scroll fade-in animation (`@keyframes fadeInUp`) via IntersectionObserver
- Task slide-in animation (`@keyframes slideIn`)
- Hover transitions on cards, buttons, nav links, and skill tags
- `prefers-reduced-motion` media query for accessibility
- Consistent dark colour scheme with mint (`#6ee7b7`) and blue (`#60a5fa`) accents

### JavaScript

**`js/main.js`** — shared across all pages
- Mobile hamburger nav toggle
- Automatic active link highlighting based on current page
- Animated number counter on homepage stats (requestAnimationFrame, ease-out cubic)
- Scroll-triggered fade-in via IntersectionObserver
- Image error handler (hides broken images, shows CSS avatar fallback)

**`js/planner.js`** — Academic Planner
- Full task CRUD: add, toggle complete, delete
- `localStorage` persistence — tasks survive page refresh
- Priority levels (High / Medium / Low) with colour-coded left borders
- Filter bar: All / Active / Completed
- "Clear Completed" bulk action
- Live progress bar and stat counters (Total / Pending / Completed)
- Course category selector with preset options
- Due date input with formatted display

**`js/contact.js`** — Contact Form
- Per-field validation with individual inline error messages
- Required field checks for all four fields
- Email format validation via regex
- Phone number digits-only enforcement
- Success message on valid submission; auto-hides after 6 seconds
- Clears errors on user input

---

## Project Structure

```
el-csc-lab-assessment/
├── index.html          # Homepage
├── about.html          # About Me
├── projects.html       # Projects showcase
├── planner.html        # Academic Planner
├── contact.html        # Contact form
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Shared utilities
│   ├── planner.js      # Planner logic
│   └── contact.js      # Form validation
└── assets/
    ├── profile.jpeg    # Profile photo (alternate)
    └── profile-2.jpeg  # Profile photo (active)
```

---

## Running Locally

No build tools or dependencies required — this is a plain static site.

### Option 1 — Open directly in a browser
1. Clone or download the repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)

```bash
git clone https://github.com/delino12/el-csc-lab-assessment.git
cd el-csc-lab-assessment
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 2 — VS Code Live Server (recommended for development)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The site opens at `http://127.0.0.1:5500` and auto-reloads on save

### Option 3 — Python local server
```bash
# Python 3
python3 -m http.server 8080

# Then visit http://localhost:8080 in your browser
```

---

## Deploying to GitHub Pages

1. Push the repository to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/delino12/el-csc-lab-assessment.git
git push -u origin main
```

2. Go to the repository on GitHub → **Settings** → **Pages**
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. GitHub will publish the site at:
   `https://delino12.github.io/el-csc-lab-assessment/`

> Changes pushed to `main` are automatically redeployed within ~60 seconds.

---

## Customisation Checklist

- [ ] Replace project screenshots — `images/project1.png`, `images/project2.png`, `images/project3.png`
- [ ] Add real demo URLs to the **View Demo** buttons in `projects.html`
- [ ] Add real GitHub repo links to the **Source Code** buttons in `projects.html`
- [ ] Update secondary school and primary school graduation years in `about.html`

---

## Author

**Ekpoto Liberty Bernard**
- GitHub: [github.com/delino12](https://github.com/delino12)
- LinkedIn: [linkedin.com/in/liberty-ekpoto](https://www.linkedin.com/in/liberty-ekpoto)
- Email: ekpoto.liberty@gmail.com
- Location: Lagos, Nigeria
