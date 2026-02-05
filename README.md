# Warehouse Management System Simulator
## Studying Operator Visibility, Spatial Understanding, and Breakdown

This project is a **research-oriented simulation** focused on how human operators perceive, interpret, and act on warehouse system state under density, automation, and failure.

Rather than optimizing throughput or accuracy alone, the simulator is designed to study:
- how information *shows through* automation,
- how operators build mental models of space and flow,
- and how small breakdowns propagate into operational failure.

The project begins as a **2D simulation** and is designed to evolve into a **3D spatial prototype**.

---

## Motivation

Modern warehouses rely on layers of automation, scanning systems, and routing logic.
From the operator’s perspective, these systems often collapse into:
- blinking indicators,
- delayed alerts,
- or opaque task queues.

This simulator treats the warehouse not just as a logistics problem, but as a **human–system interface problem**.

Key questions:
- What does an operator *see* when something goes wrong?
- Which failures are immediately legible, and which remain invisible?
- How does spatial representation affect trust and intervention timing?

---

## Scope

### Phase 1: 2D Simulation (Current)
- Grid-based warehouse layout
- Agents representing workers / vehicles
- Storage locations, pickup/drop zones
- Marker- or ID-based item localization (abstracted initially)
- Event-driven failures (mis-scan, delay, congestion)

Focus:
> Interaction, visibility, and breakdown — not realism.

---

### Phase 2: 3D Simulation (Planned)
- Spatial warehouse geometry
- Depth, occlusion, and navigation constraints
- Operator viewpoint vs system viewpoint
- Comparison between 2D and 3D representations

Tooling:
- Blender (for scene + animation)
- Custom Python scripts or exports for logic replay

---

## Non-Goals

- Maximizing warehouse efficiency
- Building a production-grade WMS
- Perfect physics or photorealism
- Reinforcement learning benchmarks (for now)
