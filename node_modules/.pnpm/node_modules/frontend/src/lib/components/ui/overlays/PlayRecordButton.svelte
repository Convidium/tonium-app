<script>
    import PlaySVG from "../../icons/PlaySVG.svelte";
    let props = $props();
    const position = props.position;
</script>

<div class={`nav-btn ${position === "center" ? "center" : ""}`}>
    <button class="play-pause-button"><PlaySVG /></button>
</div>

<style lang="scss">
    .nav-btn {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        position: relative;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        padding: 5%;
        opacity: 0;

        &.center{
            justify-content: center;
            align-items: center;
        }

        &:hover {
            opacity: 1;
        }

        .play-pause-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            padding: 0;
            margin: 0;
            background-color: var(--accent-bg-t-9);
            // border: 1px solid hsla(0, 25%, 45%, 90%);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            opacity: 0.5;
            &:hover {
                opacity: 1;
                scale: 1.1;
            }

            &:active {
                scale: 0.95;
            }

            @media (max-width: calc(555px + 4rem)) {
                width: 35px !important;
                height: 35px !important;
                border-radius: 10px;
            }
        }

        @media (max-width: calc(555px + 4rem)) {
            justify-content: center;
            align-items: center;
            padding: 0;
        }
    }
</style>
