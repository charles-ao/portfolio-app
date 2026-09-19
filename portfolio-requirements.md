# Data Engineering Portfolio — Requirements Document

## 1. Overview
**Problem:** The individual needs an online portfolio to showcase their data engineering career, skills, and projects to potential employers/clients.

**Goal:** A clean, fast, easy-to-navigate personal portfolio site with light/dark mode, built from JSON-driven content so it's easy to update without touching code.

**Target users:**
- Recruiters / hiring managers screening candidates
- Potential clients or collaborators
- Peers/network reviewing work

## 2. Users & Use Cases
| Persona | Main goal | Key use case |
|---|---|---|
| Recruiter | Quickly assess candidate fit | Scan About page + filter Portfolio by relevant tool/category |
| Hiring manager | Evaluate depth of a specific project | Click into Project Detail page to review architecture/impact |
| Peer/contact | Get in touch | Find contact info and reach out via email/LinkedIn |

## 3. Core Features (MVP)

**Site structure & navigation**
1. As a visitor, I want a persistent navbar on every page, so that I can move between Home, About, Portfolio, and Contact easily.
2. As a visitor, I want client-side routing between 4 pages (Home, About, Portfolio, Project Detail, Contact), so that navigation feels instant.

Routes: **Home, About, Portfolio, Project Detail, Contact** (5 total — Project Detail is its own page).

**Home page**
3. As a visitor, I want a homepage with a navbar and a brief intro/hero, so that I immediately understand who this is and what they do.

**About page**
4. As a visitor, I want to see the individual's name, a summary/bio, career journey (timeline of roles), and tools/technologies used, so that I understand their background.
5. Suggested additional content for this page:
   - Headline/title (e.g., "Data Engineer")
   - Short intro tagline
   - Career timeline (company, role, dates, short description)
   - Skills grouped by category (languages, data warehousing, orchestration, cloud, visualization, etc.)
   - Certifications
   - Education
   - Resume/CV download link
   - A professional photo (optional)

**Portfolio (project list) page**
6. As a visitor, I want to see all projects as cards with basic info (title, short description, thumbnail/icon, tools used, category tag), so that I can browse quickly.
7. As a visitor, I want to click a project card and be routed to a detail page for that project.
8. As a visitor, I want to filter projects by **tool**, **category**, and a **free-text search**, so that I can find relevant work fast.

**Project detail page**
9. As a visitor, I want a detailed view of a project with layout suited to data engineering work. Suggested fields:
   - Project title & one-line summary
   - Role (individual contributor, lead, team size)
   - Timeframe (start–end / duration)
   - Problem statement / business context
   - Architecture overview (diagram image or embedded SVG)
   - Tech stack (languages, frameworks, cloud services, databases, orchestration tools)
   - Data sources & volume (e.g., "500GB/day from Kafka, batch + streaming")
   - Pipeline description (ingestion → transformation → storage → serving)
   - Key challenges & how they were solved
   - Results/impact (metrics: latency reduced, cost saved, data quality improved, % automation, etc.)
   - Screenshots / dashboards / diagrams
   - Links (GitHub repo, live demo, case study/blog post)
   - Category & tags (for filtering consistency with the Portfolio page)

**Contact page**
10. As a visitor, I want to see a world map with the UK highlighted, so that I know roughly where the individual is based.
11. As a visitor, I want contact details: email, phone, LinkedIn, so that I can reach out. (Static info only — no contact form.)
12. Suggested additional content:
    - GitHub profile link
    - Location text (e.g., "Based in the UK, open to remote work")
    - Availability status (e.g., "Open to opportunities")

**Theming**
13. As a visitor, I want to toggle between light and dark mode, so that I can view the site comfortably.

**Content management**
14. As the site owner, I want all content (about details, project list, tools, etc.) managed via separate JSON files, so that I can update content without editing code.
    - Suggested files: `about.json`, `projects.json`, `tools.json`, `contact.json`

**Branding**
15. A simple logo should be designed for the site (see Design Notes).

## 4. Out of Scope (for now)
- User accounts / login
- CMS admin UI (content is managed by hand-editing JSON files)
- Blog/articles section
- Comments or social interaction features
- Multi-language support
- Backend/database (site is static, JSON-driven)
- Contact form submission handling
- Deployment/hosting/domain setup

## 5. User Flows

**Flow: Browse a project**
1. User lands on Home, clicks "Portfolio" in navbar
2. User sees grid of project cards, optionally filters by tool/category or searches
3. User clicks a card
4. User is routed to Project Detail page with full case study
5. User can navigate back to Portfolio (or to another project)

**Flow: Get in touch**
1. User clicks "Contact" in navbar
2. User sees map (UK highlighted) and contact details
3. User clicks email/LinkedIn/phone link (or fills contact form, if included) to reach out

## 6. Data Model (JSON-driven)

**about.json**
- name, title, tagline, bio (long text)
- timeline: [{ company, role, startDate, endDate, description }]
- skills: [{ category, items: [] }]
- certifications: []
- education: []
- resumeUrl
- photoUrl

**projects.json**
- projects: [{
  - id, title, summary
  - category, tags (tools), 
  - thumbnailUrl
  - role, duration
  - problemStatement
  - architectureImageUrl
  - techStack: []
  - dataSources
  - pipelineDescription
  - challenges
  - results (metrics)
  - screenshots: []
  - links: { github, demo, caseStudy }
  }]

**tools.json**
- tools: [{ name, category, iconUrl }]  — used to populate filter options

**categories.json**
- categories: [{ id, name }]  — project categories are fully dynamic and can change at any time; sourced from this file (or embedded within projects.json) rather than hardcoded, so filters always reflect current data

**contact.json**
- email, phone, linkedInUrl, githubUrl, location, availabilityStatus

## 7. Non-Functional Requirements
- **Auth:** None — public site
- **Devices:** Responsive (desktop + mobile)
- **Performance:** Static/JSON-driven, should load fast; images optimized
- **Data storage:** Static JSON files, no database, no per-user data
- **Integrations:** Interactive map library (e.g., react-simple-maps or Leaflet) for the world map with UK highlighted, on the Contact page
- **Theming:** Light and dark mode, togglable

## 8. Design Notes
- **Font reference:** hunt.io — a Framer-built site. The exact font name wasn't confirmed from the page source (fonts are loaded via Framer's internal CSS). Recommend inspecting via browser dev tools (Inspect → Computed → font-family) to get the exact name before handing off to Claude Design, or approximate with a similar modern geometric/grotesque sans-serif (e.g., Inter, General Sans, or Söhne) if the exact one isn't available.
- **Color palette:**
  | Swatch | Hex |
  |---|---|
  | White | `#FFFFFF` |
  | Black | `#000000` |
  | Deep green-black | `#1E201E` |
  | Dark olive-gray | `#3C3D37` |
  | Muted sage | `#697565` |
  | Cream | `#ECDFCC` |

  Suggested usage: dark mode built from `#1E201E`/`#3C3D37` as backgrounds with `#ECDFCC` text; light mode built from `#FFFFFF`/`#ECDFCC` with `#1E201E`/`#000000` text; `#697565` as an accent/interactive color across both modes.
- **Logo:** Icon-based mark — two inverted V shapes (chevrons) stacked/overlapping on each other (forming a shape like an hourglass or bowtie), built in the palette above. To be designed in Claude Design.

## 9. Resolved Notes (formerly Open Questions)
1. **Content readiness:** Placeholder/sample content will be used for the first design pass (bio, timeline, tools, project write-ups).
2. **Number & categories of projects:** Fully dynamic via JSON — categories and project count can change at any time without code changes (see `categories.json` in Data Model).
3. **Logo style:** Icon-based — two inverted V shapes stacked/overlapping (see Design Notes).
4. **Domain/hosting:** Out of scope for this document.

