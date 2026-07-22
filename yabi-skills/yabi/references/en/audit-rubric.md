# YABI Audit Rubric

Run this before delivery. Listing issues is not enough; fix critical and medium
findings before calling the work done.

## Critical

The work is unfinished if any of these exist:
- Unreadable heading, CTA, form label, or navigation.
- Mobile content overflow, overlap, or disappearance.
- Console error, broken route, 404 asset, broken image/video.
- Missing focus state on core interactive elements.
- Route transition or scroll animation freeze/jank.
- Form submission failure or ambiguous state.

## Medium

These reduce quality:
- Card grids, generic feature lists, numbered process sections.
- Same hero variant copied across routes.
- Repeated transition or reveal behavior.
- Visual world and copy tone contradict each other.
- Inner pages feel cheaper than the homepage.
- CTAs do not emerge from context.

## Low

These are refinements:
- Timing improvements.
- Better crops.
- Clearer hover/focus micro-motion.
- Lower section density.
- More coherent footer and legal pages.

## Scoring

Score each axis from 0 to 5:
- Readability
- Visual world
- Site architecture
- Motion system
- Responsive quality
- Technical cleanliness
- Originality

Do not deliver if any axis is below 3. Do not call it YABI-level unless the
average is above 4.

## Audit Order

Collect automatic evidence first with `yabi-ui-tester` when available. Then
read screenshots. Then inspect code. The eye, browser, and source must tell
the same story.
