<script>
    import NavigateTrackSvg from "$lib/components/icons/NavigateTrackSVG.svelte";
    import PauseSvg from "$lib/components/icons/PauseSVG.svelte";
    import PlaySvg from "$lib/components/icons/PlaySVG.svelte";
    import { playerStore, isPlaying } from "$lib/stores/playerStore";
    
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="track-nav">
    <div class="prev" onclick={playerStore.playPrevious}>
        <div class="bg">
            <NavigateTrackSvg />
        </div>
    </div>
    <div
        class="play-state btn-wrapper btn-design"
        onclick={playerStore.togglePlay}
    >
        <div class="bg">
            {#if $isPlaying}
                <PauseSvg />
            {:else}
                <PlaySvg />
            {/if}
        </div>
    </div>
    <div class="next" onclick={playerStore.playNext}>
        <div class="bg">
            <NavigateTrackSvg flip={true} />
        </div>
    </div>
</div>

<style lang="scss">
    .track-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;

        .prev,
        .next {
            height: inherit;
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.5;
            cursor: pointer;

            .bg {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
            }
            &:hover {
                opacity: 1;
            }
            &:active {
                scale: 0.9;
            }
        }

        .play-state {
            border-radius: 6px;
            cursor: auto;
            .bg {
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 1275px) {
        .track-nav {
            position: relative;
            justify-content: center;
            left: auto;
            transform: none;
            max-width: 100%;
            padding: 0 0.5rem;
        }
    }

    @media (max-width: 1000px) {
        .track-nav {
            padding: 0 0.25rem;
        }
    }
</style>
