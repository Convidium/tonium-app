<script>
    import { onMount } from "svelte";
    import { playerStore } from "$lib/stores/playerStore";
    import { design } from "$lib/stores/themeStore";

    import MarqueText from "$lib/components/ui/text/MarqueeText.svelte";
    import RecordCoverMini from "$lib/components/ui/elements/RecordCoverMini.svelte";
    import { albumData } from "$lib/test-data/album-data";

    import MarqueeText from "$lib/components/ui/text/MarqueeText.svelte";
    import TrackNavigation from "$lib/components/ui/elements/TrackNavigation.svelte";
    import VolumeChanger from "$lib/components/ui/elements/VolumeChanger.svelte";
    import RadioButton from "$lib/components/ui/elements/RadioButton.svelte";
    import ToggleViewButton from "$lib/components/ui/elements/ToggleViewButton.svelte";
    import CurrentTrackState from "$lib/components/ui/elements/CurrentTrackState.svelte";
    import SaveRecordButton from "../elements/SaveRecordButton.svelte";

    const record = albumData[0];
    let isSaved = $state(false);

    const toggleSave = () => {
        isSaved = !isSaved;
    }

    onMount(() => {
        playerStore.loadAlbum(record);
    });
</script>

<div class="control-panel-wrapper control-panel-design">
    <div class="block">
        <div class="record-state">
            <RecordCoverMini
                frontCoverPath={record.front_cover_path}
                backCoverPath={record.back_cover_path}
                link={`/records/${record.id}`}
            />
            <div class="record-names">
                <span class="title">
                    <MarqueText
                        text="Sgt. Pepper's Lonely Hearts Club Band"
                        isLink={true}
                        href="https://www.thebeatles.com"
                        fadeColorVar={$design == "flat" ? "--bg-2" : "--bg-1"}
                    />
                </span>
                <span class="artist">
                    <MarqueeText
                        text="The Beatles"
                        isLink={true}
                        href="/artists/13/"
                    />
                </span>
            </div>
            <SaveRecordButton isSaved={isSaved} toggleSave={toggleSave} />
        </div>
        <CurrentTrackState />
        <TrackNavigation />
        <div class="features">
            <VolumeChanger />
            <RadioButton />
            <ToggleViewButton />
        </div>
    </div>
</div>

<style lang="scss">
    .control-panel-wrapper {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        bottom: 0;
        width: -webkit-fill-available;
        box-sizing: border-box;
        z-index: 10;
        height: 60px;
        .block {
            display: grid;
            grid-template-columns: 2fr 3fr 10% 5fr;
            align-items: center;
            justify-content: space-between;
            width: inherit;
            height: 40px;

            .record-state {
                display: flex;
                align-items: center;
                flex-shrink: 1;
                overflow: hidden;
                gap: 0.5rem;
                height: 40px;
                margin-right: 1rem;
                font-family: "Grotezk Mittel";

                .record-names {
                    min-width: 0;
                    flex: 1 0 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 220px;
                    height: inherit;
                    gap: 2px;
                    .title {
                        font-family: "Grotezk Fett";
                        font-size: var(--font-S);
                    }

                    .artist {
                        font-size: var(--font-XS);
                        color: var(--text-muted);
                    }
                }
            }

            .features {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 1rem;
                height: 40px;
                flex-shrink: 1;
                overflow: hidden;
            }
        }

        @media (max-width: 1275px) {
            .block {
                grid-template-columns: 20% auto auto auto;
            }
        }

        @media (max-width: 768px) {
            .block {
                grid-template-columns: auto auto auto;
            }
        }

        @media (max-width: 619px) {
            .block {
                .record-state {
                    .record-names {
                        .title {
                            font-size: var(--font-M);
                        }
                        .artist {
                            font-size: var(--font-S);
                        }
                    }
                }
            }
        }

        @media (max-width: 500px) {
            .block {
                grid-template-columns: auto auto;
                .features {
                    display: none;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
