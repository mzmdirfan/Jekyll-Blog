/**
 * Aether & Code - Main JavaScript Core
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initBackToTop();
  initCodeCopy();
  initReadTime();
  initTableOfContents();
  initSearchAndFilters();
});

/**
 * 1. Theme Toggling
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * 2. Mobile Menu Toggler
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const body = document.body;

  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    const isActive = body.classList.toggle('mobile-menu-active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close menu when clicking navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-menu-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 3. Scroll to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // Show button when scrolling past 300px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'all';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
      backToTopBtn.style.transform = 'translateY(10px)';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 4. Copy Code Snippet Button
 */
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(block => {
    // Find the code element inside the pre block
    const code = block.querySelector('code');
    if (!code) return;

    // Create wrapper container if not already grouped
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.type = 'button';
    copyButton.textContent = 'Copy';
    
    // Add copy button to the top-right of pre element
    block.style.position = 'relative';
    block.appendChild(copyButton);

    copyButton.addEventListener('click', async () => {
      const codeText = code.textContent;
      try {
        await navigator.clipboard.writeText(codeText);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
        copyButton.textContent = 'Failed';
      }
    });
  });
}

/**
 * 5. Reading Time Calculation
 */
function initReadTime() {
  const readTimeIndicator = document.getElementById('read-time-indicator');
  const postBody = document.getElementById('post-body-content');
  
  if (!readTimeIndicator || !postBody) return;

  const text = postBody.innerText || postBody.textContent;
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  
  // Average reading speed is roughly 200 words per minute
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  readTimeIndicator.textContent = `${readingTime} min read`;
}

/**
 * 6. Sticky Outline/Table of Contents Generator & Scrollspy
 */
function initTableOfContents() {
  const tocContainer = document.getElementById('post-outline');
  const postBody = document.getElementById('post-body-content');

  if (!tocContainer || !postBody) return;

  // Extract H2 and H3 elements
  const headings = postBody.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    const parentAside = tocContainer.closest('aside');
    if (parentAside) parentAside.style.display = 'none';
    return;
  }

  const tocList = document.createElement('nav');
  tocList.className = 'outline-list';

  const headingAnchors = [];

  headings.forEach((heading, idx) => {
    // Ensure headings have unique ID slugs
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `section-${idx}`;
    }

    const anchor = document.createElement('a');
    anchor.href = `#${heading.id}`;
    anchor.className = 'toc-link';
    anchor.textContent = heading.textContent;

    // Indent sub-headers
    if (heading.tagName.toLowerCase() === 'h3') {
      anchor.classList.add('toc-indent-3');
    }

    tocList.appendChild(anchor);
    headingAnchors.push({
      element: heading,
      anchor: anchor
    });
  });

  tocContainer.appendChild(tocList);

  // Scrollspy logic to highlight headings on page scroll
  function updateScrollspy() {
    const scrollPos = window.scrollY + 120; // offset header height

    // Find the current heading
    let activeAnchor = null;

    for (let i = 0; i < headingAnchors.length; i++) {
      const heading = headingAnchors[i].element;
      const nextHeading = headingAnchors[i + 1]?.element;
      
      const topBoundary = heading.offsetTop;
      const bottomBoundary = nextHeading ? nextHeading.offsetTop : document.documentElement.scrollHeight;

      if (scrollPos >= topBoundary && scrollPos < bottomBoundary) {
        activeAnchor = headingAnchors[i].anchor;
        break;
      }
    }

    // Default to first header if scrolled to very top
    if (!activeAnchor && headingAnchors.length > 0 && window.scrollY < headingAnchors[0].element.offsetTop) {
      activeAnchor = headingAnchors[0].anchor;
    }

    // Set active states
    headingAnchors.forEach(item => {
      if (item.anchor === activeAnchor) {
        item.anchor.classList.add('active');
      } else {
        item.anchor.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollspy);
  updateScrollspy(); // run initial check
}

/**
 * 7. Live Interactive Search and Tag Filter Integration
 */
function initSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const searchStatus = document.getElementById('search-status');
  const resultCount = document.getElementById('search-result-count');
  const postsContainer = document.getElementById('posts-container');
  const filterButtons = document.querySelectorAll('.tag-filter-btn');
  const sidebarTags = document.querySelectorAll('.sidebar-tag-item');

  if (!postsContainer) return; // Exit if not on home page list grid

  const cards = Array.from(postsContainer.querySelectorAll('.post-card'));
  let currentActiveTag = 'all';

  // Live keyup/input handler
  if (searchInput) {
    searchInput.addEventListener('input', runSearchFilter);
  }

  // Clear button click
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      runSearchFilter();
    });
  }

  // Hook tag filter clicks (header pills)
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter');
      setActiveTag(filterVal);
    });
  });

  // Hook sidebar tags click
  sidebarTags.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Don't redirect page, filter locally!
      const filterVal = btn.getAttribute('data-tag');
      setActiveTag(filterVal);
      // Smooth scroll back to filter grid
      const section = document.getElementById('posts-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Process URL queries (e.g. ?tag=web-development)
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get('tag');
  if (tagParam) {
    setActiveTag(tagParam);
  }

  /**
   * Filter and search card matching logic
   */
  function runSearchFilter() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let matchCount = 0;

    // Show/hide clear search button
    if (searchClear) {
      searchClear.style.display = query ? 'flex' : 'none';
    }

    cards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      const excerpt = card.getAttribute('data-excerpt') || '';
      const tags = card.getAttribute('data-tags') || '';
      
      const matchesSearch = !query || 
                            title.includes(query) || 
                            excerpt.includes(query) || 
                            tags.includes(query);

      const matchesTag = currentActiveTag === 'all' || tags.includes(currentActiveTag + ' ');

      if (matchesSearch && matchesTag) {
        card.style.display = 'grid';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update result status indicators
    if (query || currentActiveTag !== 'all') {
      if (searchStatus && resultCount) {
        searchStatus.style.display = 'block';
        resultCount.textContent = matchCount;
      }
    } else {
      if (searchStatus) searchStatus.style.display = 'none';
    }
  }

  /**
   * Sets the active tag class status and refreshes list
   */
  function setActiveTag(tagSlug) {
    currentActiveTag = tagSlug.toLowerCase();

    // Reset status in header pills
    filterButtons.forEach(btn => {
      const btnFilter = btn.getAttribute('data-filter').toLowerCase();
      if (btnFilter === currentActiveTag) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Reset status in sidebar links
    sidebarTags.forEach(btn => {
      const btnTag = btn.getAttribute('data-tag').toLowerCase();
      if (btnTag === currentActiveTag) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Sync address bar search URL cleanly without refreshing page
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + 
                   (currentActiveTag === 'all' ? '' : `?tag=${currentActiveTag}`);
    window.history.pushState({ path: newUrl }, '', newUrl);

    runSearchFilter();
  }
}
