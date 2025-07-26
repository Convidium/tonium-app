<script>
    import { fade, fly } from "svelte/transition";
    import { tick } from "svelte";
    import { onMount } from "svelte";
    import { isFullPlayerVisible } from "$lib/stores/playerStore";
    import { getVisuals } from "$lib/stores/playerStore";

    const defaultCoverPath = "/assets/vinyl_low_res.png";
    let bgPath = "";
    onMount(() => {
        if (!!$getVisuals.front_cover) {
            bgPath = $getVisuals.front_cover;
        } else if (!!$getVisuals.back_cover) {
            bgPath = $getVisuals.back_cover;
        }
    });

    let showContent = false;

    onMount(async () => {
        await tick();
        await new Promise((r) => setTimeout(r, 300));
        showContent = true;
    });

    async function closeFullPlayer() {
        showContent = false;
        await tick();
        await new Promise((r) => setTimeout(r, 300));
        isFullPlayerVisible.set(false);
    }
</script>

<div class="overlay" transition:fly={{ y: 50, duration: 300 }}>
    <div class="top-bar">
        <button on:click={closeFullPlayer}>Закрити</button>
    </div>

    {#if showContent}
        <div class="content" transition:fade={{ duration: 300 }}>
            <h1>Назва треку</h1>
            <p>Виконавець</p>
            <div class="record-view">
                <img class="record-cover" src={bgPath} alt="" />
                <img class="record-vinyl" src={defaultCoverPath} alt="" />
            </div>
        </div>
    {/if}
    <div
        class="background-overlay"
        style={`background-image: url(${bgPath});`}
    ></div>
</div>

<style lang="scss">
    .overlay {
        position: fixed;
        inset: 0;
        z-index: 8;
        display: flex;
        background-color: var(--accent-bg-starker);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 55px;
        overflow-y: auto;
    }

    .top-bar {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        z-index: 9;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 9;

        .record-view {
            display: flex;
            flex-direction: row;
            align-items: center;
            .record-cover {
                width: 300px;
                aspect-ratio: 1;
                border-radius: 4px;
                box-shadow:
                    rgba(0, 0, 0, 0.07) 0px 1px 2px,
                    rgba(0, 0, 0, 0.07) 0px 2px 4px,
                    rgba(0, 0, 0, 0.07) 0px 4px 8px,
                    rgba(0, 0, 0, 0.07) 0px 8px 16px,
                    rgba(0, 0, 0, 0.07) 0px 16px 32px,
                    rgba(0, 0, 0, 0.07) 0px 32px 64px;
                z-index: 12;
            }

            .record-vinyl {
                width: 280px;
                height: 280px;
                aspect-ratio: 1;
                margin-left: -200px;
                z-index: 11;
            }
        }
    }

    .background-overlay {
        position: fixed;
        background: var(--accent-bg-starker);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        width: 100%;
        height: 100%;
        filter: blur(50px) brightness(75%);
    }
</style>
