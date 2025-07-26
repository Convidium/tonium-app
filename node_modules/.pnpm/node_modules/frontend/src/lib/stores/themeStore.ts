import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const allowedThemes = ['light', 'dark'] as const;
const allowedDesigns = ['default', 'flat', 'skeumorphic'] as const;

type ThemeType = typeof allowedThemes[number];
type DesignType = typeof allowedDesigns[number];

const defaultTheme: ThemeType = 'light';
const defaultDesign: DesignType = 'default';

function getInitialTheme(): ThemeType {
    const value = browser ? localStorage.getItem('theme') : null;
    return allowedThemes.includes(value as ThemeType) ? (value as ThemeType) : defaultTheme;
}

function getInitialDesign(): DesignType {
    const value = browser ? localStorage.getItem('design') : null;
    return allowedDesigns.includes(value as DesignType) ? (value as DesignType) : defaultDesign;
}

export const theme = writable<ThemeType>(getInitialTheme());
export const design = writable<DesignType>(getInitialDesign());

if (browser) {
	theme.subscribe((value) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', value);
			document.documentElement.setAttribute('data-theme', value);
		}
	});

	design.subscribe((value) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('design', value);
			document.documentElement.setAttribute('data-design', value);
		}
	});
}