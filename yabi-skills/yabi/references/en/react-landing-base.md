# React Landing Base Protocol

This file is the mandatory base for YABI React landing page and section
refactor work. Read it before coding, follow it during implementation, and
re-check it during final audit.

## 1. Prompt: Skill Research and React Architecture Planning

### Skill Research

Use the project-installed `find-skills`/`findskills` skill or run
`npx skills find` to research all skills needed for an award-level React
landing page in three categories:

**A) Creative / Design**
- Composition, storytelling, cinematic scene structure.
- Scroll storytelling, reveal animation, kinetic typography,
  micro-interaction.
- Editorial readability, contrast, rhythm, density.
- Experimental layouts and unusual interaction approaches.

**B) Technical / Visual Structure**
- Frontend engineering, spacing systems, grid, responsive breakpoints.
- WCAG, performance, asset optimization.
- React-specific GSAP integration: `useLayoutEffect`, `gsap.context()`,
  ScrollTrigger cleanup.

**C) Architecture / Code Quality**
- React component boundaries, custom hooks, file organization.
- State management decisions: local state, context, event bus, or store.
- Code readability, naming, responsibility boundaries.

For every relevant skill, explain its name, category, and purpose. Install it
into the project, then read its `SKILL.md`/`README`. Do not make decisions from
unread skills.

### React Architecture Plan

Before coding, summarize this plan to the user:

1. File structure:

```text
src/
  components/
    sections/
      SectionName/
        index.jsx
        SectionName.css
  hooks/
    useSectionScene.js
  lib/
    gsap.js
  styles/
    tokens.css
```

Each section owns its folder and responsibility.

2. Motion:
- Motion lives in `/src/hooks/` custom hooks.
- GSAP context is created inside the hook.
- `useLayoutEffect` returns cleanup with `ctx.revert()`.
- Repeated timeline code does not live inside components.

3. GSAP center:
- `/src/lib/gsap.js` is the single plugin registration point.
- `ScrollTrigger` and other plugins are registered there once.

4. Shared state:
- Use local state when it is enough.
- Use Context only for true global scroll progress or route-wide cursor state.
- Do not leak component state across boundaries just for an effect.

5. Design tokens:
- Color, spacing, typography, and motion values live in CSS custom properties
  or Tailwind config.
- Inline styles and hardcoded hex values inside components are forbidden.

If the user specifically asked for planning, stop here, summarize skill
research and architecture, and request approval.

## 2. Prompt: Build the React Landing Page

Follow the previous architecture plan exactly:
- Every section remains in its own component file.
- Motion lives in custom hooks.
- GSAP contexts are cleaned with `useLayoutEffect` + cleanup.
- Component boundaries and state flow are never distorted for an effect.

### Inputs

Collect from the user or brief:
- Color/tone preference.
- Landing page subject.
- Audience and conversion target.
- Required or preserved copy.

### Bar

The bar is Awwwards Site of the Day / FWA. "Beautiful" is not enough. The
output must visibly break generic AI landing page patterns.

### Unusualness Requirement

Choose and perfect the 2-3 directives that best fit the project:

1. Break expected placement: navigation can be embedded into composition,
   appear on scroll, or live in an unusual position.
2. Break hero image expectations: use bold type, silence, whitespace, and one
   precise motion when stronger than a hero image.
3. Fake-out ending: make the experience feel over, then reveal the real close.
4. Custom cursor: make the pointer behave like part of the brand and change by
   section.
5. Deliberate silence: stop all motion in one section so stillness becomes the
   emphasis.
6. Break the frame: let at least one element visibly breach the viewport or
   section boundary.
7. Unusual scroll physics: use one strong horizontal, breathing, or altered
   scroll moment.

These are structural decisions, not decorations. Justify the chosen directives.

### Scene Logic and Sick Transitions

Build the page as a sequence of scenes. Section transitions cannot be plain
scroll or fade. Use a different technique at each boundary:
- Whip-pan clip-path wipe.
- Speed-ramp scroll zoom.
- Morph cut.
- Split/shatter.
- 150-250ms glitch/RGB split reveal.

For ScrollTrigger transitions use `pin: true` and `scrub: 1` to make the
experience respond to scroll speed.

### Golden Rule: Readability

Unusualness cannot sacrifice readability. All text remains readable in every
state. Use solid fixed-opacity contrast overlays when needed. Target WCAG AA
4.5:1.

### Hard Bans

- Card-based layouts.
- Numbered "1. 2. 3." process sections.
- Gradient backgrounds/buttons.
- Stock icons.
- Decorative geometric/blob shapes.
- Predictable "hero + features grid + testimonials + CTA" skeleton.
- Repeating the same transition technique at multiple boundaries.
- 3D/WebGL unless explicitly requested; build the effect with 2D visuals,
  CSS, and GSAP.

### Visual Sourcing

If imagery is needed, source from Pexels/Unsplash:

```bash
curl -o /dev/null -s -w "%{http_code}\n" [URL]
curl -L [URL] -o [file_name]
```

Only download URLs that return 200. Report file name, source, section, and
reason.

### Desktop and Responsive

Desktop carries full composition and motion. Mobile can simplify, but
readability and motion quality cannot degrade.

## 3. Prompt: Audit and Refinement

Re-audit the landing page critically. Do not only list findings; fix critical
and medium issues.

### Axis 0: Readability
- Is every text block readable in every state?
- Add contrast/overlay when missing.
- Is kinetic text readable at its fastest moment?

### Axis 1: Unusualness
- Are the chosen directives strong and visible?
- Does the page still feel like a decorated template?
- Does unusualness harm usability?

### Axis 2: AI Tell Hunt
- Remove cards, numbered steps, gradients, stock icons, and blob/geometric
  ornaments.
- Differentiate repeated transition techniques.

### Axis 3: React Architecture Fidelity
- Are component boundaries intact?
- Is GSAP cleanup correct?
- Does file structure match the plan?
- Are state and functions in the right layer?

### Axis 4: Technical Quality
- Check responsive, WCAG, and performance.
- Check animation jank and inconsistent timing.

## Refactor Mode

When an existing React landing page feels generic or AI-made, clarify scope:
- Full site.
- Only this section: `[section name]`.

### Content Preservation

- Do not change existing headings or copy.
- Do not alter even one word.
- Preserve content hierarchy and information flow.
- If only one section is selected, touch only that component file.

### Architecture Fidelity

- Do not break the existing component/file structure.
- Put new motion in a custom hook that matches the existing architecture.
- Preserve GSAP cleanup with zero tolerance.
- The code must be cleaner after the change.

### Refactor Unusualness

Choose 2-3 directives for a full site, or 1 directive for a single section:
- Break expected placement.
- Break visual expectations.
- Fake-out ending.
- Custom cursor.
- Deliberate silence.
- Break the frame.
- Unusual scroll physics.

Start with diagnosis: "I chose this because the current [X] has this exact
problem." Then implement.

At the end, summarize the chosen directives, how architecture stayed intact,
and which final audit issues were closed.
