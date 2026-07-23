---
layout: post
title: "Building Static Sites with Jekyll"
subtitle: "An introduction to Jekyll layouts, includes, and Liquid templating for developer blogs."
date: 2026-07-15 08:00:00 +0530
tags: [jekyll, liquid, web-dev]
---

Static Site Generators (SSGs) are a cornerstone of modern web deployment strategies. By compile-building layouts, templates, and markdown files into static HTML pages ahead of time, SSGs eliminate database delays, reduce server overhead, and ensure loading speeds are close to instant.

Among the tools available, **Jekyll** remains one of the most widely used options due to its native support on **GitHub Pages**. In this tutorial, we will explore the core pillars of Jekyll: layouts, partial includes, and Liquid tags.

---

## 1. Understanding Jekyll Directory Layouts

A typical Jekyll project uses a folder structure that keeps content separate from the presentation logic:

- `_config.yml`: Global configuration settings.
- `_layouts/`: Wrappers or master page files.
- `_includes/`: Small, reusable HTML fragments.
- `_posts/`: Markdown files containing actual articles.
- `assets/`: Styling files, images, and client-side JavaScript.

---

## 2. Using Liquid Template Syntax

Jekyll uses the **Liquid** templating language to bind variables and process loops. There are two primary syntaxes in Liquid:

### Output Syntax `{{ ... }}`
Output tags are used to render variables from frontmatter or global site settings:

```html
<!-- Renders page title and publication date -->
<h1>{{ page.title }}</h1>
<time>{{ page.date | date: "%B %d, %Y" }}</time>
```

### Tag Syntax `{% ... %}`
Tag tags are used for logic statements, conditional checks, and looping:

```html
<!-- Loop over list of posts -->
<ul>
  {% for post in site.posts limit:3 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
```

---

## 3. Creating Reusable Components with Includes

Includes allow you to build fragments of HTML (like navigation bars or social links) and insert them anywhere across layouts or files.

For example, to import a file located at `_includes/post-card.html`:

```html
{% include post-card.html post=post %}
```

You can pass arguments (like `post=post`) directly into includes to keep them dynamic and reusable, similar to props in modern component frameworks.

---

## Conclusion

Jekyll provides the structural benefits of component-based code without the runtime bloat of client-side frameworks. In our final article, we will look at the future of AI workflows inside static site architectures.
