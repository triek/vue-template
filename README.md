# Vue + Tailwind + GitHub Pages (gh-pages) Setup Guide

This guide covers **everything from initializing Vue to deploying on GitHub Pages**, using:

- Vite
- Vue 3
- Tailwind v4
- `gh-pages` branch
- `src/style.css` (not `main.css`)

No extra folders. No outdated commands.

---

## 1. Initialise Vue in an Existing Repo

From your repo root:

```bash
npm create vite@latest . -- --template vue
```

```bash
npm install
```

When prompted about the folder not being empty, answer **│Remove existing files and continue**.

This creates:

- index.html
- src/main.js
- src/App.vue
- vite.config.js
- package.json

Your repo is now a Vue project.

---

## 2. Run Dev Mode (Verify Setup)

```bash
npm run dev
```

If Vue does not load here, **stop and fix it before continuing**.

---

## 3. Add Tailwind v4 (No Init Command)

Tailwind v4 does **not** use `npx tailwindcss init`.

Install:

```bash
npm install tailwindcss @tailwindcss/vite
```

In `src/style.css`:

```css
@import "tailwindcss";

/* your custom styles below */
```

Restart dev server:

```bash
npm run dev
```

Test Tailwind in `App.vue`:

```vue
<template>
  <div class="bg-black text-white p-6">
    Tailwind is working
  </div>
</template>
```

---

## 4. Add Vue DevTools plugin

```bash
npm install -D vite-plugin-vue-devtools
```

---

## 5. Set the Base Path (Critical for GitHub Pages)

This is where most deployments fail.

Open `vite.config.js` and set `base` depending on your repo name.

### Case A: Repo is `triek.github.io`
URL: `https://triek.github.io/`

```js
base: '/'
```

### Case B: Repo is `portfolio` (or any normal repo)
URL: `https://triek.github.io/portfolio/`

```js
base: '/portfolio/'
```

### Full Example `vite.config.js`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/REPO-NAME/', // '/' for triek.github.io, '/repo-name/' otherwise
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
})
```

**Leading and trailing slashes are mandatory.**

---

## 6. Refactor Portfolio Structure

Recommended structure:

```txt
src/
  components/
    Navbar.vue
    Footer.vue
    ProjectCard.vue
  pages/
    HomePage.vue
    ProjectsPage.vue
    AboutPage.vue
    ContactPage.vue
  App.vue
  main.js
  style.css
```

`App.vue` should only handle layout, not all content.

---

## 7. Deploy to GitHub Pages Using `gh-pages`

Install:

```bash
npm install --save-dev gh-pages
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "vite build && gh-pages -d dist -b gh-pages",
    "preview": "vite preview"
  }
}
```

Deploy:

```bash
npm run deploy
```

You don't need to run `npm run build` separately.

---

## 8. Configure GitHub Pages

On GitHub:

1. Repo → **Settings**
2. **Pages**
3. Source: `Deploy from a branch`
4. Branch: `gh-pages`
5. Folder: `/ (root)`

Save and wait a minute.

---

## 9. Update Workflow (From Now On)

Every update follows this flow:

```bash
npm run dev
```

Fix stuff.

```
npm run deploy
```

That’s it.

---

## Common Failure Cause

If your site loads as a blank page:

- Your `base` value in `vite.config.js` is wrong

---
