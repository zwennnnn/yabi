# Site Systems

## Route Map

For complete websites, define routes before designing screens:
- `home`: first world signal, main claim, initial trust.
- `work` or `projects`: proof and depth.
- `product` or `services`: clear anatomy of the offer.
- `about`: character, origin, people, method.
- `contact` or `booking`: conversion.
- `legal`, `privacy`, `terms`: quiet pages that still belong to the system.
- `404`: error state without breaking brand tone.

Give each route a one-sentence dramatic job. Do not add routes without jobs.

## Information Architecture

Build the site around decision flow, not section count:
- What should hit the user first?
- Which objection must be solved next?
- Where does proof appear?
- When should detail open?
- Where does conversion become natural?

Do not trap every answer on the homepage. Multi-page sites need breathing
space.

## Component Architecture

Recommended structure:

```text
src/
  app/ or pages/
  components/
    layout/
    navigation/
    sections/
    primitives/
  hooks/
    motion/
  lib/
    content/
    animation/
  styles/
    tokens.css
    globals.css
```

Rules:
- Section components carry scenes.
- Primitives carry style atoms, not dramaturgy.
- Motion hooks own timelines and ScrollTrigger setup.
- Content should live in a content/data layer when practical.
- Shared components ship with responsive, hover, focus, loading, and disabled
  states.

## Layout System

Do not run the entire site through one centered container. Routes can have
different rhythms while sharing the same grid logic.

Use:
- `clamp()` for controlled spacing.
- CSS custom properties for color, type scale, and motion timing.
- Route-level layout variants.
- Stable aspect ratios for media and tool surfaces.

Avoid:
- Centered heading, paragraph, grid on every section.
- Desktop ideas that collapse into lazy mobile stacks.
- Footers that feel pasted on at the end.

## Multi-Page Continuity

The homepage world should continue into inner pages with reduced intensity:
- Same light source.
- Same material behavior.
- Same motion physics.
- Related but calmer typographic decisions.
- Route transitions that preserve the world.

Inner pages can be quieter. They cannot be cheaper.
