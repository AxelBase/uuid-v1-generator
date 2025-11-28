<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>UUID v1 vs v4 vs v7: Which Should You Use in 2025?</title>
  <meta name="description" content="Complete comparison of UUID versions 1, 4, and 7 — performance, privacy, sortability, and real-world recommendations." />
  <meta property="og:title" content="UUID v1 vs v4 vs v7: Which Should You Use in 2025?" />
  <meta property="og:description" content="Time-based, random, or Unix-ordered? Choose the right UUID version for databases, distributed systems, and frontend apps." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>UUID v1 vs v4 vs v7</p>
  </div>

  <article class="prose">
    <h1>UUID v1 vs v4 vs v7: Which Should You Use in 2025?</h1>
    <p class="post-meta">Published: November 28, 2025</p>

    <p>Choosing the right UUID version is more important than ever. Here’s a no-nonsense comparison of the three most relevant versions today.</p>

    <h2>UUID v1 – Time-Based (This Tool)</h2>
    <ul>
      <li>60-bit timestamp + node</li>
      <li>Naturally sortable by creation time</li>
      <li>Excellent for logs, audits, message ordering</li>
      <li>Privacy-safe when node is randomized (as done here)</li>
      <li>Best for: databases where insertion order matters, distributed tracing</li>
    </ul>

    <h2>UUID v4 – Pure Random</h2>
    <ul>
      <li>122 bits of cryptographically strong randomness</li>
      <li>No timestamp, no ordering</li>
      <li>Maximum privacy — zero information leakage</li>
      <li>Worst database index performance (fragmented inserts)</li>
      <li>Best for: public APIs, tokens, when privacy is paramount</li>
    </ul>

    <h2>UUID v7 – Unix Timestamp + Random (New Standard)</h2>
    <ul>
      <li>48-bit Unix milliseconds + 74-bit random</li>
      <li>Perfectly sortable like v1</li>
      <li>No MAC/node exposure</li>
      <li>Only available in newer libraries (PostgreSQL 17+, etc.)</li>
      <li>Best for: new systems wanting sortability + privacy</li>
    </ul>

    <h2>Recommendation Matrix</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Use Case</th>
          <th>Winner</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Database primary keys</td>
          <td><strong>v7</strong> or v1 (randomized)</td>
        </tr>
        <tr>
          <td>Logs & audit trails</td>
          <td><strong>v1</strong></td>
        </tr>
        <tr>
          <td>Public tokens / URLs</td>
          <td><strong>v4</strong></td>
        </tr>
        <tr>
          <td>Need offline generation</td>
          <td><strong>v1</strong> or v4</td>
        </tr>
      </tbody>
    </table>

    <h2>FAQ</h2>
    <details>
      <summary>Is UUID v1 dead?</summary>
      <p>No. With randomized nodes, it’s making a comeback — especially for analytics and observability.</p>
    </details>
    <details>
      <summary>Should I migrate to v7?</summary>
      <p>Yes if you control your stack. Otherwise, randomized v1 is still excellent.</p>
    </details>

    <p class="italic-note">In 2025, UUID v1 isn’t obsolete — it’s evolved. Use it confidently with randomization.</p>
  </article>
</div>

<style>
  /* Same beautiful styles from your template */
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-secondary); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, h2 { color: var(--accent-secondary); }
  .prose ul { list-style-type: '→ '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin: 1rem 0; }
  .prose details[open] { background: var(--card-bg); }
  .prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
  .prose summary::before { content: '+'; margin-right: 0.75rem; font-weight: bold; color: var(--accent-primary); transition: 0.2s; }
  .prose details[open] summary::before { transform: rotate(45deg); }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: var(--text-secondary); }
</style>