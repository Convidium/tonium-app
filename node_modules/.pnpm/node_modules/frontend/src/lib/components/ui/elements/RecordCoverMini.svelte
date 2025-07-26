<script>
    import { onMount } from "svelte";

    let props = $props();

    const frontCoverPath = props.frontCoverPath;
    const backCoverPath = props.backCoverPath;
    const recordLink = props.link;

    const defaultCoverPath = "/assets/vinyl_low_res.png";
    let currentCoverPath = $state(defaultCoverPath);

    onMount(() => {
        if (!frontCoverPath || frontCoverPath !== "") {
            currentCoverPath = frontCoverPath;
        } else if (
            (!!frontCoverPath || frontCoverPath === "") &&
            (!backCoverPath || backCoverPath !== "")
        ) {
            currentCoverPath = backCoverPath;
        }
    });
</script>

<div class="record-img">
    <a href={recordLink}>
        <img src={currentCoverPath} alt="" />
    </a>
</div>

<style lang="scss">
    .record-img {
        height: 40px;
        aspect-ratio: 1;
        a {
            display: flex;
            height: inherit;
            img {
                border-radius: 3px;
                height: inherit;
            }
        }
    }
</style>
