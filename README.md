# Arun & Aarya — wedding invitation

A complete, dependency-free static website. All ten supplied photographs are included as optimized WebP images. No npm installation or build is needed.

## Preview
Open index.html in a browser, or run `python3 -m http.server 8080` in this directory and visit http://localhost:8080.

## GitHub and Vercel
Upload the contents of this folder to the root of your chosen GitHub repository. Import that repository into Vercel as a static/Other project. No build command is needed; serve the repository root. The included vercel.json configures static headers.

If you keep these files in a subfolder instead, select that subfolder as the Vercel project root.

## Content
- index.html: invitation wording, family names, event details, photo placement and directions.
- style.css: responsive visual design, typography and animation.
- script.js: photo viewer and progressive scroll reveals.
- assets/: ten photographs, invitation, Ganesha motif and calendar downloads.

Wedding calendar: 6 December 2026, 11:30 a.m.–12:20 p.m. IST.
Reception calendar: 9 December 2026, 6:00–9:00 p.m. IST.

The venue URLs were decoded directly from the invitation QR codes. Their Google Maps destination pages could not be independently opened in the build environment; check both links on your phone before sending the invitation.

Once the final public domain is known, replace the relative og:image value with its absolute public URL (for example your deployed domain followed by /assets/photo-02.webp), and add og:url to index.html for reliable social sharing. No domain has been assumed.

The original invitation includes the family contact numbers and residential addresses. The page links to this original card; those details are not repeated in the main layout.

Validation: JavaScript syntax checked, all local referenced files verified, desktop and 390px mobile layouts inspected, gallery open/next/close interactions checked. No backend, external font dependency, analytics, RSVP collection or music.

## Invitation versions and countdown
- `/`: wedding and reception.
- `/friends`: Rangoli (4 December), Sangeeth (5 December), wedding and reception.
- Both routes share index.html, styles, music, gallery and one wedding countdown.
- Countdown target: 6 December 2026 at 11:30 AM IST, explicit +05:30 offset in script.js.
- To enable directions on both friends-only event cards, set FRIENDS_VENUE_MAP_URL in script.js to the confirmed Google Maps URL. Until then, no directions button is displayed.
- Vercel rewrites /friends to the shared invitation. Use a rewrite-capable server to preview that route locally.
