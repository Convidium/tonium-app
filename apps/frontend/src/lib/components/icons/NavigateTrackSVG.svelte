<script>
    import { onMount } from "svelte";

    let props = $props();
    let rotate = $state(0);
    onMount(() => {
        if (props.flip === true) {
            rotate = 180;
        }
    });
</script>

<svg
    style={`transform: rotate(${rotate}deg);`}
    viewBox="0 0 16 16"
    ><path
        d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"
    ></path></svg
>

<style lang="scss">
    svg {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: none !important;
        fill: var(--text);
        width: 70%;
    }
</style>
