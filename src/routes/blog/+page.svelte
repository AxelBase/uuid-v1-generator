<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'What is a UUID v1? The Complete Guide',
      description: 'Discover how time-based UUIDs work, why they include your MAC address and exact timestamp, and when to use them, and when to avoid them.'
    },
    {
      href: '/blog/posts/post2',
      title: 'How UUID v1 Encodes the Exact Timestamp',
      description: 'Deep dive into the Gregorian epoch, 100ns intervals, and how a UUID v1 reveals the precise moment it was created — down to 100-nanosecond precision.'
    },
    {
      href: '/blog/posts/post3',
      title: 'Generating RFC 4122 Compliant UUID v1 in the Browser',
      description: 'Learn how this tool creates fully compliant Version 1 UUIDs using only client-side JavaScript — no backend required.'
    },
    {
      href: '/blog/posts/post4',
      title: 'UUID v1 vs v4 vs v7: Which One Should You Use?',
      description: 'A practical comparison of timestamp-based (v1), random (v4), and Unix-time ordered (v7) UUIDs — with real use-case recommendations.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Extracting Creation Time from Any UUID v1',
      description: 'See how this generator instantly decodes the embedded timestamp and shows you both human-readable UTC time and Unix milliseconds.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Custom Node & Clock Sequence: Full Control Over UUID v1',
      description: 'Understand the 48-bit node and 14-bit clock sequence fields — and how to override them for testing, debugging, or deterministic IDs.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Why UUID v1 Is Still Relevant in 2025',
      description: 'Despite privacy concerns, UUID v1 remains powerful for distributed systems, database keys, audit logs, and chronological sorting.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | UUID v1 Generator – AxelBase</title>
  <meta name="description" content="In-depth articles about UUID version 1: how timestamp-based UUIDs work, their advantages, privacy considerations, and real-world applications." />
</svelte:head>

<div class="container fade-in blog-index py-5">
  <header class="blog-header text-center mb-5">
    <h1 class="display-4 fw-bold">UUID v1 Insights</h1>
    <p class="subtitle lead col-lg-8 mx-auto text-muted">
      Deep dives, technical explanations, and best practices for time-based UUIDs (RFC 4122 Version 1).<br>
      Everything you need to know about generating, decoding, and using timestamp-ordered unique identifiers.
    </p>
  </header>

  <div class="posts-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {#each posts as post}
      <a href="{base}{post.href}" class="col text-decoration-none">
        <div class="card h-100 shadow-sm border-0 post-card transition-all">
          <div class="card-body d-flex flex-column">
            <h2 class="h5 fw-bold text-primary mb-2">{post.title}</h2>
            <p class="text-muted small flex-grow-1">{post.description}</p>
            <span class="text-primary fw-semibold mt-2 read-more">
              Read Article →
            </span>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="text-center mt-5 text-muted small">
    Built with love using SvelteKit • 100% static • Works offline
  </div>
</div>

<style>
  .post-card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
  }
  .read-more {
    opacity: 0.9;
  }
  .post-card:hover .read-more {
    opacity: 1;
    transform: translateX(6px);
    transition: transform 0.3s ease;
  }
</style>