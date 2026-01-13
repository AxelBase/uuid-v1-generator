<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import '../app.css';

  const currentYear = new Date().getFullYear();

  // PayPal & BuyMeACoffee
  const paypalUsername = 'AxelLab427'; // ← update if needed
  const bmacUsername = 'axelbase';

  let isDropdownOpen = false;

  function toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  // Click outside directive
  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };

    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  // Force dark theme + service worker
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');

    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${base}/service-worker.js`);
      });
    }
  }
</script>

<header class="custom-navbar">
  <nav class="container d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" aria-label="Home" class="d-flex align-items-center text-decoration-none">
        <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-brand-logo" />
      </a>
      <a class="navbar-brand-text" href="{base}/">AxelBase</a>

      <!-- Buy me a Coffee + Bitcoin dropdown -->
      <div class="bmac-nav-item ms-4 d-none d-md-block" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="bmac-button d-flex align-items-center gap-2"
          on:click={toggleDropdown}
          aria-label="Support AxelBase"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span>Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$3</span> One Coffee
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$5</span> Two Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Bitcoin
            </a>
          </div>
        {/if}
      </div>
    </div>

    <ul class="d-flex align-items-center gap-4 list-unstyled m-0">
      <li><a class="nav-link" href="{base}/">Home</a></li>
      <li><a class="nav-link" href="{base}/#about">About</a></li>
      <li><a class="nav-link" href="{base}/#how-to">How to use</a></li>
      <li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
      <li><a class="nav-link" href="{base}/blog">Blog</a></li>
    </ul>
  </nav>
</header>

<slot />

<footer class="custom-footer">
  <div class="container text-center">
    <span>© AxelBase UUID v1 (Timestamp) Generator – {currentYear}</span>
    <span class="mx-2">•</span>
    <a href="{base}/privacy" class="footer-link">Privacy</a>
    <a href="{base}/terms" class="footer-link">Terms</a>
  </div>
</footer>

<style>
  /* ── Buy me a Coffee overrides / adaptations for dark theme ── */

  .bmac-button {
    background-color: var(--sulfur);
    color: #000;
    border: none;
    padding: 9px 22px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(237, 255, 33, 0.3);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .bmac-button:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 8px 25px rgba(237, 255, 33, 0.55);
  }

  .bmac-dropdown {
    position: absolute;
    top: 130%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    background: var(--card-bg);
    border: 1px solid var(--sulfur);
    border-radius: var(--radius-smooth);
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    z-index: 1001;
  }

  .bmac-dropdown::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: var(--card-bg);
    border-left: 1px solid var(--sulfur);
    border-top: 1px solid var(--sulfur);
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--text-main);
    text-decoration: none;
    font-size: 0.97rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(237, 255, 33, 0.12);
    color: var(--sulfur);
  }

  .bmac-dropdown .amount {
    font-weight: 800;
    color: var(--sulfur);
    font-size: 1.15rem;
    min-width: 48px;
    text-align: right;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 700;
    color: var(--sulfur);
    justify-content: center !important;
    border-top: 1px solid rgba(237, 255, 33, 0.15);
    padding: 14px;
    font-size: 1rem;
  }

  .bitcoin-option:hover {
    background: rgba(247, 147, 26, 0.12) !important;
  }
</style>