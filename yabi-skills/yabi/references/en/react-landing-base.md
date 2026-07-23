# React Landing Base Protocol

This is the binding base protocol for YABI React landing page creation and
existing React landing refactors. It is not a summary. The agent must execute
the three prompts in order:

1. Skill research and React architecture planning.
2. React landing page implementation.
3. Audit, refinement, and fixes.

If the user only asks for the first prompt, do not build. If the user asks for
the full job, report the plan briefly and continue into build and audit.

## Zero-Level Red Lines

### Naming Discipline

Do not invent silly, random, generic startup names for the app, product, brand,
repo, package, or visible heading.

Forbidden naming patterns:
- `Nexa`, `Nova`, `Lumina`, `Vibe`, `Pulse`, `Flow`, `Quantum`, `Hyper`,
  `Aether`, `Orbit`, `Vertex`, `Synergy`, `Catalyst`, `Elevate`, `Prism`
  when they do not come from the brief.
- Randomly combining unrelated words to fake a brand.
- Changing a real user-provided name to make it sound cooler.
- Confusing package names with visible brand names.

Correct behavior:
- If the user provides a name, use it exactly.
- If no name is provided, ask during planning.
- If the user says "you choose", use a literal, low-ego descriptive name
  based on the category: `barber-booking`, `istanbul-chef-table`,
  `legal-consulting-site`.
- If no real brand exists, the visible H1 can be a literal offer/category,
  not a fake brand.

### Full Animation in Every Section

Every section belongs to the motion system. A landing page where only the hero
is animated and the rest is static fails YABI.

Every section must define at least three of these four layers:
- Entrance motion.
- Internal motion while the section is active: scroll, cursor, hover,
  parallax, text mask, clip, media pan, or layout shift.
- Exit or transition into the neighboring section.
- Micro-interaction for CTA, link, form, media, or cursor.

A deliberate silence section is not an exception. The stillness must be a
designed contrast against previous and next motion.

Each section needs a distinct motion signature. Repeated `fade-in + slide-up`
patterns are forbidden.

## 1. Prompt: Skill Research and React Architecture Planning

### Goal

Before coding, discover the required creative, technical, and architectural
skills, install them, read them, and produce a React architecture plan. Do not
create the landing page in this phase.

### Mandatory Skill Research

Use project-installed `find-skills`/`findskills` if available. Otherwise use
`npx skills find`. Search in three categories.

#### A) Creative / Design Skills

Search for skills covering:
- Composition.
- Storytelling.
- Cinematic scene structure.
- Scroll storytelling.
- Reveal animation.
- Kinetic typography.
- Micro-interaction.
- Editorial readability.
- Contrast and density decisions.
- Experimental layout.
- Unusual navigation and interaction.

Example searches:

```bash
npx skills find composition design
npx skills find storytelling motion
npx skills find scroll experience
npx skills find kinetic typography
npx skills find frontend design accessibility
```

#### B) Technical / Visual Structure Skills

Search for:
- Frontend engineering.
- Spacing systems.
- Grid systems.
- Responsive breakpoints.
- WCAG.
- Performance.
- Asset optimization.
- React + GSAP integration.
- ScrollTrigger cleanup.

Example searches:

```bash
npx skills find react animation
npx skills find gsap scrolltrigger
npx skills find frontend performance
npx skills find accessibility wcag
npx skills find responsive design system
```

#### C) Architecture / Code Quality Skills

Search for:
- React component separation.
- Custom hook design.
- File organization.
- State management.
- Local state and Context decisions.
- Code readability.
- Naming standards.

Example searches:

```bash
npx skills find react architecture
npx skills find component design
npx skills find custom hooks
npx skills find code quality naming
```

### Required Report for Each Skill

Use this format:

```markdown
- Skill: [skill name]
  Category: [A/B/C]
  Source: [owner/repo or local]
  Purpose: [one concrete sentence]
  Why this project needs it: [specific reason]
  Install command: [command run]
  Files read: [SKILL.md/README path]
  Binding level: [inspiration / required technical rule / architecture rule]
```

After installing a skill, read its `SKILL.md` or `README`. Do not rely only on
search results.

### React Architecture Plan

After skill research, summarize this plan to the user. Do not code before the
plan is approved.

#### 1. File Structure

Mandatory base:

```text
src/
  components/
    layout/
      PageShell/
        index.jsx
        PageShell.css
    navigation/
      SiteNav/
        index.jsx
        SiteNav.css
    sections/
      HeroScene/
        index.jsx
        HeroScene.css
      [SectionName]/
        index.jsx
        [SectionName].css
  hooks/
    motion/
      useHeroScene.js
      useSectionScene.js
      useScrollProgress.js
      useMagneticCursor.js
  lib/
    gsap.js
    motionConfig.js
  styles/
    tokens.css
    globals.css
  data/
    landingContent.js
```

Rules:
- Each section owns its folder.
- Each section has its own style file.
- Section components own scene markup, not global orchestration.
- Layout and navigation stay shared.
- Content should live in `data/landingContent.js` when practical.

#### 2. Motion Hook Plan

Motion does not live inside components. Explain the hook plan:

```text
useHeroScene(ref, options)
useSectionScene(ref, sceneId, options)
useScrollProgress()
useMagneticCursor(targets, options)
```

GSAP standard:

```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // timeline + ScrollTrigger here
  }, rootRef);

  return () => ctx.revert();
}, []);
```

Rules:
- GSAP code without `ctx.revert()` is rejected.
- ScrollTrigger cleanup cannot be ambiguous.
- Hooks must not randomly attack DOM outside their section ref.
- Timeline names must be clear: `heroRevealTl`, `menuDriftTl`,
  `closingFakeOutTl`.

#### 3. `/src/lib/gsap.js`

Plugin registration happens in one file:

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

Do not register plugins again elsewhere.

#### 4. State Management

Explain:
- Section hover/open state: local state.
- Global cursor mode, global scroll progress, route-level theme shift:
  Context.
- Do not use Zustand/Redux for a simple landing page.
- If one section's state drives another section's animation, rethink the
  architecture first.

#### 5. Design Tokens

Tokens live in one place:

```css
:root {
  --color-ink: ...;
  --color-paper: ...;
  --color-accent: ...;
  --space-1: ...;
  --font-display: ...;
  --motion-fast: ...;
}
```

Rules:
- Hardcoded hex in components is forbidden.
- Inline styles cannot carry design decisions.
- Use `clamp()` for responsive type and spacing.
- Motion duration/ease comes from tokens or `motionConfig.js`.

#### 6. Naming Plan

The plan must include:

```markdown
Naming decision: [provided by user / ask user / temporary literal name]
```

If a fake name appears, the plan fails.

#### 7. Section Motion Matrix

Before coding, fill this table:

```markdown
| Section | Role | Entrance | Internal motion | Exit/transition | Micro-interaction | Cleanup hook |
|---|---|---|---|---|---|---|
| HeroScene | First impact | ... | ... | ... | ... | useHeroScene |
```

No empty cells. Every section gets full animation.

### Planning Output

Give the user:
- Installed/read skill list.
- React architecture plan.
- Naming decision.
- Section motion matrix.
- Risks and assumptions.
- "If approved, I will start implementation."

## 2. Prompt: Build the React Landing Page

### Start Condition

Do not implement before the architecture plan is approved. If the user asked
for direct implementation, report the plan briefly and continue in the same
turn, but never skip the plan internally.

### Inputs

Clarify:

```text
COLOR/TONE:
[light/dark/specific tone/accent]

LANDING SUBJECT:
[product/service/brand/campaign]

BRAND/APP NAME:
[provided? if not, ask or use a literal temporary name]

GOAL:
[booking/sale/demo form/newsletter/application/portfolio review]

PRESERVED COPY:
[immutable text if any]
```

If the brand/app name is empty, do not invent a "Nexa-like" name. Use literal
offer headings when needed.

### Absolute Architecture Fidelity

During implementation:
- Every section remains in its own folder.
- Every section has its own CSS file.
- Motion lives in hooks.
- Plugin registration happens only in `src/lib/gsap.js`.
- No GSAP without `ctx.revert()` cleanup.
- State does not leak across section boundaries.
- No color, spacing, font, or duration outside tokens.

### Quality Bar

The bar is Awwwards Site of the Day / FWA. "Clean", "modern", "premium", and
"nice" are not goals. The target is the staged web quality of Locomotive, Resn,
Active Theory, Obys, and Ueno.

### World Plan

Before implementation, decide:
- Premise.
- Light behavior.
- Material language.
- Color logic.
- Motion physics.
- Typographic voice.
- Section-to-world mapping.

### Unusualness Selection

Choose 2-3 directives. For each:

```markdown
Directive: [name]
Why I chose it: [specific brief need]
Where it applies: [section/transition]
Technical execution: [CSS/GSAP/ScrollTrigger/hook]
Readability protection: [overlay/safe zone/contrast]
```

Directives:
- Break expected placement.
- Break hero visual expectations.
- Fake-out ending.
- Custom cursor behavior.
- Deliberate silence.
- Break the frame.
- Unusual scroll physics.

### Full Animation for Every Section

Every section must have a unique motion signature:

```markdown
HeroScene:
- Entrance:
- Scroll-linked internal motion:
- Exit transition:
- Micro-interaction:
- Reduced-motion fallback:

[NextSection]:
- Entrance:
- Scroll-linked internal motion:
- Exit transition:
- Micro-interaction:
- Reduced-motion fallback:
```

Rejected:
- Static sections.
- Same fade/slide on every section.
- Treating a simple CSS transition as a full scene transition.
- Motion that makes text unreadable.
- Killing all motion quality on mobile.

### Sick Transitions

Section boundaries cannot be plain scroll or fade. Use a different technique at
each boundary:
- Whip-pan clip-path wipe.
- Speed-ramp scroll zoom.
- Morph cut.
- Split/shatter.
- 150-250ms glitch/RGB split reveal.
- Text mask carry-over.
- Media crop reveal.

For major ScrollTrigger transitions:
- `pin: true`.
- `scrub: 1`.
- Clear `start` and `end`.
- Cleanup.
- Reduced-motion fallback.

Repeating the same transition at two boundaries fails the build.

### Readability

For every text block:
- Target WCAG AA 4.5:1.
- Use safe zones or solid overlays on dense media.
- `mix-blend-mode` alone is not enough for core text.
- Kinetic typography remains readable at its fastest moment.
- CTAs stay visible and clickable in every viewport.

### Bans

Do not use:
- Card layouts.
- Numbered process sections.
- Generic feature grids.
- Gradient backgrounds/buttons.
- Stock icons.
- Decorative blob/geometric shapes.
- Same hero template.
- Repeated transitions.
- 3D/WebGL unless requested.
- Fake brand/app names.

### Visual Sourcing

If visual assets are needed, source real Pexels/Unsplash assets. Verify before
download:

```bash
curl -o /dev/null -s -w "%{http_code}\n" [URL]
curl -L [URL] -o [file_name]
```

Only use URLs returning 200. Report file, source, usage, and world rationale.

### Responsive

Desktop is the main stage. Mobile is a recomposition, not a squeezed desktop:
- Reduce layer count when needed.
- Shorten motion distance when needed.
- Simplify pin lengths when needed.
- Never degrade readability, CTA access, or motion feeling.

### After Build

Automatically proceed to Prompt 3.

## 3. Prompt: Audit and Refinement

### Goal

Do not defend the work. Break it like jury plus QA. Fix critical and medium
issues before delivery.

### Report Format

First report:

```markdown
## Readability Findings
- ...

## Unusualness Weaknesses
- ...

## AI Tell Findings
- ...

## React Architecture Findings
- ...

## Technical Findings
- ...

## Fixes To Apply
- ...
```

Then fix. Do not stop at reporting.

### Axis 0: Readability

Check:
- Is every heading readable?
- Is every CTA readable?
- Does mobile text overflow?
- Is media-backed text in a safe zone?
- Is any overlay solid and stable?
- Is kinetic text too fast to read?

Fix gaps.

### Axis 1: Unusualness

Check:
- Are the 2-3 directives visible and strong?
- Are they structural or decorative?
- Would the user say "I have not seen this before"?
- Does the default hero/features/testimonials/CTA skeleton still appear?
- Does unusualness harm usability?

Strengthen weak choices.

### Axis 2: Full Animation in Every Section

Re-fill the table:

```markdown
| Section | Entrance | Internal motion | Exit transition | Micro-interaction | Status |
|---|---|---|---|---|---|
```

If entrance/internal/exit is empty, fix it. If two sections share the same
motion signature, differentiate them.

### Axis 3: AI Tell Hunt

Find and remove:
- Card.
- Feature grid.
- Numbered steps.
- Generic icon.
- Gradient.
- Blob/geometric ornament.
- Centered generic section.
- Repeated transition.
- Fake brand/app name.

### Axis 4: React Architecture Fidelity

Check:
- `/src/components/sections/[SectionName]/index.jsx` structure.
- CSS next to section.
- Motion in hooks.
- `src/lib/gsap.js` as only registration point.
- GSAP context cleanup.
- Correct state layer.
- No token bypass.

Fix violations.

### Axis 5: Technical Quality

Check:
- Responsive.
- WCAG.
- Performance.
- Asset weight.
- Console errors.
- Broken media.
- Focus states.
- Reduced motion.
- Animation jank.

Use `yabi-ui-tester` for real browser evidence when possible.

### Final Output

Summarize:
- Chosen unusualness directives and reasons.
- Every section's motion signature.
- How naming discipline was preserved.
- How architecture stayed intact.
- Audit findings fixed.

## Optional Refactor Mode

Use this when an existing React landing page feels generic or AI-made.

### Clarify Scope

Get one:

```text
Full site
Only this section: [section name]
```

Ask if unclear.

### Content Preservation

- Do not change existing copy.
- Do not change headings.
- Do not shorten or expand text.
- Preserve hierarchy and information flow.
- If one section is selected, touch only that section file.

### Refactor Diagnosis

Start with:

```markdown
I chose this because the current [section/site] has these problems:
- [standard layout]
- [weak motion]
- [AI tell]
- [readability risk]
```

### Refactor Unusualness

Choose 2-3 directives for full site, or 1 directive for one section:
- Break expected placement.
- Break visual expectations.
- Fake-out ending.
- Custom cursor.
- Deliberate silence.
- Break the frame.
- Unusual scroll physics.

### Refactor Motion Rule

Every changed section gets full animation:
- Entrance.
- Internal motion.
- Exit/neighbor transition.
- Micro-interaction.
- Reduced-motion fallback.

### Refactor Delivery

Summarize:
- Which directive was chosen?
- Why?
- Which files changed?
- Was copy preserved?
- Were component boundaries preserved?
- Is motion hook cleanup present?
- Which AI tells were removed?
