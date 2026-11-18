---
version: alpha
name: "Warehouse Route Lab"
description: "A game-like operations console for inspecting warehouse robot search decisions in 3D."
colors:
  primary: "#35D7D0"
  route: "#F7E36A"
  decision: "#FFB648"
  danger: "#FF6573"
  success: "#78E08F"
  background: "#071017"
  surface: "#0B171F"
  border: "#20323B"
  text: "#E9F3F5"
  muted: "#89A0A8"
typography:
  display:
    fontFamily: "Bahnschrift, Arial Narrow, sans-serif"
  body:
    fontFamily: "Segoe UI, system-ui, sans-serif"
  data:
    fontFamily: "Consolas, Courier New, monospace"
rounded:
  DEFAULT: "0.75rem"
  sm: "0.4375rem"
  md: "0.75rem"
  lg: "1.125rem"
spacing:
  control: "1.25rem"
  section: "2.625rem"
  viewport-edge: "1.25rem"
components:
  button: {}
  algorithm-selector: {}
  telemetry-card: {}
  simulation-stage: {}
  comparison-table: {}
  dialog: {}
---

# Warehouse Route Lab Design System

## Overview

### Creative North Star

The interface borrows from a warehouse control room at night: instrument panels remain quiet and precise while the 3D floor is the bright operational focus. Its signature is the living decision frontier—a cyan field that makes an otherwise abstract search queue spatially legible.

### Product context and register

- **Audience and primary job:** AI students comparing path-planning algorithms and explaining why each algorithm selected its route.
- **Target market and evidence:** English-language university coursework, based on the supplied assignment PDF.
- **Locale and language policy:** English UI and accessible labels; algorithm notation remains universal.
- **Usage scene:** Laptop or desktop presentation, classroom evaluation, and individual exploration. A compact mobile layout is supported for review.
- **Register:** Product/tool. Dense telemetry is subordinate to the simulation stage.
- **Memorable signature:** Three-dimensional frontier, candidate, and final-path light fields rendered directly on the warehouse floor.
- **Restraint:** Controls, metrics, and the comparison table use flat, low-contrast panels so they do not compete with route colors.
- **Anti-references:** No generic neon cyberpunk decoration, dashboard card mosaic, or toy-cartoon warehouse. Color always maps to search state or terrain.
- **Token ownership/runtime mapping:** This file is the durable design source; exact values map one-to-one to custom properties in `public/styles.css`, consumed by shared control and data-display classes.

## Colors

`primary` marks interactive selection and the live frontier. `route` is reserved for a committed path; `decision` marks newly discovered candidates. `danger` identifies restricted cells and failures, while `success` identifies the start and reached-goal state. Dark surfaces preserve depth perception in the Three.js scene. Every state has a label, shape, or text equivalent.

## Typography

Bahnschrift gives headings the condensed geometry of warehouse signage. Segoe UI carries explanatory copy. Consolas owns algorithms, coordinates, timing, metrics, and small operational labels. Headings use sentence case; compact instrument labels use uppercase tracking.

## Layout

Desktop uses a control rail, dominant simulation stage, and telemetry inspector. Below 1120px telemetry becomes a full-width band; below 720px the simulation leads and controls follow. The stage reserves at least 58vh on mobile. Tables scroll internally on narrow screens, with visible scrollbar styling inherited globally.

## Elevation & Depth

Physical depth belongs to the 3D world. Product panels use tonal separation and one-pixel borders rather than stacked shadows. The modal is the sole elevated UI surface; it uses a dark backdrop and contained shadow.

## Shapes

Controls use the `sm` radius; panels and the table use `md`; the modal uses `lg`. Warehouse geometry remains squared and functional. Circular shapes indicate robot mechanisms, status, or transient search focus.

## Components

### Foundational visual states

Hover lightens the surface or border; focus uses a two-pixel pale-cyan outline; active selectors use a cyan border plus tint. Busy controls retain dimensions and become visibly unavailable. Success and failure are stated in text as well as color.

### Buttons and actions

The cyan solid button starts the selected algorithm. The trolley experiment uses amber outline emphasis because it introduces a recoverable disruption. Camera and help controls are compact, named icon buttons.

### Navigation and data display

Algorithm selectors expose a stable four-option matrix. Metrics keep fixed cells during the run. The comparison table uses semantic table markup and horizontal overflow on narrow screens.

### Forms and overlays

Range and checkbox inputs retain native keyboard semantics with authored visual treatment. The guide uses a native modal dialog with named close action and Escape behavior.

### Iconography

Simple geometric glyphs and CSS-drawn marks match the industrial instrument language. Labels remain present for all non-universal actions; icon-only controls have accessible names and tooltips.

### Motion

Search playback motion communicates expansion order and robot position. UI transitions stay between 180–240ms. Reduced-motion mode collapses trace playback to a handful of near-instant representative frames and removes decorative motion.

### Content and data visualization

Copy explains the robot’s decision in plain language. Metrics always display units. Cyan means pending search, amber means candidate/disruption, white means current expansion, and yellow means committed route.

## Do's and Don'ts

- **Do:** Preserve the one-color-per-search-state mapping in every view.
- **Do:** Keep Python search traces authoritative for every rendered decision.
- **Don't:** Add decorative glow that could be mistaken for route state.
- **Don't:** let secondary panels reduce the simulation below a useful inspection size.
