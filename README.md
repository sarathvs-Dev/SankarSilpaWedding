# Shankar & Shilpa — Wedding Invitation (React)

A full-width, single-page wedding invitation site built with **Vite + React**.
Watercolor-Kerala visual theme, scroll-reveal animations, a tap-to-open
opening gate, side dot navigation, a live countdown, guest-name
personalization, background music toggle, "Add to Calendar", a Google Maps
link for the venue, and an RSVP/wishes wall.

## Getting started

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build       # production build → dist/
npm run preview     # preview the production build locally
```

### Add your background music (optional)

Drop an mp3 at `public/bgm.mp3`. The music-toggle button in the top-right
corner will play/pause it. If you skip this, the button just does nothing
when tapped — no error. See `public/ADD_MUSIC_HERE.txt` for details.

### Personalized guest links

Share links like `yoursite.com/?Name=Sreekutty` — the guest's name will
appear on the opening gate and the welcome page ("Dear Sreekutty,"). No
name in the URL just shows the generic greeting.

## Project structure

```
index.html                     Vite entry HTML (fonts, favicon, meta tags)
public/
  ADD_MUSIC_HERE.txt           Instructions — drop bgm.mp3 here
src/
  main.jsx                     React root
  App.jsx                      Assembles gate, nav, lamp rail, music toggle,
                                and all 10 sections
  index.css                    All styling: palette, watercolor washes,
                                animations, responsive/full-width layout
  assets/
    hero.jpg                   Outdoor couple portrait (hero + gallery)
    second.jpg                 Second outdoor couple portrait (gallery)
    family.jpg                 Engagement ceremony photo with family
  hooks/
    useGuestName.js             Reads ?Name= from the URL for personalization
  components/
    Reveal.jsx                 Generic scroll-reveal wrapper (any tag)
    Drift.jsx                  Drifting particle/ember field
    SvgDefs.jsx                Shared SVG filters + motifs (lotus, lamp,
                                temple, house, mandala, corner flourish)
    Gate.jsx                   Opening "tap to open" curtain/door animation
                                (shows the guest's name if present)
    LampRail.jsx                Fixed brass lamp with scroll-progress wick
    DotNav.jsx                  Side navigation dots with active-section
                                tracking and click-to-scroll
    Countdown.jsx                Live countdown to the muhurtham (IST-anchored,
                                correct regardless of the viewer's timezone)
    MusicToggle.jsx              Floating background-music play/pause button
    sections/
      Section1Opening.jsx        Includes the guest greeting + countdown
      Section2Hero.jsx
      Section3Story.jsx
      Section4Couple.jsx
      Section5Ceremony.jsx      Includes the "Add to Calendar" (.ics) button
      Section6Venue.jsx         Includes the Google Maps link
      Section7Grihapravesham.jsx
      Section8Blessings.jsx
      Section9Closing.jsx       Includes the confetti "Celebrate" button
      Section10Wishes.jsx        RSVP + guest wishes wall
```

## Notes

- All three photographs are bundled as real image assets (not embedded as
  base64), so Vite optimizes and hashes them on build.
- The layout is full-bleed/full-width: sections span the viewport, with just
  the text columns capped for readability. Breakpoints widen further at
  1400px and 1920px for large monitors.
- `prefers-reduced-motion` is respected throughout (reveals, the gate, the
  pulsing dot, drifting particles, and the music-note bounce all simplify or
  disable).
- To swap in the couple's real venue map link, edit the `href` in
  `Section6Venue.jsx`. To change the ceremony date/time on the calendar
  file and countdown target, edit `Section5Ceremony.jsx` (`DTSTART`/`DTEND`)
  and `Countdown.jsx` (`TARGET`) together so they stay in sync.

### RSVP / wishes wall — important limitation

`Section10Wishes.jsx` currently stores submissions in the browser's
`localStorage`. That means:
- Wishes persist for that one guest's browser/device only.
- You (the couple) won't see submissions from other guests unless you're
  looking at their device.

This is fine for a demo or a single-shared-kiosk setup, but for real
multi-guest RSVP collection you'll want to wire the form to a backend —
easiest options are **Formspree**, **Google Sheets** (via a script/webhook),
or **Firebase/Supabase**. Happy to wire one of these in if you tell me which
you'd prefer and give me the endpoint/credentials.
"# SankarSilpaWedding" 
