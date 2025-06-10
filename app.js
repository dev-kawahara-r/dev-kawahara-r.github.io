/**
 * Modern Blog Features
 * Claude Code Actions Blog
 */

class BlogApp {
  constructor() {
    this.initializeTheme();
    this.initializeSearch();
    this.initializeReadingProgress();
    this.initializeAnimations();
    this.calculateReadingTimes();
  }

  // Theme Management
  initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDark.matches ? 'dark' : 'light');
    
    this.setTheme(savedTheme);
    
    // Theme toggle event
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
      });
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', 
        theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'
      );
    }
  }

  // Search Functionality
  initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Create search results container
    const searchContainer = searchInput.parentElement;
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-lg);
      margin-top: var(--space-1);
      max-height: 400px;
      overflow-y: auto;
      z-index: var(--z-dropdown);
      display: none;
      box-shadow: var(--shadow-lg);
    `;
    searchContainer.appendChild(searchResults);

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value.trim());
      }, 300);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  async performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    if (!query) {
      searchResults.style.display = 'none';
      return;
    }

    // Simple client-side search
    const posts = this.getAllPosts();
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    this.displaySearchResults(results, query);
  }

  getAllPosts() {
    // In a real implementation, this would come from an API or static data
    return [
      {
        title: 'CI/CDパイプラインをClaude Code Actionsで効率化する方法',
        url: '/posts/cicd-pipeline-integration.html',
        excerpt: 'GitHub Actions、GitLab CI/CD、Jenkins等の主要CI/CDツールとClaude Code Actionsを連携させる実践的な方法を解説。',
        tags: ['CI/CD', 'DevOps']
      },
      {
        title: 'プロジェクト別Claude Code Actions設定例集',
        url: '/posts/project-specific-examples.html',
        excerpt: 'React、Vue、Node.js、Python、Go等の技術スタック別にClaude Code Actionsの実践的な設定例を紹介。',
        tags: ['設定例', '技術スタック']
      },
      {
        title: 'Claude Code Actions よくあるエラーと解決法',
        url: '/posts/common-errors-solutions.html',
        excerpt: 'Claude Code Actionsでよく発生するエラーの原因と解決方法を詳しく解説。',
        tags: ['エラー', 'トラブルシューティング']
      },
      {
        title: 'Claude Code Actionsで自動化できる日常業務10選',
        url: '/posts/daily-automation-tasks.html',
        excerpt: '開発者の日常業務をClaude Code Actionsで効率化！コード生成からデプロイまで、すぐに実践できる自動化レシピを10個紹介。',
        tags: ['自動化', '実用例']
      },
      {
        title: 'Claude Code Actionsとは？基本的な使い方を解説',
        url: '/posts/introduction-to-claude-code-actions.html',
        excerpt: 'Claude Code Actionsの基本的な概念から実際の使用方法まで詳しく解説。',
        tags: ['基本', '入門']
      },
      {
        title: 'カスタムアクションの開発方法',
        url: '/posts/custom-actions-development.html',
        excerpt: '独自のClaude Code Actionsを作成する方法について、実例を交えながら説明。',
        tags: ['開発', 'カスタム']
      },
      {
        title: 'Claude Code Actions活用のベストプラクティス',
        url: '/posts/actions-best-practices.html',
        excerpt: '効率的なワークフローを構築するためのClaude Code Actionsの活用法をご紹介。',
        tags: ['ベストプラクティス', '効率化']
      }
    ];
  }

  displaySearchResults(results, query) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: var(--space-4); text-align: center; color: var(--color-gray-500);">
          「${query}」に関する記事が見つかりませんでした
        </div>
      `;
    } else {
      searchResults.innerHTML = results.map(post => `
        <a href="${post.url}" style="
          display: block;
          padding: var(--space-4);
          border-bottom: 1px solid var(--color-gray-100);
          text-decoration: none;
          color: inherit;
          transition: background-color var(--transition-fast);
        " onmouseover="this.style.backgroundColor='var(--color-gray-50)'" 
           onmouseout="this.style.backgroundColor='transparent'">
          <div style="font-weight: 600; margin-bottom: var(--space-1);">
            ${this.highlightQuery(post.title, query)}
          </div>
          <div style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-2);">
            ${this.highlightQuery(post.excerpt, query)}
          </div>
          <div style="display: flex; gap: var(--space-2);">
            ${post.tags.map(tag => `
              <span style="
                font-size: var(--text-xs);
                background: var(--color-primary);
                color: white;
                padding: var(--space-1) var(--space-2);
                border-radius: var(--radius-full);
              ">${tag}</span>
            `).join('')}
          </div>
        </a>
      `).join('');
    }
    
    searchResults.style.display = 'block';
  }

  highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--color-primary); color: white; padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  // Reading Progress
  initializeReadingProgress() {
    const article = document.querySelector('article.blog-post');
    if (!article) return;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const progressBarInner = progressBar.querySelector('.reading-progress-bar');

    window.addEventListener('scroll', () => {
      const articleRect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = article.offsetHeight;
      
      const scrolled = Math.max(0, -articleRect.top);
      const progress = Math.min(100, (scrolled / (articleHeight - windowHeight)) * 100);
      
      progressBarInner.style.width = `${progress}%`;
    });
  }

  // Calculate Reading Time
  calculateReadingTimes() {
    const articles = document.querySelectorAll('.post-content, .post-excerpt');
    
    articles.forEach(article => {
      const text = article.textContent || article.innerText;
      const wordsPerMinute = 200; // Average reading speed in Japanese
      const words = text.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / wordsPerMinute);
      
      // Find reading time element
      const readingTimeElement = document.querySelector('.reading-time');
      if (readingTimeElement && article.classList.contains('post-content')) {
        readingTimeElement.textContent = `${readingTime}分で読める`;
      }
    });
  }

  // Smooth Animations
  initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.post-preview, .blog-post, .table-of-contents');
    animateElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Copy Code Functionality
  initializeCodeCopy() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.style.cssText = `
        position: absolute;
        top: var(--space-2);
        right: var(--space-2);
        background: var(--color-gray-700);
        color: white;
        border: none;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-base);
        font-size: var(--text-xs);
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--transition-fast);
      `;

      const pre = codeBlock.parentElement;
      pre.style.position = 'relative';
      pre.appendChild(button);

      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });

      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      });
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new BlogApp();
  
  // Initialize code copy functionality
  app.initializeCodeCopy();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
      const searchResults = document.querySelector('.search-results');
      if (searchResults) {
        searchResults.style.display = 'none';
      }
    }
  });
});