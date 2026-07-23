# Aether & Code - Modern Jekyll Blog Site

Welcome to **Aether & Code**, a premium, high-performance static blog site built using **Jekyll** and designed from scratch with a custom vanilla CSS system. It features dark/light mode toggling, real-time client-side live search, tag filtering, a dynamic scrollspy reading outline, and interactive code block copy features.

---

## Features

- 🎨 **Sleek Typography & Aesthetics**: Uses Outfit, Inter, and JetBrains Mono from Google Fonts, complete with HSL theme color tokens and subtle hover animations.
- 🌗 **Persisted Theme Switcher**: Persists dark/light theme choices across pages using browser `localStorage` (eliminating white screen flash).
- 🔍 **Interactive Live Search**: Client-side filtering searches blog posts instantaneously by scanning DOM metadata.
- 🏷️ **Tag Filter Pills**: Filter articles by clicking tag badges on the home page or in the sidebar.
- 📋 **Auto Outline Tracker (TOC)**: Generates a table of contents dynamically on post layout grids and updates active states during scrolling.
- 📝 **Copy Code Helper**: Adds copy button overlays to all markdown fenced code blocks automatically.
- 📱 **Fully Responsive Layout**: Built with CSS Grid and Flexbox for mobile, tablet, and widescreen layouts.

---

## Directory Structure

```text
jekyll-blog/
├── _config.yml         # Site configuration & metadata
├── Gemfile             # Ruby dependencies (Jekyll & plugins)
├── index.html          # Main home page entry layout
├── about.md            # "About Me" page with technical skills matrix
├── archive.md          # Chronological timeline groupings
├── contact.md          # Get in touch form layout
├── search.json         # Liquid-generated search indices
├── _layouts/           # Jekyll page layouts templates
│   ├── default.html    # Master HTML wrapper template
│   ├── home.html       # Landing page feed grid
│   ├── post.html       # Single article review container
│   └── page.html       # Generic pages wrapper
├── _includes/          # Reusable component segments
│   ├── head.html       # Metadata tags, fonts, SEO links
│   ├── header.html     # Brand logo, links, dark mode switch
│   ├── footer.html     # Newsletter layout, links, copyright
│   ├── post-card.html  # Post item preview card layout
│   └── sidebar.html    # Profile details, recent list, tags cloud
├── _posts/             # Actual blog article markdowns
│   └── YYYY-MM-DD-name.md
└── assets/             # Core theme styling & logic files
    ├── css/style.css   # Main stylesheet design system
    └── js/main.js      # Interaction controls script
```

---

## Local Development Setup

To run this Jekyll blog on your local computer, select one of the two options below:

### Option 1: Using Ruby (Recommended)

1. **Install Ruby**: Download and install Ruby for your operating system.
   - For Windows, use [RubyInstaller for Windows](https://rubyinstaller.org/) (ensure you choose the Devkit version).
2. **Install Bundler**: Open your command line interface and run:
   ```bash
   gem install bundler
   ```
3. **Install Dependencies**: Navigate to the blog project folder and run:
   ```bash
   bundle install
   ```
4. **Start Dev Server**: Run the local serving command:
   ```bash
   bundle exec jekyll serve
   ```
5. **View Local Build**: Open your browser and navigate to `http://localhost:4000`.

### Option 2: Using Docker (Alternative)

If you do not want to install Ruby directly on your system, you can build and run the blog using a Docker container:

```bash
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -p 4000:4000 \
  -it jekyll/jekyll:4.2.0 \
  jekyll serve
```

---

## Creating New Blog Posts

To create a new post, create a markdown file under the `_posts/` folder using the naming convention `YYYY-MM-DD-your-title.md` (e.g. `2026-07-23-getting-started-with-css.md`). 

Every post requires **YAML frontmatter** settings at the top of the file:

```yaml
---
layout: post
title: "Your Post Title"
subtitle: "A short, engaging summary of the article."
date: 2026-07-23 10:00:00 +0530
tags: [tag1, tag2]
image: /assets/images/cover.jpg  # Optional featured image
---

Your article markdown content starts here...
```

---

## Deployment & Hosting

Static sites are incredibly simple and cost-efficient to host. Here are two popular options:

### GitHub Pages (Free)

1. Create a new repository on GitHub named `yourusername.github.io`.
2. Push this blog project directory contents to the repository.
3. Go to **Settings > Pages** in your GitHub repository interface.
4. Set the **Source** to "GitHub Actions" or choose the default branch option (GitHub Pages will compile and deploy your Jekyll site automatically!).

### Netlify or Vercel (Free)

1. Connect your repository containing this blog project to Netlify/Vercel.
2. Configure the build settings as follows:
   - **Build Command**: `jekyll build` (or `bundle exec jekyll build`)
   - **Publish Directory**: `_site`
3. Click deploy! Netlify/Vercel will build and serve your site.
