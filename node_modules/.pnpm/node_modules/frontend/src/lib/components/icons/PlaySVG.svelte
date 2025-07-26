<script>
    import { onMount } from "svelte";

    let props = $props();
    let fillColor = $state("var(--text)");

    onMount(() => {
        console.log(props.isAccentColor);

        if (props.isAccentColor) {
            fillColor = "var(--accent-text)";
        }
    });
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6"
    >
        <animate
            fill="freeze"
            attributeName="d"
            dur="0.05s"
            values="
        M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6;
        M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9;
        M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15
      "
        ></animate>
    </path>
</svg>

<style lang="scss">
    svg {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px !important;
    }
</style>
