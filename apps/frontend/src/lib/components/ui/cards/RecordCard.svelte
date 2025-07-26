<script>
    import EllipsisButton from "$lib/components/ui/navigation/EllipsisButton.svelte";
    import PlayCardButton from "$lib/components/ui/overlays/PlayCardButton.svelte";
    // @ts-ignore
    import { normalizeCard } from "$lib/serializers/normalizeCard.ts";

    let props = $props();
    let card = props.card;
    let cardData = $derived(normalizeCard(card));
</script>

<div class="card-wrapper card-design">
    <div class="card-block">
        <div class="image-block">
            <img src={cardData.front_cover_path} alt="Record Cover" />
            <PlayCardButton />
        </div>
        <div class="info-block">
            <div class="record-credentials">
                <div class="title-name truncated-text">{cardData.name}</div>
                <div class="artist-name truncated-text">{cardData.artist}</div>
            </div>
            <div class="record-type">{cardData.record_type}</div>
        </div>
    </div>
    <EllipsisButton />
</div>

<style lang="scss">
    .card-wrapper {
        min-width: var(--card-min-width);
        width: var(--card-default-width);
        max-width: var(--card-max-width);
        // aspect-ratio: 1 / 1.25;
        border-radius: 9px;
        position: relative;
        cursor: pointer;
        .card-block {
            width: inherit;
            max-width: var(--card-max-width);
            min-width: var(--card-min-width);
            padding: 10px;
            border: none;
            border-radius: 7px;
            height: calc(100% - 24px);

            .image-block {
                width: 100%;
                aspect-ratio: 1;
                overflow: hidden;
                position: relative;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: -webkit-fill-available;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }

            .info-block {
                position: relative;
                z-index: 2;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
                .record-credentials {
                    max-width: 100%;
                    .title-name {
                        font-family: "Grotezk Fett";
                        color: var(--text);
                        font-size: var(--font-S);

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                    .artist-name {
                        font-family: "Roboto Medium";
                        color: var(--text-muted);
                        font-size: var(--font-XS);

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                .record-type {
                    font-family: "Roboto Medium";
                    color: var(--text-muted);
                    font-size: var(--font-XXS);
                    cursor: default;
                }
            }

            @media (max-width: calc(555px + 4rem)) {
                width: -webkit-fill-available;
                max-width: auto;
                min-width: auto;
            }

            @media (max-width: 500px) {
                .info-block {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                    margin-top: 5px;

                    .record-type {
                        display: none;
                    }
                }
            }
        }

        &::-webkit-scrollbar {
            margin: 10px;
        }
    }
</style>
