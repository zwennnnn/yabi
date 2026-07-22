# Failure Taxonomy

## Critical Failure

Critical failures include:
- Unreadable heading, CTA, navigation, or form label.
- 404 asset, broken media, console error.
- Mobile/tablet horizontal overflow.
- Core content leaving the viewport.
- Route load failure.
- Missing focus state.
- Pin/scrub motion failure that traps the user.

If a critical finding exists, the site is not ready.

## Medium Failure

Quality failures include:
- YABI banned pattern candidates: card grid, gradient, step copy, generic icon.
- Text overlap candidates.
- Repeated animation behavior.
- Inner pages feeling visually cheaper.
- CTAs detached from context.

Medium findings require a fix plan.

## Low Finding

Refinements include:
- Better crop.
- Better screenshot timing.
- Cleaner hover behavior.
- Stronger focus contrast.
- Lower section density.

## False Positives

The script reports DOM signals as candidates. Overlap and card-class findings
must be reviewed by eye. Intentional bleed is not a bug when it does not hide
content and supports the YABI world.
