---
layout: page
title: "Article Archive"
subtitle: "A chronological list of all articles published on Aether & Code."
permalink: /archive/
---

<div class="archive-list">
  {% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in postsByYear %}
    <section class="archive-year-group">
      <h3>{{ year.name }}</h3>
      <ul class="archive-posts">
        {% for post in year.items %}
          <li class="archive-post-item">
            <time class="archive-post-date" datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d" }}
            </time>
            <div class="archive-post-title">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </div>
          </li>
        {% endfor %}
      </ul>
    </section>
  {% else %}
    <div class="no-posts-found">
      <h3>No articles found!</h3>
      <p>Start writing some blog posts to see them list out in this chronological timeline.</p>
    </div>
  {% endfor %}
</div>
