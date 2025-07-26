<script>
    import RadioSvg from "$lib/components/icons/RadioSVG.svelte";
    import { fade } from "svelte/transition";
    let isRadioOn = false;

    const toggleRadio = () => {
        isRadioOn = !isRadioOn;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={`radio-block btn-mini-wrapper btn-design-simple ${isRadioOn ? "active" : ""}`} onclick={toggleRadio}>
    <div class="bg">
        <RadioSvg />
        {#if isRadioOn}
            <div class="dot" transition:fade={{ duration: 100 }}></div>
        {/if}
    </div>
</div>

<style lang="scss">
</style>
