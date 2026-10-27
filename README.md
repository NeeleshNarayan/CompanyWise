<div align="center">

# Companywise

### A calmer way to prepare for your next coding interview.

Browse LeetCode questions by company, focus on a time window, and keep your practice list close at hand.

[Features](#-features) · [Getting started](#-getting-started) · [Data](#-question-data) · [Project structure](#-project-structure)

</div>

---

## ✨ Features

- **Browse 469+ companies** from a searchable, sortable company library.
- **Explore questions by timeframe:** past 30 days, past 3 months, past 6 months, older questions, and all time, when available.
- **Find a problem fast** with question search inside each company list.
- **Save questions for later.** Your saved list is available from the profile button and stays in your browser.
- **Move between companies** with previous and next controls.
- **Choose light or dark mode.** Your theme and sidebar preference are remembered on your device.
- **Use it on desktop or mobile,** with a collapsible company sidebar and mobile navigation drawer.

> The data source provides three-month and six-month lists; these are shown using the source’s actual periods rather than being relabeled as 60 or 90 days.

## 🖥️ Preview

The app opens to a company question bank. Search a company in the left sidebar, choose an available timeframe, then open a question on LeetCode or bookmark it for later.

## 🚀 Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Production build

```bash
npm run build
npm run preview
```

## 📚 Question data

Company questions are sourced from [Ashokakotresha/interview-company-wise-problems](https://github.com/Ashokakotresha/interview-company-wise-problems). The downloaded archive is stored at:

```text
public/data/interview-company-wise-problems-main/
```

The app reads a generated manifest and one JSON file for the selected company from `public/data`. To rebuild these files after replacing or updating the CSV archive, run:

```bash
npm run prepare:data
```

The source CSVs are organized into company folders and typically contain `Title`, `Link`, `Difficulty`, and `Frequency` columns. The data-preparation script recognizes these period files:

| Source CSV name | App timeframe |
| --- | --- |
| `1. Thirty Days.csv` | Past 30 days |
| `2. Three Months.csv` | Past 3 months |
| `3. Six Months.csv` | Past 6 months |
| `4. More Than Six Months.csv` | Older questions |
| `5. All.csv` | All time |

Some companies may not have every timeframe. Only available lists are enabled in the app.

## 🧰 Tech stack

- [React](https://react.dev/) for the interface
- [Vite](https://vite.dev/) for local development and production builds
- [Lucide](https://lucide.dev/) for icons
- [Papa Parse](https://www.papaparse.com/) for CSV parsing in the preparation workflow

## 🗂️ Project structure

```text
.
├── public/
│   └── data/
│       ├── companies/                 # Generated per-company JSON
│       ├── manifest.json              # Generated company index
│       └── interview-company-wise-problems-main/  # Source CSV archive
├── scripts/
│   └── prepare-data.mjs               # Builds the manifest and JSON files
├── src/
│   ├── App.jsx                        # Main app and browsing interactions
│   ├── main.jsx                       # React entry point
│   └── styles.css                     # Responsive styles and themes
├── index.html
└── package.json
```

## ⌨️ Helpful commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the local development server |
| `npm run prepare:data` | Rebuild app data from the CSV archive |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## 📌 Attribution

This project provides a browsing interface for the company-wise interview question data. The question data is maintained by its original authors; please review the source repository’s license and preserve its attribution and license notices when redistributing the data.

## 🤖 How it was built

This project was **vibe coded collaboratively with OpenAI Codex**, with the project brief, design direction, and feedback provided by the project owner.

- **Build window:** October 28, 2026
- **Elapsed collaboration time:** about **53 minutes**, based on this chat’s start and latest update timestamps

The elapsed time is the span of the build conversation, including pauses; it is not a measure of continuous hands-on coding time.

---

<div align="center">

Made for focused practice, one question at a time.

</div>
