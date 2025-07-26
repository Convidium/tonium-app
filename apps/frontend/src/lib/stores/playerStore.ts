import { writable, get, derived } from "svelte/store";

export interface Track {
    track_id: number;
    track_name: string;
    track_path: string;
    track_position: number;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    release_date: string;
    info: string;
    front_cover_path: string;
    back_cover_path: string;
    label: { id: number; name: string };
    producer: { id: number; name: string };
    tracks: Track[];
    genres: any[];
    moods: any[];
    tags: any[];
    writers: any[];
    rating: Record<string, number>;
}

function createPlayerStore() {
    const album = writable<Album | null>(null);
    const currentTrackIndex = writable(0);
    const isPlaying = writable(false);
    const progress = writable(0);
    const duration = writable(0);

    const volume = writable(0.5); // 0.01 = 1%
    let lastVolume: number = 0.5; // Store last non-muted volume
    let isMuted = false;

    let audio: HTMLAudioElement | null = null;

    function loadAlbum(newAlbum: Album, startIndex = 0) {
        album.set(newAlbum);
        currentTrackIndex.set(startIndex);
        loadTrackByIndex(startIndex);
    }

    function loadTrackByIndex(index: number) {
        const currentAlbum = get(album);
        if (!currentAlbum) return;

        const track = currentAlbum.tracks[index];
        if (!track) return;

        if (audio) {
            audio.pause();
        }

        audio = new Audio(track.track_path);

        audio.addEventListener("loadedmetadata", () => {
            duration.set(audio!.duration);
        });

        audio.addEventListener("timeupdate", () => {
            progress.set(audio!.currentTime);
        });

        audio.addEventListener("ended", () => {
            isPlaying.set(false);
            playNext();
        });

        audio.addEventListener("pause", () => {
            isPlaying.set(false);
        });
        audio.addEventListener("play", () => {
            isPlaying.set(true);
        });

        currentTrackIndex.set(index);
    }

    function play() {
        if (audio) {
            audio.play();
            isPlaying.set(true);
        }
    }

    function pause() {
        if (audio) {
            audio.pause();
            isPlaying.set(false);
        }
    }

    function togglePlay() {
        get(isPlaying) ? pause() : play();
    }

    function playNext() {
        const currentAlbum = get(album);
        const index = get(currentTrackIndex);

        if (currentAlbum && index < currentAlbum.tracks.length - 1) {
            loadTrackByIndex(index + 1);
            play();
        }
    }

    function playPrevious() {
        const index = get(currentTrackIndex);
        if (index > 0) {
            loadTrackByIndex(index - 1);
            play();
        }
    }

    function seekTo(time: number) {
        if (audio) {
            audio.currentTime = time;
            progress.set(time);
        }
    }

    const getVisuals = derived(album, $album => {
        if ($album === null) return {};
        return {
            front_cover: $album.front_cover_path,
            back_cover: $album.front_cover_path,
        }
    })

    const currentTrack = derived([album, currentTrackIndex], ([$album, $index]) => {
        return $album?.tracks[$index] ?? null;
    });

    function getVolume() {
        return audio ? audio.volume : get(volume);
    }

    function setVolume(value: number) {
        isMuted = false;
        const clamped = Math.max(0, Math.min(1, value));
        if (audio) {
            audio.volume = clamped;
        }
        volume.set(clamped);
    }

    function muteToggle() {
        if (!isMuted) {
            lastVolume = get(volume);
            setVolume(0);
            isMuted = true;
        } else {
            setVolume(lastVolume);
            isMuted = false;
        }
    }

    return {
        album,
        currentTrackIndex,
        currentTrack,
        getVisuals,
        isPlaying,
        progress,
        duration,
        volume,
        loadAlbum,
        loadTrackByIndex,
        play,
        pause,
        togglePlay,
        playNext,
        playPrevious,
        seekTo,
        getVolume,
        setVolume,
        muteToggle,
    };
}

export const playerStore = createPlayerStore();

export const isPlaying = playerStore.isPlaying;
export const progress = playerStore.progress;
export const duration = playerStore.duration;
export const currentTrack = playerStore.currentTrack;
export const getVisuals = playerStore.getVisuals;
export const volume = playerStore.volume;

export const currentTimestamp = derived(playerStore.progress, ($progress) => {
    const minutes = Math.floor($progress / 60);
    const seconds = Math.floor($progress % 60);
    const m = minutes < 10 ? `${minutes}` : `${minutes}`;
    const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${m}:${ss}`;
});

export const trackDuration = derived(playerStore.duration, ($duration) => {
    const minutes = Math.floor($duration / 60);
    const seconds = Math.floor($duration % 60);
    const m = minutes < 10 ? `${minutes}` : `${minutes}`;
    const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${m}:${ss}`;
});

export const isFullPlayerVisible = writable(false);