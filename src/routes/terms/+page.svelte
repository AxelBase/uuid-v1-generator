<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | UUID v1 Generator – AxelBase</title>
  <meta name="description" content="Terms of use for the free, open-source UUID v1 Generator. No warranties, use at your own risk, MIT licensed code." />
  <meta property="og:title" content="Terms & Conditions – UUID v1 Generator" />
  />
  <meta property="og:description" content="Free to use, no liability, open source. Simple terms for a simple tool." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: November 28, 2025</p>

    <p>By using the <strong>UUID v1 (Timestamp) Generator</strong> ("the Tool"), you agree to these Terms & Conditions.</p>

    <h2>1. Nature of the Tool</h2>
    <p>This is a <strong>free, open-source, client-side web application</strong> designed to generate and decode RFC 4122 Version 1 UUIDs directly in your browser. No data is transmitted to any server.</p>

    <h2>2. License to Use</h2>
    <p>You are granted a worldwide, royalty-free, non-exclusive license to use this tool for any lawful purpose, including commercial projects, testing, education, or production systems.</p>

    <h2>3. No Warranty</h2>
    <p><strong>The Tool is provided "AS IS" without warranty of any kind</strong>, express or implied, including but not limited to:</p>
    <ul>
      <li>Accuracy or correctness of generated UUIDs</li>
      <li>Fitness for a particular purpose</li>
      <li>Non-infringement</li>
      <li>Availability or uptime</li>
    </ul>
    <p>We make no guarantee that generated UUIDs will be unique in your specific environment if clock regression or custom inputs are misused.</p>

    <h2>4. Limitation of Liability</h2>
    <p>In no event shall AxelBase or its contributors be liable for any damages (including loss of data, revenue, or business interruption) arising from the use or inability to use this tool — even if advised of the possibility.</p>

    <h2>5. Open Source Code</h2>
    <p>The source code is licensed under the <strong>MIT License</strong>. You may fork, modify, and redistribute it freely. See the GitHub repository for full license text.</p>

    <h2>6. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the tool for unlawful purposes</li>
      <li>Attempt to overload or attack the hosting infrastructure</li>
      <li>Misrepresent the tool as your own without attribution</li>
    </ul>

    <h2>7. Changes to Terms</h2>
    <p>We may modify these terms at any time. Continued use after changes constitutes acceptance.</p>

    <h2>8. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense.</p>

    <p class="italic-note"><strong>Simple tool. Simple rules.</strong><br>Use freely. Share widely. No strings attached.</p>
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