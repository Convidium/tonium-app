<script>
	import RecordCardList from "$lib/components/ui/composites/RecordCardList.svelte";
	import RandomRecordBlock from "../composites/RandomRecordBlock.svelte";
	import { albumData } from "$lib/test-data/album-preview-data";
</script>

<div class="lists-block">
	<RandomRecordBlock/>
	<RecordCardList cards={albumData} />
</div>


<style>
	.lists-block{
		width: calc(100% - 2rem);
		display: flex;
		flex-direction: column;
		gap: 25px;
		margin-top: 25px;
		margin: 0 1rem;
	}
</style>