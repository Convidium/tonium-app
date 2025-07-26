<script>
    import TurntableSvg from "$lib/components/icons/TurntableSVG.svelte";
    import { fade } from "svelte/transition";
    import { isFullPlayerVisible } from "$lib/stores/playerStore";

    function toggleFullPlayer() {
        isFullPlayerVisible.update((v) => !v);
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class={`btn-mini-wrapper bigger-width btn-design-simple ${$isFullPlayerVisible ? "active" : ""}`}
    onclick={toggleFullPlayer}
>
    <div class="bg">
        <TurntableSvg />
        {#if $isFullPlayerVisible}
            <div class="dot" transition:fade={{ duration: 100 }}></div>
        {/if}
    </div>
</div>

<style lang="scss">
</style>
