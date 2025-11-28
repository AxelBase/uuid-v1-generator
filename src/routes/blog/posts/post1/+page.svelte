<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>What is a UUID v1? The Complete Guide | UUID v1 Generator</title>
  <meta name="description" content="Learn exactly how UUID version 1 works: 60-bit timestamp, clock sequence, node ID, and why it reveals the precise moment an ID was created." />
  <meta property="og:title" content="What is a UUID v1? The Complete Guide" />
  <meta property="og:description" content="Deep dive into time-based UUIDs (RFC 4122 Version 1): how they encode nanosecond-precision timestamps and when to use them in 2025." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AxelBase UUID v1 Generator" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="What is a UUID v1? The Complete Guide" />
  <meta name="twitter:description" content="Understand timestamp-based UUIDs: structure, privacy, sorting benefits, and real-world use cases." />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>What is a UUID v1?</p>
  </div>

  <article class="prose">
    <h1>What is a UUID v1? The Complete Guide</h1>
    <p class="post-meta">Published: November 28, 2025</p>

    <p>A <strong>UUID v1</strong> (Version 1 Universally Unique Identifier) is a 128-bit identifier defined by RFC 4122 that combines a high-precision timestamp with a node identifier to guarantee global uniqueness — even across distributed systems without coordination.</p>

    <p>Unlike random UUID v4, a UUID v1 is <strong>time-ordered</strong>: the most significant 60 bits contain a timestamp measured in 100-nanosecond intervals since the Gregorian calendar epoch (October 15, 1582). This means you can extract the exact creation time from any v1 UUID — down to 100 ns precision.</p>

    <h2>How UUID v1 Is Structured</h2>
    <p>Every v1 UUID follows this layout:</p>
    <ul>
      <li><strong>Bits 0–31</strong>: time_low</li>
      <li><strong>Bits 32–47</strong>: time_mid</li>
      <li><strong>Bits 48–59</strong>: time_hi (12 bits) + version 1 (4 bits)</li>
      <li><strong>Bits 60–73</strong>: clock sequence (14 bits) + variant (10xx)</li>
      <li><strong>Bits 74–121</strong>: node (48 bits — traditionally MAC address)</li>
    </ul>

    <h2>Why Use UUID v1 in 2025?</h2>
    <p>Despite privacy concerns about exposing MAC addresses, UUID v1 remains extremely valuable:</p>
    <ul>
      <li>Naturally sortable by creation time (perfect for logs, audits, message queues)</li>
      <li>Monotonically increasing within a single machine</li>
      <li>Excellent for database indexing when insertion order matters</li>
      <li>Deterministic debugging — you can tell exactly when an ID was made</li>
    </ul>

    <p>Modern implementations (like this tool) randomize the node by default, eliminating privacy risks while preserving all benefits.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Is UUID v1 still safe to use?</summary>
      <p>Yes — when the node is randomized (as done here), there is zero privacy leak.</p>
    </details>
    <details>
      <summary>Can I extract the creation date from any v1 UUID?</summary>
      <p>Absolutely. Try pasting any v1 UUID into this tool — it instantly shows the exact UTC timestamp.</p>
    </details>
    <details>
      <summary>Should I use v1 or v4?</summary>
      <p>Use v1 when you need chronological order or auditability. Use v4 when pure randomness is required.</p>
    </details>

    <p class="italic-note">UUID v1 isn't dead — it's evolved. With randomized nodes, it's safer and more useful than ever.</p>
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