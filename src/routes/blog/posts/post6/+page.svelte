<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Custom Node & Clock Sequence: Full Control Over UUID v1</title>
  <meta name="description" content="Learn how to override the node and clock sequence in UUID v1 for testing, debugging, and deterministic ID generation." />
  <meta property="og:title" content="Custom Node & Clock Sequence: Full Control" />
  <meta property="og:description" content="Advanced UUID v1 features: set your own 48-bit node and 14-bit clock sequence for reproducible, testable identifiers." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Custom Node & Clock Sequence</p>
  </div>

  <article class="prose">
    <h1>Custom Node & Clock Sequence: Full Control Over UUID v1</h1>
    <p class="post-meta">Published: November 28, 2025</p>

    <p>While most UUID v1 tools hide the internals, this generator exposes full control via the Advanced panel — perfect for testing and edge cases.</p>

    <h2>The 48-bit Node Field</h2>
    <p>Traditionally the MAC address. Now you can set any 12-hex-digit value (e.g., <code>001122334455</code>). All generated UUIDs will end with that node — great for:</p>
    <ul>
      <li>Testing sharding logic</li>
      <li>Simulating multiple devices</li>
      <li>Creating deterministic test data</li>
    </ul>

    <h2>The 14-bit Clock Sequence</h2>
    <p>Prevents duplicates when time goes backward. You can force any value 0–16383. Useful for:</p>
    <ul>
      <li>Reproducing collision scenarios</li>
      <li>Testing clock rollback handling</li>
      <li>Generating identical UUID streams</li>
    </ul>

    <h2>Real Example</h2>
    <p>Set Node = <code>aabbccddeeff</code>, Clock Seq = <code>42</code> → every UUID becomes:</p>
    <code class="d-block p-3 bg-dark text-light rounded">xxxxxxxx-xxxx-1xxx-xxxx-aabbccddeeff</code>

    <h2>FAQ</h2>
    <details>
      <summary>Is this breaking RFC compliance?</summary>
      <p>No — the RFC allows custom nodes and clock sequences as long as version/variant bits are correct.</p>
    </details>

    <p class="italic-note">Full control. Full compliance. Zero compromise.</p>
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