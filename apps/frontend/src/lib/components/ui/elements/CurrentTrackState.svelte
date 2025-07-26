<script>
    // @ts-nocheck

    import MarqueeText from "../text/MarqueeText.svelte";
    import {
        playerStore,
        currentTimestamp,
        currentTrack,
        trackDuration,
        duration,
        progress,
        isPlaying,
    } from "$lib/stores/playerStore";
    import { onMount } from "svelte";
    import TrackSlider from "../sliders/TrackSlider.svelte";
</script>

<div class="track-state track-state-design">
    <div class="top">
        <div class="title">
            <MarqueeText
                text={!!$currentTrack ? $currentTrack.track_name : ""}
                fadeColorVar="--bg-2"
                glance={$isPlaying}
            />
        </div>
        <div class="time-info">
            <div class="current-timestamp time">{$currentTimestamp}</div>
            <div class="splitting-dot"></div>
            <div class="song-duration time">{$trackDuration}</div>
        </div>
    </div>
    <div class="bottom slider">
        <TrackSlider />
    </div>
</div>

<style lang="scss">
    .track-state {
        min-width: 95%;
        display: flex;
        flex-direction: column;
        justify-self: center;
        justify-content: center;
        gap: 5px;
        font-size: var(--font-S);
        max-width: 100%;
        .top {
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: space-between;
            font-family: "Grotezk Mittel";
            width: inherit;

            .title {
                width: 80%;
                border-radius: 3px;
                box-sizing: border-box;
                color: var(--text);
                padding: 2px 0px;
                max-width: 300px;
            }

            .time-info{
                display: flex;
                align-items: center;
                gap: 5px;

                .time{
                    width: 24px;
                }
            }

            .splitting-dot{
                width: 1px;
                height: 10px;
                border-radius: 5px;
                background-color: var(--text-muted);
                rotate: 20deg;
            }

            .song-duration {
                color: var(--text-muted);
                &:hover{
                    color: var(--text);
                }
            }

            .current-timestamp {
                color: var(--text);
                text-align: right;
            }
        }

        .slider {
            display: flex;
            align-items: center;
            width: 100%;
            color: var(--text-muted);
        }
    }

    @media (max-width: 768px) {
        .track-state {
            display: none;
        }
    }
</style>
