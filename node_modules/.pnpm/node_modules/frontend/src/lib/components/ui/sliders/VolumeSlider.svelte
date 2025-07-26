<script>
    // @ts-nocheck
    import { volume, playerStore } from "$lib/stores/playerStore";

    let sliderRef;
    let localVolume = $state(1);
    let dragging = $state(false);

    $effect(() => {
        if (!dragging) {
            localVolume = $volume;
        }
    });

    $effect(() => {
        document.body.style.userSelect = dragging ? "none" : "";
    });

    function getVolumeFromEvent(event) {
        const rect = sliderRef.getBoundingClientRect();
        const clientX =
            event instanceof MouseEvent
                ? event.clientX
                : event.touches[0].clientX;
        const offsetX = clientX - rect.left;
        const clampedX = Math.max(0, Math.min(offsetX, rect.width));
        const ratio = clampedX / rect.width;
        return Math.max(0, Math.min(1, ratio));
    }

    function handleDown(event) {
        dragging = true;
        localVolume = getVolumeFromEvent(event);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleUp);
    }

    function handleMove(event) {
        if (!dragging) return;
        localVolume = getVolumeFromEvent(event);
        playerStore.setVolume(localVolume);
    }

    function handleUp(event) {
        if (!dragging) return;
        dragging = false;
        localVolume = getVolumeFromEvent(event);
        playerStore.setVolume(localVolume);

        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={`slider-wrapper slider-design ${dragging ? "dragging" : ""}`}>
    <div class="bg">
        <div
            class="slider"
            bind:this={sliderRef}
            onmousedown={handleDown}
            ontouchstart={handleDown}
        >
            <div
                class="progress"
                style={`width: ${(dragging ? localVolume : $volume) * 100}%`}
            ></div>
            <div
                class={`thumb ${dragging ? "dragging" : ""}`}
                style={`left: ${(dragging ? localVolume : $volume) * 100}%;`}
            >
                <div class="dot"></div>
            </div>
        </div>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={dragging ? localVolume : $volume}
        />
    </div>
</div>

<style lang="scss">
    .slider-wrapper {
        width: inherit;
        &.dragging {
            cursor: grabbing;
        }
        .bg {
            .slider {
                position: relative;
                display: flex;
                align-items: center;
                background-color: transparent;
                border: 1px solid transparent;
                box-sizing: border-box;
                border-radius: 0;
                width: 100%;
                height: 10px;
                padding: 0;
                cursor: pointer;

                .progress {
                    max-width: 100%;
                }

                .thumb {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: calc(100% + 2px);
                    aspect-ratio: 1;
                    margin-left: -8px;
                    border-radius: 50%;
                    animation-play-state: paused;

                    &.dragging {
                        .dot {
                            display: block;
                        }
                    }

                    .dot {
                        height: calc(100%);
                        aspect-ratio: 1;
                        aspect-ratio: 1;
                        box-sizing: border-box;

                        border: 1px solid var(--text);
                        background-color: var(--text);
                        border-radius: 50%;
                        display: none;
                    }
                }

                &:hover {
                    .thumb {
                        scale: 1.2;
                        .dot {
                            display: block;
                        }
                    }
                }
            }
            width: inherit;
            input {
                display: none;
                width: inherit;
            }
        }
    }
</style>
