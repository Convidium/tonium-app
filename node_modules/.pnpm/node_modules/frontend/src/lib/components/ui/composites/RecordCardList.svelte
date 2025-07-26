<script>
	// @ts-nocheck
	import { onMount, tick } from "svelte";
	import PointerArrowSvg from "$lib/components/icons/PointerArrowSVG.svelte";
	import AlbumCard from "$lib/components/ui/cards/RecordCard.svelte";
	let props = $props();

	let container;

	let allCards = [];
	let visibleCards = $state([]);

	const CARD_WIDTH = 140;
	const GAP = 10;

	const BATCH_SIZE = 10;

	async function updateVisibleAlbums() {
		if (!container) return;
		const containerWidth = container.clientWidth;

		if (document.body.clientWidth < 555 + 16 * 4) {
			visibleCards = allCards.slice(0, 10);
			return;
		}

		const totalCardSpace = CARD_WIDTH + GAP;
		const maxCards = Math.floor(containerWidth / totalCardSpace);

		// Check if:
		// 1) the container can concist more albums than what is already displayed
		// 2) we have enough fetched cards available
		const isLessCardsThanNeeded = visibleCards.length < maxCards;
		const isEnoughCards = visibleCards.length < allCards.length;

		const minCardSpace =
			visibleCards.length * CARD_WIDTH + (visibleCards.length - 1) * GAP;

		if (isLessCardsThanNeeded && isEnoughCards) {
			const need = maxCards - visibleCards.length;
			const toAdd = allCards.slice(
				visibleCards.length,
				visibleCards.length + Math.max(need, BATCH_SIZE),
			);
			visibleCards = [...visibleCards, ...toAdd];
		} else if (visibleCards.length > maxCards) {
			visibleCards = visibleCards.slice(0, maxCards);
		}

		if (minCardSpace < containerWidth) {
			document.body.style.setProperty("--card-default-width", `auto`);
		} else {
			document.body.style.setProperty("--card-default-width", `140px`);
		}
	}
	onMount(() => {
		// It's used as an example
		allCards = props.cards;
		updateVisibleAlbums();

		const resizeObserver = new ResizeObserver(updateVisibleAlbums);
		resizeObserver.observe(container);

		return () => resizeObserver.disconnect();
	});
</script>

<div class="records-section">
	<div class="records-nav">
		<span class="title">Browse your Albums:</span>
		<a class="more-link" href="/home">
			<span>More</span>
			<PointerArrowSvg width={"20px"} />
		</a>
	</div>
	<div class="records-list" bind:this={container}>
		{#each visibleCards as card}
			<AlbumCard {card}/>
		{/each}
	</div>
</div>

<style lang="scss">
	.records-section {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: -webkit-fill-available;
		.records-nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				font-family: "Grotezk Mittel";
				color: var(--text);
				font-size: var(--font-L);
				margin-left: 10px;
			}
			.more-link {
				display: flex;
				align-items: center;
				font-family: "Grotezk Mittel";
				color: var(--text-muted);
				text-decoration: none;
				margin-right: 10px;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		.records-list {
			display: flex;
			gap: var(--card-gap);
			overflow: hidden;
			justify-content: space-between;

			@media (max-width: calc(555px + 4rem)) {
				overflow-x: auto;
				scroll-snap-type: x mandatory;
				-webkit-overflow-scrolling: touch;
				padding-bottom: 5px;
				--card-gap: 5px;
			}
		}

		@media (max-width: calc(555px + 4rem)) {
			margin: 0 0.5rem;
		}
	}
</style>
