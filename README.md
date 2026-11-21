# CivicTrack (demo mode)

A static HTML/CSS/JavaScript project. No build step and no dependencies.

## Run locally
Option 1: double-click `index.html` (works in most browsers).
Option 2 (recommended, needed for microphone recording): from this folder run
  `python3 -m http.server 8000`  then open http://localhost:8000
  or `npx serve .`  (Node.js required).

## Demo accounts (password: demo123)
citizen@demo, authority@demo, admin@demo. Or register a new citizen account.

## Structure
- index.html      page shell, loads CSS and scripts in order
- css/styles.css  theme tokens (light and dark), layout, components, responsive rules
- js/data.js      constants, seeded sample data, localStorage persistence, rules-based analysis, duplicate check
- js/ui.js        navigation, notifications, counters, SVG map, bar charts, tables
- js/pages/*.js   home, report, track, dashboard, authority, admin, auth, about
- js/main.js      hash router (#home, #report, #track, #dashboard, #about, #login, #authority, #admin)

Scripts are classic (non-module) files sharing one global scope, so the load order in index.html matters.

## Important limits
- Demo mode: all data lives in your browser's localStorage. Clear it (or run `localStorage.removeItem('ct2')`) to reset the sample data.
- Complaint analysis is a keyword rules engine, not real AI. Passwords are stored unhashed in the browser; never reuse real ones.
- The brief's production stack (React, Express, MongoDB, JWT/bcrypt, cloud storage, AI API) is not included here.
