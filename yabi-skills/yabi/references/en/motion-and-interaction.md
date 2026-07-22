# Motion and Interaction

Motion is not decoration. It is the physics engine of the site.

## Motion Physics

Choose one dominant behavior:
- Heavy: luxury, craft, physical product, trust.
- Sharp: technology, performance, competition, decisions.
- Fluid: restaurant, wellness, culture, organic experience.
- Mechanical: SaaS, operations, measurement, engineering.
- Explosive: launch, music, events, campaigns.

Easing, duration, stagger, and scroll behavior must come from that physics.

## Transition Families

Route and major section transitions should be distinct but related:
- Clip-path slash for sharp worlds.
- Through-object zoom for product and material worlds.
- Split panel reveal for editorial or corporate worlds.
- Text mask reveal for typography-led worlds.
- Scroll-tied parallax for place and depth.
- Hard cut plus silence for premium trust.

Do not repeat the same transition back to back.

## GSAP Rules

- Use `gsap.context()`.
- In React, set up motion in `useLayoutEffect` and call `ctx.revert()` on
  cleanup.
- Use `pin`, `scrub`, `start`, and `end` intentionally.
- Put timelines in hooks/utilities, not render code.
- Provide a reduced-motion path for `prefers-reduced-motion`.
- Use `will-change` only on elements that actually animate.

## Micro-Interactions

Hover and focus states are not just color changes:
- CTAs should pull the cursor.
- Link motion should match the brand physics.
- Forms need error, success, loading, disabled, and focus states.
- Menus should open like scene transitions without breaking the world.

## Performance Boundary

YABI can look heavy, but it cannot run heavy. If motion janks, check:
- Layout-thrashing properties.
- Whether `transform` and `opacity` can replace dimensions or positions.
- Responsive image/video loading.
- Reduced layer counts on mobile.
