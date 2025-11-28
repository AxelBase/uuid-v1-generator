<script lang="ts">
    import {base} from '$app/paths';
    import { generateUuidV1, extractTimestamp } from '$lib/uuidv1';
    import { copyToClipboard, downloadTextFile, formatTimestamp } from '$lib/utils';
    import { onMount } from 'svelte';

    let singleUuid = '';
    let uuidList: string[] = [];
    let bulkCount = 1;
    let showAdvanced = false;

    // Advanced fields
    let customNode = '';
    let customClockSeq = '';

    let copyFeedback = '';
    let isGenerating = false;

    // Generate one UUID immediately on load (FR01 + FR02)
    onMount(() => generateSingle());

    function generateSingle() {
        isGenerating = true;
        const uuid = generateUuidV1(
            customNode.trim() || undefined,
            customClockSeq.trim() ? Number(customClockSeq) : undefined
        );
        singleUuid = uuid.toLowerCase();
        uuidList = [singleUuid];
        isGenerating = false;
    }

    function generateBulk() {
        if (bulkCount < 1 || bulkCount > 10_000) return;
        isGenerating = true;
        const list: string[] = [];
        const node = customNode.trim() || undefined;
        const clock = customClockSeq.trim() ? Number(customClockSeq) : undefined;

        for (let i = 0; i < bulkCount; i++) {
            list.push(generateUuidV1(node, clock).toLowerCase());
        }
        uuidList = list;
        singleUuid = list[0] || '';
        isGenerating = false;
    }

    async function copyCurrent() {
        const ok = await copyToClipboard(singleUuid);
        if (ok) {
            copyFeedback = 'Copied!';
            setTimeout(() => (copyFeedback = ''), 2000);
        }
    }

    function downloadList() {
        const filename = `uuid-v1-${new Date().toISOString().slice(0, 10)}.txt`;
        downloadTextFile(filename, uuidList.join('\n'));
    }

    // Reactive timestamp decoding (FR08)
    $: currentTimestampMs = singleUuid ? extractTimestamp(singleUuid) : null;
    $: currentTimestampFormatted = currentTimestampMs ? formatTimestamp(currentTimestampMs) : '';
</script>

<svelte:head>
    <title>AxelBase – UUID v1 (Timestamp) Generator</title>
    <meta name="description" content="Free online RFC 4122 Version 1 UUID generator with timestamp decoding, bulk generation, and offline support." />
</svelte:head>

<main class="container">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-xxl-7 text-center mb-5">
             <h1 class="display-4 fw-bold mb-3">UUID v1 Generator</h1>
             <p class="text-muted">Generate RFC-compliant timestamp-based unique identifiers instantly.</p>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-lg-8 col-xxl-7">

            <div class="card p-4 mb-4">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-3 flex-wrap">
                        <button 
                            class="btn btn-primary flex-shrink-0" 
                            on:click={generateSingle} 
                            disabled={isGenerating}
                        >
                            {#if isGenerating}
                                <span class="spinner-border spinner-border-sm me-2"></span>
                            {/if}
                            Generate
                        </button>

                        <input 
                            type="text" 
                            class="form-control form-control-lg text-monospace text-center flex-grow-1"
                            bind:value={singleUuid} 
                            readonly
                            placeholder="Click Generate →" 
                        />

                        <button 
                            class="btn btn-outline-secondary btn-copy" 
                            on:click={copyCurrent}
                            disabled={!singleUuid}
                        >
                            {copyFeedback || 'Copy'}
                        </button>
                    </div>

                    {#if currentTimestampMs !== null}
                        <div class="text-center mt-3" style="color: var(--sulfur);">
                            <small class="opacity-75">Extracted Timestamp:</small><br />
                            <strong>{currentTimestampFormatted}</strong>
                            <div class="small opacity-50">Unix ms: {currentTimestampMs}</div>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="card p-4 mb-4">
                <div class="card-body">
                    <h2 class="h5 mb-3">Bulk Generate</h2>
                    <div class="row g-3 align-items-end">
                        <div class="col-auto">
                            <label class="form-label text-muted small" for="bulkCount">Count (1–10,000)</label>
                            <input 
                                type="number" 
                                class="form-control" 
                                id="bulkCount" 
                                min="1" 
                                max="10000" 
                                bind:value={bulkCount} 
                            />
                        </div>
                        <div class="col-auto">
                            <button 
                                class="btn btn-success" 
                                on:click={generateBulk}
                                disabled={isGenerating || bulkCount < 1 || bulkCount > 10000}
                            >
                                Generate {bulkCount}
                            </button>
                        </div>
                        {#if uuidList.length > 1}
                            <div class="col-auto">
                                <button class="btn btn-outline-primary" on:click={downloadList}>
                                    Download .txt ({uuidList.length})
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="card p-4">
                <div class="card-header bg-transparent border-0 px-0 pt-0 pb-2">
                    <button 
                        class="btn btn-link text-decoration-none p-0 fw-bold" 
                        style="color: var(--sulfur);"
                        on:click={() => (showAdvanced = !showAdvanced)}
                    >
                        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                    </button>
                </div>

                {#if showAdvanced}
                    <div class="card-body px-0 pt-2" transition:fly|local={{ y: -10, duration: 200 }}>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label text-muted small" for="customNode">
                                    Custom Node (48-bit hex)
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control form-control-sm text-monospace" 
                                    id="customNode" 
                                    placeholder="Random if empty" 
                                    bind:value={customNode} 
                                    maxlength="12" 
                                />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small" for="clockSeq">
                                    Clock Sequence (0–16383)
                                </label>
                                <input 
                                    type="number" 
                                    class="form-control form-control-sm" 
                                    id="clockSeq" 
                                    min="0" 
                                    max="16383" 
                                    placeholder="Random if empty" 
                                    bind:value={customClockSeq} 
                                />
                            </div>
                        </div>
                        <small class="text-muted d-block mt-3 fst-italic">
                            *Leave blank for standard RFC-compliant random generation.
                        </small>
                    </div>
                {/if}
            </div>

<section id="about" class="py-5 mt-5 rounded-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9 text-center">
        <h2 class="display-5 fw-bold mb-4">About This Tool</h2>
        <p class="lead text-muted mb-4">
          Welcome to the most privacy-respecting, technically accurate <strong>UUID v1 (Timestamp-Based) Generator</strong> on the internet — built by AxelBase.
        </p>
        <p class="fs-5 text-muted lh-lg">
          Unlike most online UUID tools that only offer random v4 IDs, this generator implements <strong>full RFC 4122 Version 1</strong> compliance directly in your browser. That means every ID contains a real, extractable timestamp measured in 100-nanosecond intervals since the Gregorian epoch (October 15, 1582). You can literally see <em>when</em> an ID was created — down to sub-millisecond precision.
        </p>
        <p class="fs-5 text-muted lh-lg">
          We believe in <strong>zero telemetry, zero tracking, zero compromises</strong>. Nothing you generate ever leaves your device. No cookies. No analytics. No server logs. Not even your IP addresses. The entire application runs client-side using modern Web Crypto API and is fully functional offline after the first visit (thanks to service worker caching).
        </p>
        <p class="fs-5 text-muted lh-lg">
          Whether you're debugging distributed systems, building event-sourced architectures, populating test datasets, or just curious about how time-based UUIDs work — this tool gives you full control. Generate one ID or ten thousand. Decode timestamps instantly. Override node and clock sequence for reproducible testing. Everything happens instantly, securely, and privately.
        </p>
        <p class="fs-5 text-muted lh-lg">
          This project is <strong>100% open source</strong> (MIT licensed), hosted on GitHub, and built with SvelteKit + Bootstrap. No backend. No database. No nonsense.
        </p>
        <div class="mt-4">
          <span class="badge bg-primary fs-6 px-3 py-2">RFC 4122 Compliant</span>
          <span class="badge bg-success fs-6 px-3 py-2 ms-2">Privacy First</span>
          <span class="badge bg-info fs-6 px-3 py-2 ms-2">Offline Ready</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="how-to" class="py-5 mt-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <h2 class="display-5 fw-bold text-center mb-5">How to Use</h2>

        <div class="row g-4">
          <div class="col-md-4 text-center">
            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 70px; height: 70px;">
              <span class="fs-3 fw-bold">1</span>
            </div>
            <h4>Generate Instantly</h4>
            <p class="text-muted">
              Click the big <strong>Generate</strong> button to create a single, standards-compliant UUID v1. A fresh timestamp-based ID appears immediately — along with its decoded human-readable creation time.
            </p>
          </div>

          <div class="col-md-4 text-center">
            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 70px; height: 70px;">
              <span class="fs-3 fw-bold">2</span>
            </div>
            <h4>Bulk Generation</h4>
            <p class="text-muted">
              Need thousands? Enter a number (1–10,000) in the <strong>Bulk Generate</strong> section and click generate. All IDs are created instantly in memory. Download them as a clean <code>.txt</code> file with one UUID per line.
            </p>
          </div>

          <div class="col-md-4 text-center">
            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 70px; height: 70px;">
              <span class="fs-3 fw-bold">3</span>
            </div>
            <h4>Advanced Control</h4>
            <p class="text-muted">
              Click <strong>Show Advanced Options</strong> to set a custom 48-bit node (e.g., <code>001122334455</code>) or 14-bit clock sequence. Perfect for testing sharding, reproducing scenarios, or creating deterministic test data.
            </p>
          </div>
        </div>

        <div class="text-center mt-5">
          <p class="fs-5 text-muted">
            <strong>Pro tip:</strong> Paste any existing UUID v1 into the main field — this tool will automatically decode and display its exact creation timestamp.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="faq" class="py-5 mt-5 rounded-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <h2 class="display-5 fw-bold text-center mb-5">Frequently Asked Questions</h2>

        <div class="row g-4">
          <div class="col-lg-11 mx-auto">
            <details class="border rounded-3 p-4 mb-3 bg-white shadow-sm">
              <summary class="h5 fw-semibold cursor-pointer">Are the generated UUIDs truly unique?</summary>
              <p class="mt-3 text-muted">
                Yes — when used correctly. UUID v1 uniqueness relies on a combination of high-resolution timestamp + random node + monotonic clock sequence. This implementation follows RFC 4122 exactly and uses <code>crypto.getRandomValues()</code> for node/clock initialization. Collisions are astronomically unlikely — even at millions per second.
              </p>
            </details>

            <details class="border rounded-3 p-4 mb-3 bg-white shadow-sm">
              <summary class="h5 fw-semibold cursor-pointer">Is my privacy protected?</summary>
              <p class="mt-3 text-muted">
                <strong>100%.</strong> Nothing leaves your browser. We don't use analytics, cookies, fingerprinting, or server logging. The tool is designed from the ground up to be privacy-first. Even the node ID is randomized by default — no MAC address exposure.
              </p>
            </details>

            <details class="border rounded-3 p-4 mb-3 bg-white shadow-sm">
              <summary class="h5 fw-semibold cursor-pointer">Why choose UUID v1 over v4 or v7?</summary>
              <p class="mt-3 text-muted">
                Use v1 when you need <strong>chronological sortability</strong> and <strong>timestamp extraction</strong> (logs, audits, event sourcing). v4 is pure random (best for public tokens). v7 is newer and great — but not universally supported yet. Randomized v1 gives you the best of both worlds today.
              </p>
            </details>

            <details class="border rounded-3 p-4 mb-3 bg-white shadow-sm">
              <summary class="h5 fw-semibold cursor-pointer">Can I use this in production or commercial projects?</summary>
              <p class="mt-3 text-muted">
                Absolutely. The entire project is <strong>MIT licensed under MIT</strong>. Use the website, fork the code, embed the logic — all allowed and encouraged.
              </p>
            </details>

            <details class="border rounded-3 p-4 mb-3 bg-white shadow-sm">
              <summary class="h5 fw-semibold cursor-pointer">Does it work offline?</summary>
              <p class="mt-3 text-muted">
                Yes! After your first visit, the site installs as a PWA and works completely offline. Generate UUIDs on planes, in secure environments, or during internet outages — no problem.
              </p>
            </details>
          </div>
        </div>

        <p class="text-center mt-5 text-muted fs-5">
          Still have questions? Check out our <a href="{base}/blog" class="text-primary">in-depth blog posts</a> or open an issue on GitHub.
        </p>
      </div>
    </div>
  </div>
</section>
        </div>
    </div>
</main>

<style>
    .text-monospace {
        font-family: 'Courier New', Consolas, monospace;
        letter-spacing: 1px;
    }
    .btn-copy {
        min-width: 110px;
    }
</style>