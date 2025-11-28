<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Extracting Creation Time from Any UUID v1</title>
  <meta name="description" content="Learn how to decode the embedded timestamp from any Version 1 UUID — instantly in your browser with this free tool." />
  <meta property="og:title" content="Extracting Creation Time from Any UUID v1" />
  <meta property="og:description" content="No server needed: paste any v1 UUID and see the exact creation date and time — down to 100-nanosecond accuracy." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Extracting Creation Time</p>
  </div>

  <article class="prose">
    <h1>Extracting Creation Time from Any UUID v1</h1>
    <p class="post-meta">Published: November 28, 2025</p>

    <p>One of the most powerful features of UUID v1 is that the creation time is permanently embedded in the identifier itself — no database lookup required.</p>

    <p>This tool instantly decodes any valid v1 UUID and shows you:</p>
    <ul>
      <li>Human-readable UTC timestamp (e.g., “2025-11-28 14:32:10.123 UTC”)</li>
      <li>Unix milliseconds since 1970</li>
      <li>100-nanosecond precision from the original Gregorian epoch</li>
    </ul>

    <h2>How It Works</h2>
    <p>The first 60 bits of a v1 UUID form a counter of 100ns intervals since October 15, 1582. By extracting and reordering these bits, we reconstruct the exact moment the UUID was generated.</p>

    <h2>Real-World Uses</h2>
    <ul>
      <li>Debugging distributed systems</li>
      <li>Correlating logs across services</li>
      <li>Forensic analysis of data breaches</li>
      <li>Verifying event ordering without timestamps</li>
    </ul>

    <h2>Try It Now</h2>
    <p>Go to the homepage and generate a few UUIDs — watch the timestamp update live. Then try pasting an old v1 UUID from your logs!</p>

    <h2>FAQ</h2>
    <details>
      <summary>Will this work with any v1 UUID?</summary>
      <p>Yes — even ones generated years ago on different systems.</p>
    </details>
    <details>
      <summary>What if the UUID is not v1?</summary>
      <p>The tool safely detects invalid format or wrong version and shows nothing.</p>
    </details>

    <p class="italic-note">Your UUIDs are time machines. This tool lets you look into the past.</p>
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