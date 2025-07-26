<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  export let text;
  export let isLink = false;
  export let href = "";
  export let fadeColorVar = "--bg-1";
  export let glance = false;

  let container;
  let content;
  let animating = false;
  let overflowed = false;

  function checkOverflow() {
    if (container && content) {
      overflowed = content.scrollWidth > container.offsetWidth;
    }
  }

  async function handleMouseEnter() {
    if (!overflowed || animating) return;
    animating = true;

    const containerWidth = container.offsetWidth;
    const contentWidth = content.scrollWidth;

    // scroll to end
    content.style.transition = "transform 4s linear";
    content.style.transform = `translateX(-${contentWidth - containerWidth}px)`;

    await wait(4000); // scroll duration
    await wait(3000); // pause at the end

    // scroll back
    content.style.transform = `translateX(0)`;

    await wait(3000);
    animating = false;
  }

  function handleMouseLeave() {
    if (content) {
      content.style.transition = "none";
      content.style.transform = "translateX(0)";
      animating = false;
    }
  }

  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  onMount(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="marquee-container"
  bind:this={container}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {#if isLink}
    <a class="marquee-content" bind:this={content} {href}>
      {text}
    </a>
  {:else}
    <span class="marquee-content {glance ? 'glance' : ''}" bind:this={content}>
      {text}
    </span>
  {/if}

  {#if overflowed}
    <div
      class="fade-right"
      style="background: linear-gradient(to left, var({fadeColorVar}), transparent);"
    ></div>
  {/if}
</div>

<style lang="scss">
  .marquee-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .marquee-content {
    white-space: nowrap;
    display: inline-block;
    transition: transform 0.3s ease;
    will-change: transform;
    font-family: "Grotezk Mittel";
  }

  .fade-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(to left, var(--bg-1), transparent);
  }

  a.marquee-content {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @keyframes glance {
    0% {
      background-position: -300% 0;
      opacity: 0.95;
    }
    100% {
      background-position: -300% 0;
      opacity: 0.95;
    }
    50% {
      background-position: 300% 0;
      opacity: 1;
    }
  }

  .glance {
    background: linear-gradient(
      120deg,
      hsla(var(--text-h), var(--text-s), var(--text-l), 0.63) 0%,
      hsla(var(--text-h), var(--text-s), var(--text-l), 0.9) 50%,
      hsla(var(--text-h), var(--text-s), var(--text-l), 0.63) 100%
    );
    background-size: 400% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: glance 10s linear infinite;

    &:hover {
      animation: none;
      background: none;
      -webkit-text-fill-color: var(--text-muted);
    }
  }
</style>
