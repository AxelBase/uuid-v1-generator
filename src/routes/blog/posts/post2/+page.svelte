<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How UUID v1 Encodes the Exact Timestamp | UUID v1 Generator</title>
  <meta name="description" content="Learn how UUID v1 stores time with 100-nanosecond precision using the Gregorian epoch, and how to decode it instantly in your browser." />
  <meta property="og:title" content="How UUID v1 Encodes the Exact Timestamp" />
  <meta property="og:description" content="Deep technical breakdown of the 60-bit timestamp field that lets you extract the exact creation moment from any Version 1 UUID." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How UUID v1 Encodes Time</p>
  </div>

  <article class="prose">
    <h1>How UUID v1 Encodes the Exact Timestamp</h1>
    <p class="post-meta">Published: November 28, 2025</p>

    <p>One of the most powerful features of UUID version 1 is that it embeds the <strong>precise moment of creation</strong> directly in the identifier — no database lookup needed.</p>

    <p>The timestamp is stored across three fields (time_low, time_mid, time_hi_and_version) forming a single 60-bit integer counting 100-nanosecond intervals since <strong>00:00:00.0000000 UTC on October 15, 1582</strong> — the start of the Gregorian calendar.</p>

    <h2>Why 1582? Why 100ns?</h2>
    <p>The date was chosen because it’s when the Gregorian calendar was introduced. The 100ns resolution (10 million ticks per second) ensures that even millions of UUIDs per second won’t collide.</p>

    <h2>Real Example</h2>
    <p>Take this UUID:</p>
    <code class="d-block p-3 bg-dark text-light rounded">f81d4fae-7dec-11d0-a765-00a0c91e6bf6</code>
    <p>Decodes to exactly:</p>
    <strong>Wednesday, June 30, 1999 21:48:05.150 UTC</strong>

    <h2>How This Tool Decodes It</h2>
    <p>Our generator instantly parses the 60-bit field and displays both:</p>
    <ul>
      <li>Human-readable UTC datetime</li>
      <li>Unix milliseconds since 1970</li>
    </ul>

    <p>This makes debugging distributed tracing, log correlation, and forensic analysis trivial — you can sort events by ID alone.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can clock adjustments break uniqueness?</summary>
      <p>No. The 14-bit clock sequence increments when time appears to go backward, ensuring monotonicity.</p>
    </details>
    <details>
      <summary>Is 100ns precision overkill?</summary>
      <p>Not for high-frequency systems. Financial trading, telemetry, and gaming often need sub-millisecond accuracy.</p>
    </details>

    <p class="italic-note">Try it: Generate a UUID right now — watch the timestamp update in real time.</p>
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