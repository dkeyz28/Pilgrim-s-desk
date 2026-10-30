# ResearchCraft — Academic Project Writing Portfolio

A modern, responsive, SEO-friendly portfolio website for an academic project writer / research consultant.

Built with **React**, **Vite**, **Tailwind CSS** and **TypeScript**. No backend, no database, no authentication, and no payment gateway are required to run it.

---

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:8080`).

To build for production:

```bash
npm run build
```

---

## Customize everything from one file

Most of the personal content lives in **`src/config/siteConfig.ts`**:

- Brand name, tagline, SEO title and description
- Hero headline, subheadline and CTA buttons
- Navigation links
- Statistics
- About section: name, role, biography, philosophy, expertise
- Contact details (email, phone, WhatsApp, location, response time)
- Social links
- Footer text, copyright and disclaimer

Edit that file and the site updates instantly.

### Replace the portrait

Drop your own photo into `public/images/about-portrait.jpg` (or update the `about.photo` path in `siteConfig.ts`).

### Update services / values / process

Open `src/data/services.ts` to edit the six service cards, six value cards and five process steps.

### Update portfolio projects

Open `src/data/projects.ts`. Each project has a title, field, type, category, year, summary, overview, objectives, methodology, key areas and deliverables. The modal on the site reads directly from this file.

### Update testimonials and FAQ

- `src/data/testimonials.ts` — replace the placeholder quotes with real, permitted client feedback.
- `src/data/faq.ts` — edit the seven questions and answers.

---

## Connect the contact form

The contact form is frontend-only by default. To make it send real messages, set a form endpoint in `src/config/siteConfig.ts`:

```ts
formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
// or a Web3Forms endpoint
// or your own custom endpoint
```

If `formEndpoint` is left empty, the form simulates a submission and shows a success message without sending any data.

---

## Project structure

```
public/images/          # Placeholder images (replace with your own)
src/
  components/           # React sections (Navbar, Hero, About, Services, etc.)
  config/siteConfig.ts  # Central customization file
  data/                 # Services, projects, testimonials, FAQ
  hooks/                # Scroll reveal hook
  routes/               # TanStack Start pages
  styles.css            # Design tokens, fonts, utilities
```

---

## Design notes

- Warm ivory background with navy ink surfaces and amber accents
- `Fraunces` display font for headings, `Public Sans` for body text
- Smooth scroll, reveal-on-scroll animations and reduced-motion support
- All icons come from `lucide-react`

---

## License

This template is provided for your own project. Replace the placeholder content before publishing.
