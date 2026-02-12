# Tuskers Cricket Club Website

This is the official website for Tuskers Cricket Club (Saskatoon), built as a static site for easy hosting on GitHub Pages.

## Project Structure

```
/
├── index.html          # Home page
├── matches.html        # Matches page
├── players.html        # Players page
├── events.html         # Events page
├── contact.html        # Contact page
├── 404.html            # Custom 404 page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   ├── main.js         # Shared logic (Nav, Footer, Dark Mode)
│   ├── matches.js      # Match data fetching logic
│   ├── players.js      # Player data fetching logic
│   └── events.js       # Event data fetching logic
└── data/
    ├── matches.json    # Match data
    ├── players.json    # Player data
    └── events.json     # Event data
```

## How to Run Locally

1.  **Clone the repository** (if using git) or download the files.
2.  **Open `index.html`** in your web browser.
    *   *Note: Some browsers (like Chrome) block fetching local JSON files due to CORS policy. To fully test the data loading:*
    *   **Option A (VS Code):** Install "Live Server" extension, right-click `index.html` and choose "Open with Live Server".
    *   **Option B (Python):** Open a terminal in the folder and run `python -m http.server`. Go to `http://localhost:8000`.

## How to Update Content

You don't need to edit HTML files to update the content. Just edit the JSON files in the `data/` folder.

### Updating Matches
Open `data/matches.json`. Add a new entry:
```json
{
  "id": 5,
  "date": "2026-06-01",
  "time": "18:00",
  "opponent": "New Opponent",
  "venue": "Forest Park",
  "season": "2026",
  "match_type": "T20",
  "result": "Upcoming",
  "notes": "Quarter Finals"
}
```

### Updating Players
Open `data/players.json`. Add a new player:
```json
{
  "id": 7,
  "name": "New Player",
  "role": "Bowler",
  "batting_style": "Right-hand bat",
  "bowling_style": "Right-arm fast",
  "jersey_number": "55",
  "bio": "New addition to the squad."
}
```

### Updating Events
Open `data/events.json`. Add a new event:
```json
{
  "id": 4,
  "title": "New Event",
  "date": "2026-07-01",
  "time": "14:00",
  "location": "Clubhouse",
  "description": "Description of the event.",
  "registration_link": "#"
}
```

## Deployment to GitHub Pages

1.  Create a new repository on GitHub.
2.  Push these files to the repository.
3.  Go to **Settings** > **Pages**.
4.  Under **Source**, select `Deploy from a branch`.
5.  Select `main` (or `master`) branch and `/` (root) folder.
6.  Click **Save**.
7.  Wait a minute, and your site will be live!
