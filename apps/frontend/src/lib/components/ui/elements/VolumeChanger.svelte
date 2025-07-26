<script>
    import VolumeFullSvg from "$lib/components/icons/VolumeFullSVG.svelte";
    import VolumeSlider from "../sliders/VolumeSlider.svelte";
    import { volume, playerStore } from "$lib/stores/playerStore";
</script>

<div class="volume-block volume-design">
    <div class="bg">
        <button class="volume-icon-btn" onclick={() => playerStore.muteToggle()}>
            <VolumeFullSvg />
        </button>
        <div class="volume-slider">
            <VolumeSlider />
        </div>
    </div>
</div>

<style lang="scss">
    .volume-block {
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        border: 1px solid transparent;
        background-color: transparent;
        border-radius: 10px;

        .bg {
            height: -webkit-fill-available;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            // padding: 0.5rem;

            border-radius: 10px;
        }
    }

    .volume-slider {
        width: 100px;
    }
    .volume-icon-btn {
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;
        aspect-ratio: 1;
        cursor: pointer;
    }

    @media (max-width: 820px) {
        .volume-slider {
            display: none;
        }
    }
</style>
