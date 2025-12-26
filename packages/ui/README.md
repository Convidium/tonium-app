This is meant to be a separate UI library for my Tonium app.

Here, I'll create every UI component from scratch, starting from simple title text lines, ranging to complex composite objects.

Calendars, time/date selectors, inputs, select/range/ratio/box inputs, accordions, buttons, switchers, carousels, tabs and so on...

They can be structured into a few separate types of Components:

- [1. Fundamental (Core)](#1-fundamental-core)
- [2. Layout / Structure](#2-layout--structure)
- [3. Navigation](#3-navigation)
- [4. Overlay](#4-overlay)
- [5. Media](#5-media)
- [6. Complex / Composite](#6-complex--composite)
- [7. Advanced Interaction](#7-advanced-interaction)
- [8. Platform-specific UI](#8-platform-specific-ui)
- [9. Design-System Utilities](#9-design-system-utilities)



## Project Structure

packages/
  ui/
    components/
      core/
        button/
          useButton.ts
          useToggleButton.ts
          ...
        .../
      layout/
      navigation/
      overlay/
      media/
      composite/
      interaction/
      platform/
    system/
    skins/
      default/
      glass/
      vingital/
      minimalist/
      skeumorphic/
app/
  src/lib/components/ui/
    Button.svelte
    Input.svelte
    Dialog.svelte



## Architecture & Usage Pipeline

The UI library follows a layered architecture:

1. **Headless Logic Layer** (packages/ui)
2. **Styling Layer** (skins & themes)
3. **Framework Bindings** (Svelte components)
4. **Application Integration** (Tonium app)


```
┌──────────────────────┐
│   Headless Logic     │
│  (useButton, etc.)   │  ← packages/ui/core
└─────────┬────────────┘
          │
┌─────────▼────────────┐
│   UI Components      │
│  (Button.svelte)     │  ← app/src/lib/components/ui
└─────────┬────────────┘
          │
┌─────────▼────────────┐
│   Skins / Themes     │
│  (SCSS, classes)     │  ← packages/ui/skins
└─────────┬────────────┘
          │
┌─────────▼────────────┐
│   Tonium Application │
│   (actual usage)     │
└──────────────────────┘
```

## Types of UI Components

### 1. Fundamental (Core)

**Path:** `packages/ui/components/core`


### 2. Layout / Structure

**Path:** `packages/ui/components/layout`


### 3. Navigation

**Path:** `packages/ui/components/navigation`


### 4. Overlay

**Path:** `packages/ui/components/overlay`


### 5. Media

**Path:** `packages/ui/components/media`


### 6. Complex / Composite

**Path:** `packages/ui/components/composite`


### 7. Advanced Interaction

**Path:** `packages/ui/components/interaction`


### 8. Platform-specific UI

**Path:** `packages/ui/components/platform`


### 9. Design-System Utilities

**Path:** `packages/ui/system`



## How to modify a component

- **Change behavior** → edit headless logic in `packages/ui/core`
- **Change appearance** → edit SCSS in `packages/ui/skins`
- **Change markup / slots** → edit Svelte component in `app/src/lib/components/ui`



## Example Usage

```svelte
```



## Naming Conventions

- Components: `PascalCase`
- Hooks / logic: `useX`
- SCSS classes: `ui-[component]-[variant]`



## Design Philosophy

- Headless-first architecture
- Separation of logic and presentation
- Theme-driven styling
- Minimal abstractions
- Explicit over implicit



## Non-goals

- This is not a general-purpose UI framework
- This library is tailored specifically for the Tonium app
- Not focused on rapid prototyping or visual editors