<script>
    import IconMoreSVG from "../../icons/IconMoreSVG.svelte";
</script>

<div class="elipsis-btn elipsis-design">
    <button class="button flex-center"><IconMoreSVG /></button>
</div>

<style lang="scss">
    .elipsis-btn {
        opacity: 0;
        position: absolute;
        z-index: 3;
        top: 0.5rem;
        right: 0.5rem;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        box-sizing: content-box;

        &:hover {
            opacity: 1;
            scale: 1.2;
        }

        &:active {
            scale: 1.1;
        }

        .button {
            width: 20px;
            aspect-ratio: 1;
            margin: 0;
            padding: 5px;
            border-radius: 20px;
            cursor: pointer;
        }
    }
</style>
