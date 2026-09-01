# Orbit Portfolio — Design Direction

## Three stylistic approaches

### Theme Name: Signal / Soft Brutalism
Very large editorial typography, warm paper, ink black, and one electric accent create a portfolio that feels authored rather than templated. Motion is tactile and purposeful, with hard-edged panels and responsive cursor behaviors.

**Probability:** 0.06

### Theme Name: Lunar Interface
A dark, cinematic portfolio with luminous mineral colors, orbiting objects, and a museum-like amount of negative space. The site behaves like an instrument panel for exploring creative work, but avoids sci-fi clichés through restrained type and quiet transitions.

**Probability:** 0.03

### Theme Name: Field Notes / Neo-Editorial
An off-white canvas, cobalt rules, oversized serif headlines, and collage-like project fragments make the work feel like a printed design journal. Scroll reveals act like page turns and annotations, keeping the experience intimate and art-directed.

**Probability:** 0.08

## Selected direction: Lunar Interface

### Design Movement
A contemporary blend of Swiss Internationalism, digital brutalism, and observatory ephemera: precise alignment systems, sparse typography, and a dark mineral surface that lets small signals of color carry meaning.

### Core Principles
1. **Quiet confidence:** let the work and whitespace carry the authority; avoid ornamental clutter.
2. **Structured drift:** use a precise layout skeleton, then let 3D objects and micro-interactions gently drift inside it.
3. **Material contrast:** pair matte graphite surfaces with glassy cobalt geometry, soft grain, and hairline rules.
4. **Motion with intent:** every animation should explain hierarchy, depth, or state instead of decorating the page.

### Color Philosophy
The base is near-black graphite, not pure black, so the page feels physical and readable. Moonstone white is reserved for language and wayfinding. The signature brand color is **signal cobalt (#4D7CFE)**, used as a navigational beam: it highlights the active object, the next action, and the point where the interface is asking for attention. A small amount of acid chartreuse marks experimental details without turning the interface into a neon dashboard.

### Layout Paradigm
An asymmetric, left-anchored composition with a slim vertical index rail and a large open visual field. Content enters from the edges of a shared observatory frame rather than from centered cards. Project rows behave like specimens on a wall: each one is a wide horizontal strip with a narrow metadata column and a visual field that opens on hover.

### Signature Elements
- A persistent vertical section index that rotates through the page like a telescope dial.
- A floating cobalt 3D orb/icosphere that reacts to pointer movement and scroll velocity.
- Hairline orbit arcs, grain texture, and “signal” labels that make the site feel like a measured instrument.

### Interaction Philosophy
The cursor is treated as a measuring instrument. Hovering a project increases its signal, expands its visual field, and reveals a concise invitation to explore; it never triggers noisy effects. Buttons use a small magnetic pull, active states snap quickly, and all essential information remains available without a pointer.

### Animation
Use `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and `cubic-bezier(0.77, 0, 0.175, 1)` for morphing. The hero orb floats with a slow 12-second loop, while scroll progress nudges its orbit and scale. Hero copy reveals line-by-line with 60ms staggered intervals. Project rows translate only on the compositor and transition in 180–260ms. Respect `prefers-reduced-motion` by turning off parallax, floating loops, and staggered reveals while preserving opacity/state changes.

### Typography System
Use `DM Sans` for interface copy and metadata, with `Space Grotesk` for the display layer. Headlines are tight, heavy, and mostly lowercase sentence case. Labels are uppercase at 0.12em tracking. Avoid italic display type: the contrast comes from scale and spacing, not decoration.

### Brand Essence
Orbit is a creative technology portfolio for teams looking for design that gives complex ideas a clear signal — precise, atmospheric, and built to move.

**Personality:** observant, exacting, quietly experimental.

### Brand Voice
Headlines are compact and declarative. CTAs are invitations to inspect, not sales language. Microcopy feels like a lab note: short, specific, and a little curious.

Example headline: **I make complex ideas legible in motion.**

Example CTA: **Enter the signal**

### Wordmark & Logo
The wordmark uses a custom geometric “O” constructed from two offset arcs, suggesting both an orbit and a focus ring. The standalone mark is a cobalt ring interrupted by one short radial cut — recognizable at favicon size and visually related to the hero orb.

### Signature Brand Color
**Signal Cobalt — #4D7CFE**

## Implementation reminder
Every CSS, page, and component file should begin with a short comment tying its decisions back to the Lunar Interface system: graphite surface, moonstone type, signal cobalt, asymmetric observatory framing, and purposeful motion.
