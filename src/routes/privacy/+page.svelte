<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | UUID v1 Generator – AxelBase</title>
  <meta name="description" content="We collect zero data. This UUID v1 generator runs 100% in your browser — no tracking, no logs, no cookies." />
  <meta property="og:title" content="Privacy Policy – UUID v1 Generator" />
  <meta property="og:description" content="Your UUIDs and timestamps never leave your device. Full privacy by design." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 28, 2025</p>

    <p>Welcome to the <strong>UUID v1 (Timestamp) Generator</strong> by AxelBase. This tool was built with one core principle: <strong>your data never leaves your device</strong>.</p>

    <h2>1. Zero Data Collection</h2>
    <p><strong>We do not collect, store, transmit, or process any personal information — period.</strong></p>
    <ul>
      <li>No IP addresses are logged</li>
      <li>No browser fingerprinting</li>
      <li>No cookies, localStorage persistence, or tracking pixels</li>
      <li>No analytics (Google Analytics, Plausible, Umami, etc.)</li>
      <li>No server-side logging of any kind</li>
    </ul>
    <p>All UUID generation, timestamp decoding, bulk exports, and clipboard operations happen <strong>entirely in your browser</strong> using client-side JavaScript.</p>

    <h2>2. 100% Client-Side Operation</h2>
    <p>When you use this tool:</p>
    <ul>
      <li>UUIDs are generated using <code>crypto.getRandomValues()</code> in your browser</li>
      <li>Timestamps are extracted using pure JavaScript (no network calls)</li>
      <li>Bulk downloads are created via <code>Blob</code> and <code>URL.createObjectURL()</code></li>
      <li>Copy-to-clipboard uses the native Clipboard API</li>
    </ul>
    <p><em>Nothing is ever sent to any server — not even error reports.</em></p>

    <h2>3. Offline-First & PWA</h2>
    <p>This site is a Progressive Web App. After your first visit, it works completely offline. The service worker caches all assets locally — ensuring <strong>zero telemetry</strong> even when disconnected.</p>

    <h2>4. Third-Party Services</h2>
    <p>We use only one external resource: Bootstrap 5.3.3 via jsDelivr CDN (for styling). This CDN does not set cookies or track users when used in this static context. No other third-party scripts are loaded.</p>

    <h2>5. Open Source Transparency</h2>
    <p>The entire source code is publicly available on GitHub. You can verify for yourself that no tracking or data collection exists. We encourage security researchers and privacy advocates to audit the repository.</p>

    <h2>6. Children's Privacy</h2>
    <p>This tool is safe and appropriate for all ages. Since no data is collected, it fully complies with COPPA and similar regulations by default.</p>

    <h2>7. Changes to This Policy</h2>
    <p>If we ever change this policy (extremely unlikely), the new version will be posted here with an updated effective date.</p>

    <h2>8. Contact</h2>
    <p>Questions? Open an issue on our GitHub repository — we respond quickly.</p>

    <p class="italic-note"><strong>Privacy isn’t a feature — it’s the foundation.</strong><br>Thank you for trusting a truly private UUID v1 generator.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-secondary); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: 0.5rem; }
  .prose ul { list-style-type: '→ '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: var(--text-secondary); }
</style>