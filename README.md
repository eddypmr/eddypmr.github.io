# Eddy Patrik Morocho Realpe — Personal Portfolio

Minimal, responsive portfolio in English, focused on software engineering, cloud infrastructure, DevOps and QA automation.

**Live URL (after deployment):** https://eddypmr.github.io/

## Stack
- Semantic HTML5, CSS3, vanilla JavaScript
- No build or package installation required
- GitHub Actions + GitHub Pages

## Preview locally
Run `python3 -m http.server 8080` in this folder and open http://localhost:8080.

## Deploy
1. Merge the portfolio pull request into `main`.
2. Open the repository **Settings → Pages**.
3. In **Build and deployment**, set **Source** to **GitHub Actions**.
4. Check the **Actions** tab for the deployment result.
5. Visit https://eddypmr.github.io/.

## Updating content
Edit `index.html` to update sections, project links, and contact details. Edit `styles.css` for layout and colors. The image is `assets/profile.webp`.

Contact buttons open a dialog with the email address, a copy button, and links to Gmail or the visitor's email app. The address also appears in the contact section so it can be copied without JavaScript. When updating the email, replace every occurrence in `index.html`, including the encoded address in the Gmail link.

The supplied CV PDF has intentionally not been published yet, to avoid exposing the phone number publicly. A downloadable public CV can be added later after redacting personal information.

## Accessibility and privacy
- Skip-navigation link, semantic sections, keyboard-focus styles, responsive navigation, reduced-motion support
- Theme preference is stored only in the visitor's browser.
- No analytics or contact form; contact links use email/LinkedIn.
- Google Fonts loaded externally (fallback fonts provided in CSS).
