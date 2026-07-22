# Reporting

Reports must be short, evidenced, and fix-oriented.

## Format

```markdown
# YABI-UI-TESTER Report

## Summary
- URL/route count:
- Viewport count:
- Screenshot count:
- Critical:
- Medium:
- Low:

## Critical
- [route] [viewport] [evidence file] Problem.
  Fix direction:

## Medium
- ...

## Low
- ...

## Automatic Evidence
- axe:
- console:
- network:
- media:
- overflow:
- forbidden-pattern:
```

## Language

Be concrete:
- Say "The text is unreadable", not "it feels a bit low".
- Cite "390x844 mobile, 006-scroll-812.png".
- Say "The CTA disappears", not "the design is weak".

## Feedback Into YABI

If the same issue repeats across two projects, it becomes a candidate YABI
rule. If it repeats across three sectors, it can become a constitution rule.
