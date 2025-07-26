export const defaultCardData = {
	id: -1,
	name: "Unknown",
	artist: "Unknown",
	front_cover_path: "/assets/placeholder/cover.png",
	record_type: "Record",
};

export function normalizeCard(card: Partial<typeof defaultCardData>) {
	return Object.assign( defaultCardData, card );
}