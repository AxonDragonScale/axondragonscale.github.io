# Agent context

This file records durable product, content, and implementation decisions for future agents working on this repository. Keep the public-facing `README.md` concise; store internal project context here.

## Repository purpose

This is Ronak Harkhani's personal homepage, developer portfolio, project showcase, and eventually résumé/CV site. It is published from the repository root through GitHub Pages at `https://axondragonscale.github.io/`.

The primary purpose is to help visitors learn about Ronak. The audiences are:

1. Potential employers
2. Friends and acquaintances
3. People arriving through GitHub

The site should present technical credibility without assuming every visitor is a developer. Explain what a project does before listing implementation details.

## Public identity and contact details

- **Name:** Ronak Harkhani
- **Public-facing title:** Android Engineer
- **Current employer:** PhonePe
- **Location:** Bengaluru, India
- **GitHub:** `https://github.com/AxonDragonScale`
- **LinkedIn:** `https://linkedin.com/in/ronak-harkhani`
- **X/Twitter:** `https://x.com/AxonDragonScale`
- **Instagram:** `https://www.instagram.com/ronakharkhani30/`
- **Public email:** `r.r.n.harkhani@gmail.com`

The official employment title at PhonePe may be Software Engineer, but Ronak explicitly chose **Android Engineer** for the site's public-facing title.

The GitHub profile biography may still say "Final Year CS Undergrad @ BITS Pilani"; that is outdated and is not site copy.

## Voice and copy

Use a friendly, direct, human tone that remains professional. Avoid generic portfolio language, agency copy, inflated claims, and excessive polish.

The current introduction reflects Ronak's preferred tone:

> Hi, I'm Ronak.
>
> I enjoy building apps, tinkering with Kotlin and Compose, and experimenting with KMP in my side projects.

Relevant technical background:

- Primarily Android, Kotlin, and Jetpack Compose
- Kotlin Multiplatform and Compose Multiplatform used mostly in personal projects
- Minor professional KMP use
- Interested in learning about programming languages

Prefer plain headings such as **Things I've built** and **Games I've enjoyed** over headings such as "Selected work" or "The PS5 backlog."

## Visual direction

The chosen direction is clean and minimal. Terminal-inspired or playful designs may be explored later, but are not part of the current design.

Preserve these characteristics unless Ronak requests a redesign:

- Dark theme
- Blue and green accents
- Sharp corners
- Thin dividing lines
- Strong typography and spacious layout
- Little or no border rounding
- Subtle transitions only
- No literal dragon or "AxonDragonScale" visual theme
- No decorative animation that competes with content
- Visible keyboard focus states
- Responsive layout
- Reduced-motion support

Fonts currently come from Google Fonts:

- Manrope for general text
- DM Mono for labels and metadata

## Technical approach

The site intentionally uses:

- One semantic `index.html`
- One `styles.css`
- No JavaScript
- No framework
- No static-site generator
- No package manager
- No build pipeline
- No analytics

Do not add dependencies or tooling unless a requested feature cannot be implemented cleanly with native HTML and CSS.

The page should work when `index.html` is opened directly and when served by GitHub Pages.

## Current page structure

The navigation links to:

1. Work
2. Experience
3. About
4. Contact

The content sections are:

1. Hero/introduction
2. Things I've built
3. Experience and education
4. Beyond code
5. Contact

The site is deliberately a single scrolling page. Do not split it into multiple pages unless content growth creates a concrete navigation problem.

## Hero

The hero contains:

- Android Engineer · Bengaluru, India
- Human introduction
- Link to work
- Email contact link
- `RH` profile-photo placeholder

Ronak intends to provide a real profile photo. Until then, keep the initials placeholder rather than using a stock image.

## Projects

### VariantX

- Repository: `https://github.com/AxonDragonScale/VariantX`
- Status: Active
- Ownership: Entirely Ronak's project
- Product: Keyboard-driven Android Studio build variant selector
- Main technology: Kotlin, IntelliJ Platform, Gradle
- Existing screenshots are loaded from the repository's `screenshots` directory.
- This is the featured project because it aligns closely with Ronak's Android engineering work.

### AppBox

- Repository: `https://github.com/AxonDragonScale/AppBox`
- Status: Active
- Ownership: Entirely Ronak's project
- Product: Monorepo of Android/KMP apps and shared components

Do not present AppBox as one generic portfolio card. Ronak chose to showcase individual products from it:

#### Topty

- Secure TOTP/HOTP two-factor authenticator
- QR scanning, biometric lock, encrypted secrets, backup/restore
- Kotlin, Compose, CameraX, AES-256

#### Limitless

- Habit tracker targeting Android, desktop, and iOS
- Goals, reminders, history, and statistics
- Kotlin Multiplatform, Compose Multiplatform, Room, Koin

#### Wallmatic

- Scheduled wallpaper manager
- Separate home and lock screen configuration
- Kotlin, Compose, WorkManager, Room

#### Cardy

- NFC smart-card reader and encrypted local vault
- Android NFC, EMV parsing, biometric access, AES-256
- Label as **In development**. Its repository context still describes significant parts as planned; do not imply it is a finished product without verifying that status.

### Insomnia

- Repository: `https://github.com/AxonDragonScale/Insomnia`
- Status: Active
- Ownership: Entirely Ronak's project
- Product: Native macOS menu bar app that prevents sleep for a chosen duration
- Technology: Swift, SwiftUI, macOS

The Insomnia repository provides three portrait screenshots:

1. `Docs/home-inactive.png`
2. `Docs/home-active.png`
3. `Docs/settings.png`

The order above was explicitly chosen. Display all three completely in a compact gallery. Do not use `object-fit: cover`; it cuts off the portrait screenshots. The current constrained flex layout is intended to keep the desktop card at `360px` while fitting all images with `object-fit: contain`.

Project images are currently loaded from `raw.githubusercontent.com`. If files are renamed upstream, update the URLs in `index.html`.

## Employment and education

Display:

- **PhonePe:** Android Engineer, 2020–present
- **Zeotap:** Data Engineer, January–June 2020
- **BITS Pilani, Goa Campus:** B.E. Computer Science, 2016–2020
- **Education detail:** Minor in Finance

Do not add the BITS Pilani teaching-assistant roles; Ronak explicitly chose to omit them.

## Beyond code

This section is intentionally split into visual subsections rather than summarized in one paragraph.

### Activities

- Gym
- Badminton

### Books

- The Licanius Trilogy — James Islington
- Percy Jackson — Rick Riordan
- Mistborn Trilogy — Brandon Sanderson
- Sapiens: A Brief History of Humankind — Yuval Noah Harari

### Games

- Hades I & II
- God of War
- Control
- Uncharted
- Clair Obscur: Expedition 33
- Hi-Fi Rush
- Ori
- Resident Evil
- Tomb Raider

### Films

- The Shawshank Redemption
- The Secret Life of Walter Mitty
- Wake Up Sid

The current cards use typographic poster-like visuals instead of third-party cover art. This avoids copyright attribution, inconsistent sources, and fragile external image dependencies. Actual artwork can be reconsidered if Ronak asks for it.

## Deliberately omitted

Do not add these speculatively:

- Blog or writing section
- GitHub activity graph
- "Currently working on" section
- Contact form
- Search
- Project filters
- Analytics
- Custom domain

Ronak may want a blog in the future, but not now.

GitHub Pages supports custom domains, but Ronak does not currently own one. Continue using `axondragonscale.github.io` unless that changes.

## Résumé and privacy

Ronak's existing résumé is very old. Do not publish it or add a dead/placeholder résumé button. Add a résumé link only after a current file is provided.

Ronak is comfortable publishing his real name, approximate location, employment history, education, social links, and contact email.

## Accessibility requirements

Keep standard accessibility and mobile support, plus:

- Keyboard-first navigation
- Visible focus indicators
- Semantic heading hierarchy
- Descriptive image alternative text
- Reduced-motion support
- Sufficient contrast

Do not simplify away these requirements.

## Validation

There is no test framework. After changing the site:

1. Parse `index.html` and verify unique IDs and internal anchor targets.
2. Check any newly introduced remote image or project URLs.
3. Run `git diff --check`.
4. Preview responsive behavior when layout CSS changes.

## Publishing

- Default branch: `main`
- GitHub remote: `origin`
- GitHub Pages source: repository root
- Initial implementation commit: `23950f2` (`Build personal portfolio site`)

When asked to publish, commit the relevant files and push `main` to `origin`.
