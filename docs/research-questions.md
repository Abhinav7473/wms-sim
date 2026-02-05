# Research Questions

This document outlines the core research questions driving the WMS simulator design.

## Primary Questions

### 1. Operator Mental Models
**How does spatial representation affect an operator's mental model of warehouse state?**

- Does 3D visualization improve spatial understanding compared to 2D dashboards?
- Can operators accurately predict robot positions and task completion times?
- How does viewpoint (top-down vs. perspective) affect situation awareness?

**Measuring**:
- Task completion accuracy
- Verbal protocol analysis during failure scenarios
- Eye-tracking patterns (future work)

---

### 2. System State Visibility
**What system states are visible, inferred, or invisible to the operator?**

**Visible States**:
- Robot position (x, y, z coordinates)
- Current status (idle, moving, picking, error)
- Battery level
- Active task ID

**Inferred States**:
- Robot intent (where is it going?)
- System congestion (why is this taking longer?)
- Task priority (which robot is more important?)

**Invisible States** (by design):
- Internal pathfinding decisions
- Network latency
- Sensor accuracy/confidence
- Queue depth

**Experiments**:
- Hide different state variables and measure operator response time
- Introduce "silent failures" where visible state is wrong
- Compare operator performance with/without inferred state hints

---

### 3. Breakdown Detection & Recovery
**When something goes wrong, how quickly can the operator notice, understand, and recover?**

**Failure Scenarios**:
1. **Silent position drift**: Robot reports wrong position, but status shows "idle"
2. **Task starvation**: Robot waiting for task assignment, no visual indicator
3. **Path conflict**: Two robots heading to same location
4. **Sensor failure**: ArUco marker lost, position stops updating
5. **Network delay**: Position updates lag by 10-30 seconds

**Metrics**:
- Time to first intervention (TTFI)
- Correct diagnosis rate
- Recovery strategy chosen
- False alarm rate

---

### 4. Trust & Automation
**How do delays, noise, or misalignment affect operator trust and decision-making?**

**Variables**:
- Update frequency (1s, 2s, 5s, 10s intervals)
- Position noise (±0.1m, ±0.5m, ±1.0m)
- Status accuracy (5%, 10%, 20% false states)

**Hypotheses**:
- H1: Operators will ignore automation when update delays exceed 5 seconds
- H2: High position noise reduces intervention confidence
- H3: Operators develop compensation strategies (manual position checking)

**Studies**:
- Trust calibration experiments
- Automation reliance vs. manual override frequency
- Subjective workload assessment (NASA-TLX)

---

## Secondary Questions

### Information Density
- At what robot count does the 3D view become overwhelming?
- Does color-coding (by status) improve or hinder performance?
- Should robot IDs always be visible, or only on hover?

### Notification Design
- Should alerts interrupt the 3D view or stay in sidebar?
- How should severity be encoded (color, sound, position)?
- What is the optimal alert delay for different failure types?

### Spatial Navigation
- Do operators prefer free orbit or fixed camera positions?
- How often do operators need top-down vs. perspective views?
- Does camera automation (auto-follow robot) help or confuse?

---

## Open Questions (To Explore)

1. **Occlusion**: When robots are hidden behind racks, how do operators track them?
2. **Predictive Display**: Should the UI show *where robots will be* in 5 seconds?
3. **Historical Trails**: Do path history lines improve or clutter the view?
4. **Collaborative Awareness**: In multi-operator scenarios, how is workspace shared?

---

## Methodology Notes

- **Pilot Study**: 5-10 participants, think-aloud protocol
- **Controlled Experiment**: 20+ participants, randomized failure scenarios
- **Longitudinal**: Track operator strategies over 4-6 weeks of use

**Ethical Considerations**:
- Informed consent for observation
- No production pressure (research environment only)
- Debriefing after failure scenarios

---

## Related Work

- Endsley, M. R. (1995). *Toward a theory of situation awareness in dynamic systems*
- Lee, J. D., & See, K. A. (2004). *Trust in automation*
- Woods, D. D. (2016). *The theory of graceful extensibility*
- Norman, D. A. (2013). *The Design of Everyday Things*

---

*Last Updated: February 2026*