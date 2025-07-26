<script>
    // @ts-nocheck
    import { albumData } from "$lib/test-data/album-data";
    import PlayRecordButton from "../overlays/PlayRecordButton.svelte";

    const record = albumData[0];
    let isPlaying = $state(0);
</script>

<div
    class="random-record-block"
    style={`background-image: url(${record.front_cover_path});`}
>
    <!-- <div class="cover-block">
        <div class="front-cover">
            <img class="record-cover" src={record.front_cover_path} alt="" />
            <PlayRecordButton position="center" />
        </div>
        <div class="image-block">
            <img class="record-cover" src="/assets/vinyl_low_res.png" alt="" />
        </div>
    </div> -->
</div>

<style lang="scss">
    .random-record-block {
        width: -webkit-fill-available;
        height: calc(200px + 2rem);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        margin: 1rem 10px;
        border: 1px solid var(--bg-4);
        box-sizing: border-box;
        border-radius: 5px;
        padding: 1rem;
        filter: brightness(50%);
    }
</style>
