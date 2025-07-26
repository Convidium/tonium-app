<script>
    // @ts-nocheck

    import VinylSvg from "$lib/components/icons/VinylSVG.svelte";
    import {
        isPlaying,
        duration,
        progress,
        playerStore,
    } from "$lib/stores/playerStore";
    import { derived } from "svelte/store";

    let props = $props();

    let sliderRef;
    let localProgress = $state(0);
    let dragging = $state(false);

    let rotationAngle = $state(0);

    $effect(() => {
        if (dragging) {
            const ratio = localProgress / $duration;
            rotationAngle = ratio * 3600;
        }
    });
    
    $effect(() => {
        document.body.style.userSelect = dragging ? "none" : "";
    });

    function getProgressFromEvent(event) {
        const rect = sliderRef.getBoundingClientRect();
        const clientX =
            event instanceof MouseEvent
                ? event.clientX
                : event.touches[0].clientX;
        const offsetX = clientX - rect.left;

        const clampedX = Math.max(0, Math.min(offsetX, rect.width));

        const ratio = clampedX / rect.width;
        return ratio * $duration;
    }

    function handleDown(event) {
        dragging = true;
        const time = getProgressFromEvent(event);
        localProgress = time;

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleUp);
    }

    function handleMove(event) {
        if (!dragging) return;
        localProgress = getProgressFromEvent(event);
        playerStore.seekTo(localProgress);
    }

    function handleUp(event) {
        if (!dragging) return;
        dragging = false;

        playerStore.seekTo(localProgress);

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
                style={`width: ${
                    dragging
                        ? (localProgress / $duration) * 100
                        : ($progress / $duration) * 100
                }%`}
            ></div>
            <div
                class={`thumb ${$isPlaying && !dragging ? "active" : ""}`}
                style={`left: ${
                    dragging
                        ? (localProgress / $duration) * 100
                        : ($progress / $duration) * 100
                }%; transform: rotate(${dragging ? rotationAngle : 0}deg);`}
            >
                <VinylSvg />
            </div>
        </div>
        <input
            type="range"
            min="0"
            max={$duration}
            value={dragging ? localProgress : $progress}
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
                display: flex;
                align-items: center;
                background-color: transparent;
                border: 1px solid transparent;
                box-sizing: border-box;
                border-radius: 0;
                width: -webkit-fill-available;
                height: 10px;
                padding: 0;
                cursor: pointer;

                .thumb {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 14px;
                    height: 14px;
                    margin-left: -5px;
                    border-radius: 50%;
                    animation-play-state: paused;
                    transition: transform 0.1s linear;
                    will-change: transform;
                    &:hover {
                        scale: 1.2;
                    }
                    &.active {
                        animation: rotating 2s linear infinite;
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
    @keyframes rotating {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
