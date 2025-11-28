<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>404 – Page Not Found | UUID v1 Generator</title>
  <meta name="description" content="Oops! The page you're looking for doesn't exist. Return home to generate timestamp-based UUIDs instantly." />
  <meta property="og:title" content="404 – Page Not Found" />
  <meta property="og:description" content="This UUID isn't valid either. Let's go back and generate a real one!" />
  <meta property="og:url" content="{base}{$page.url.pathname}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="container py-5 text-center">
  <div class="row justify-content-center">
    <div class="col-lg-7">

      <h1 class="display-1 fw-bold text-primary mb-4">404</h1>
      <h2 class="display-5 mb-4">This UUID is invalid</h2>

      <p class="lead text-muted mb-5">
        The page you’re looking for doesn’t exist — kind of like a UUID with the wrong version bits.
        <br><strong>Don’t worry though — real UUID v1 generation is just one click away.</strong>
      </p>

      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
        <a href="{base}/" class="btn btn-primary btn-lg px-5">
          Generate UUID v1
        </a>
        <a href="{base}/blog" class="btn btn-outline-secondary btn-lg px-5">
          Read the Blog
        </a>
      </div>

      <div class="helpful-links mt-5">
        <h5 class="text-muted mb-3">Or go somewhere useful:</h5>
        <div class="d-flex flex-wrap justify-content-center gap-4 text-muted">
          <a href="{base}/">Home</a>
          <a href="{base}/blog">Blog</a>
          <a href="{base}/privacy">Privacy Policy</a>
          <a href="{base}/terms">Terms</a>
        </div>
      </div>

      <p class="italic-note mt-5 text-muted">
        <em>Fun fact: A real UUID v1 always has a '1' in the 13th position.<br>
        This page has a '4'. Coincidence? Absolutely.</em>
      </p>

    </div>
  </div>
</div>

<style>
  .helpful-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
  }
  .helpful-links a:hover {
    color: var(--accent-primary);
    text-decoration: underline;
  }
  .italic-note {
    font-size: 1rem;
    line-height: 1.6;
  }
</style>