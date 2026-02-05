# Design Log

A running record of design decisions, rationale, and open questions.

---

## 2026-02-05: Initial Prototype

### Decision: Start with 3D, not 2D
**Rationale**: 
- Research question requires spatial understanding comparison
- Three.js ecosystem is mature (React Three Fiber, Drei)
- Can always add 2D "minimap" later for comparison

**Tradeoff**: 
- Higher learning curve for development
- Performance considerations with many robots
- But: More interesting research space

---

### Decision: 2-second polling instead of WebSockets
**Rationale**:
- Simpler to implement initially
- Easier to inject delays for research purposes
- Can control update frequency per experiment

**Future**: 
- WebSocket for real-time streaming
- But keep polling as research mode option

---

### Decision: Mock ArUco with JSON, not actual OpenCV
**Rationale**:
- Don't need real computer vision for HCI research
- Can simulate detection failures more precisely
- Faster iteration on failure scenarios

**Considered but discarded**:
- Using actual webcam + printed markers → too brittle for research setup
- Pre-recorded video feed → limits experimental control

---

### Decision: Color-code robot status (green=idle, orange=moving, blue=picking, red=error)
**Rationale**:
- Immediate visual differentiation
- Color-blind friendly palette chosen
- Standard traffic-light metaphor

**Open Question**:
- Does this cause operators to over-rely on color vs. reading status text?
- Should we test a "monochrome + icon" variant?

---

### Decision: Show position as (x, z) in UI, hiding y-coordinate
**Rationale**:
- Robots move on flat ground (y=0 always)
- Reduces cognitive load
- Matches warehouse operator mental model (floor plan thinking)

---

### Decision: FastAPI + JSON files instead of PostgreSQL
**Rationale**:
- JSON files are version-controllable (see exact state in git)
- Easier to hand-craft failure scenarios
- No database setup for collaborators

**When to switch**:
- If we need concurrent writes
- If data grows beyond ~1000 robots
- If we add time-series logging

---

## 2026-02-05: UI Layout Decisions

### Decision: Side panel for robot status, not overlay
**Rationale**:
- Overlay obscures 3D view
- Side panel allows continuous monitoring while navigating
- Familiar pattern (file explorer, IDE sidebars)

**Discarded Alternative**:
- Bottom drawer: harder to scan vertically
- Modal popups: breaks flow
- Tooltips only: requires hovering each robot

---

### Decision: No auto-camera follow
**Rationale**:
- Operators should control their own viewpoint
- Auto-follow can be disorienting
- Research question: *when do they choose to follow vs. overview?*

**Future Experiment**:
- Add "Focus Robot" button to test voluntary vs. automatic following

---

## Open Design Questions

### Question 1: How to show "stale" data?
**Options**:
- Fade opacity after 5 seconds without update
- Add timestamp to each robot card
- Change border color (green=fresh, yellow=stale, red=very old)

**Need to test**: Which is most noticeable without being annoying?

---

### Question 2: Should errors be dismissible?
**Scenario**: Robot R003 shows "error" status. Operator investigates and decides it's safe to ignore.

**Options**:
- A) Error persists until robot status changes (current)
- B) Allow "acknowledge" to hide error from view
- C) Show "acknowledged errors" in separate collapsed section

**Research Tradeoff**: 
- (B) reduces clutter but risks hiding real problems
- (A) creates alarm fatigue

---

### Question 3: Path visualization clutter
**If we show planned paths as lines in 3D**:
- Show all paths always? (cluttered)
- Show only for selected robot? (requires selection)
- Show only for "moving" status robots? (automatic but may miss stuck robots)

**Need to prototype and test.**

---

## Lessons from Early Testing

### 2026-02-05: Tested with 2 users (informal)

**Observation 1**: Users immediately tried to click robots in 3D view
- Expected: Clicking robot → shows details
- Actual: Nothing happens
- **Action**: Add click handlers to Robot component, highlight selected robot

**Observation 2**: Users confused by "Real-time Sync" header text
- Interpreted as "is it syncing right now?" vs. "mode description"
- **Action**: Change to "Live Data" or add sync status indicator (green dot)

**Observation 3**: Battery percentage felt arbitrary
- No sense of "how much time left?"
- **Action**: Add estimated runtime based on current task

---

## Discarded Ideas (Moved to discarded-ideas.md)

See `discarded-ideas.md` for full details on:
- 2D grid view as primary interface
- Automatic camera rotation
- Voice alerts for errors
- Heatmap overlay for congestion

---

*Last Updated: February 5, 2026*