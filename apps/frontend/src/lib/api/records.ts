type AlbumPreview = {
    id: number,
    name: string,
    artist: string,
    front_cover_path: string;
}

export async function fetchAlbums(): Promise<AlbumPreview[]> {
	const res = await fetch("/api/albums?view=preview");
	if (!res.ok) throw new Error("Failed to fetch albums");
	return await res.json();
}