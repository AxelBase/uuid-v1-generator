<script lang="ts">
    import { base } from '$app/paths';
    import { fly } from 'svelte/transition';
    import '../app.css';

    // PayPal Configuration
    const paypalUsername = 'AxelLab427'; // UPDATE THIS LATER
    const donationAmounts = [1, 3, 5, 10];
    let isDropdownOpen = false;

    // --- Dropdown Logic ---
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

    // --- Theme & Service Worker Logic ---
    if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-bs-theme', 'dark'); // Force dark theme for this design

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

            <div class="bmac-nav-item ms-4 d-none d-md-block" use:clickOutside on:click_outside={closeDropdown}>
                <button class="bmac-button" on:click={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
                    </svg>
                    Buy me a coffee
                </button>

                {#if isDropdownOpen}
                    <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
                        {#each donationAmounts as amount}
                            <a 
                                href="https://paypal.me/{paypalUsername}/{amount}" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                on:click={closeDropdown}
                            >
                                ${amount}
                            </a>
                        {/each}
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
        <span>&copy; AxelBase UUID v1 (Timestamp) Generator – {new Date().getFullYear()}</span>
        <span class="mx-2">•</span>
        <a href="{base}/privacy" class="footer-link">Privacy</a>
        <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
</footer>