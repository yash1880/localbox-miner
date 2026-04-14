# LocalBox Miner

A React-based offline data management application that demonstrates state management, localStorage integration, CRUD operations, component communication, and event-driven UI updates.

> No backend or API — all data lives in your browser's localStorage.

---

## Project Description

LocalBox Miner lets users add, view, edit, and delete records that persist across page reloads using the browser's `localStorage`. It simulates real-world lightweight admin dashboards and offline-first tools.

---

## Module Explanations

### `App.jsx`
Central hub of the application. Manages the master `records` state and syncs it to `localStorage` via `useEffect`. Passes handlers down as props and owns the dashboard summary stats.

### `RecordForm.jsx` (`/src/components/`)
Handles **Add** and **Edit** modes with controlled inputs. Performs basic validation before calling `onAdd` or `onUpdate`. Switches content and styling depending on whether an `editTarget` is passed in.

### `RecordList.jsx` (`/src/components/`)
Receives the filtered records array and renders a `<table>` by mapping over it with `RecordRow`. Shows a friendly empty-state when no records exist.

### `RecordRow.jsx` (`/src/components/`)
Renders a single table row with Edit and Delete buttons. Demonstrates passing arguments to event handlers: `onClick={() => onEdit(record.id)}` and `onClick={() => onDelete(record.id)}`.

---

## Steps to Run

### Prerequisites
- Node.js 18+
- npm 9+

### Install & start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/localbox-miner.git
cd localbox-miner

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Features

| Feature | Details |
|---|---|
| Add record | Name, value, category with validation |
| Edit record | Pre-filled form, switches to edit mode |
| Delete record | Per-row delete button |
| Clear all | Bulk delete with confirmation prompt |
| Filter by category | Pill buttons filter the table instantly |
| Persist data | All records survive page refresh via localStorage |
| Dashboard stats | Total count, last added, storage size |

---

## Screenshots

> Add screenshots to a `/screenshots` folder and update paths below.

| Screen | Preview |
|---|---|
| Add Record Form | `screenshots/add-form.png` |
| Record List | `screenshots/record-list.png` |
| Edit Mode | `screenshots/edit-mode.png` |
| Delete Confirmation | `screenshots/delete-confirm.png` |
| localStorage in DevTools | `screenshots/localstorage-devtools.png` |

---

## Tech Stack

- React 18
- Vite 5
- Plain CSS (no UI library)
- Browser localStorage API

---

## Marking Scheme Coverage

| Component | Marks |
|---|---|
| Events + Handlers (`onChange`, `onSubmit`, `onClick`) | 2 |
| Conditional Rendering (empty state, edit mode, errors, confirm) | 2 |
| localStorage Operations (read on mount, write on change, JSON) | 2 |
| Argument Passing + List Rendering (`record.id` to handlers, `.map()`) | 2 |
| GitHub + README + Screenshots | 2 |
| **Total** | **10** |
