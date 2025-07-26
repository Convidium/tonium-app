<script lang="ts">
    import "../lib/themes/theme.scss";
    import "../lib/themes/designs/index.scss";
    import { onMount } from "svelte";
    import { theme, design } from "$lib/stores/themeStore";
    import PlayerPanel from "$lib/components/ui/composites/PlayerPanel.svelte";
    import { isFullPlayerVisible } from "$lib/stores/playerStore";
    import FullPlayer from "$lib/components/ui/compositePages/FullPlayer.svelte";

    onMount(() => {
        const classValue: any = [];
        theme.subscribe((value) => {
            classValue.push(value);
        });
        design.subscribe((value) => {
            classValue.push(value);
        });
        document.documentElement.className = classValue.join(" ");
    });
</script>

<slot />
<PlayerPanel/>
{#if $isFullPlayerVisible}
    <FullPlayer />
{/if}