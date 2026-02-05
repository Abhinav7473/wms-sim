# Discarded Ideas

A record of design directions we explored but chose not to pursue — and why.

---

## 1. Starting with 2D Grid View

**Idea**: Build 2D top-down grid first, add 3D later.

**Why we considered it**:
- Simpler to implement (CSS grid)
- Easier to control layout precisely
- Familiar pattern (most WMS UIs are 2D)

**Why we discarded it**:
- Research question requires 3D spatial understanding
- 2D → 3D migration would require rewriting visualization entirely
- Three.js ecosystem mature enough to start there

**Lesson**: When the research question demands it, skip the "easier" path.

---

## 2. Automatic Camera Rotation

**Idea**: Camera slowly orbits the warehouse to show all angles automatically.

**Why we considered it**:
- "Demo mode" for presentations
- Ensures all areas get viewed
- Looks cool in screenshots

**Why we discarded it**:
- Operators need control over their viewpoint
- Auto-rotation causes motion sickness in some users
- Undermines research question about operator-chosen perspectives

**Lesson**: Research > aesthetics. What looks good in a video demo might break the study.

---

## 3. Voice Alerts for Errors

**Idea**: Text-to-speech announces "Robot R003 error" when failures occur.

**Why we considered it**:
- Multimodal feedback (visual + audio)
- Operators might be looking away from screen
- Common in industrial settings

**Why we discarded it**:
- Hard to control in lab environment (participants wearing headphones?)
- Volume/timing becomes another variable to control
- Audio can't be "replayed" like visual logs

**Future**: Could add as experimental condition, but not default.

---

## 4. Heatmap Overlay for Congestion

**Idea**: Color floor grid based on robot density (red=crowded, green=empty).

**Why we considered it**:
- Immediate visual summary of warehouse state
- Helps predict where delays will occur
- Common pattern in traffic visualization

**Why we discarded it**:
- Clutters 3D view with non-physical information
- Mixes "current state" with "inferred state"
- Unclear if operators trust derived metrics vs. raw positions

**Research Concern**: We want to study how operators *build* mental models, not give them pre-computed ones.

**Possible Future**: Add as a toggleable "expert mode" feature to compare performance.

---

## 5. WebSocket Real-time Streaming (Initially)

**Idea**: Use WebSockets for instant position updates instead of 2-second polling.

**Why we considered it**:
- Lower latency (sub-100ms updates)
- More "professional" architecture
- Aligns with resume claim of "real-time sync"

**Why we discarded it** (for now):
- Harder to inject delays for research purposes
- Polling interval is an experimental variable we want to control
- 2-second polling is "real-time enough" for warehouse operations

**Future**: Will add WebSocket as an option, but keep polling for research mode.

---

## 6. PathViz: Showing All Robot Paths Simultaneously

**Idea**: Draw colored lines showing planned path for every active robot.

**Why we considered it**:
- Makes pathfinding algorithm transparent
- Operators can predict congestion
- Looks impressive in demos

**Why we discarded it**:
- With 10+ robots, screen becomes spaghetti of overlapping lines
- Unclear which path belongs to which robot
- Hard to distinguish "planned" vs. "actual" path

**Better Approach**: Show path only for selected robot, or robots with tasks.

---

## 7. Minimap in Corner

**Idea**: Small 2D top-down view in corner showing full warehouse overview.

**Why we considered it**:
- Common pattern in games (helps orientation)
- Quick glance shows overall layout
- Useful when zoomed in on 3D view

**Why we discarded it**:
- Screen real estate cost
- Unclear which view operators would prioritize
- Splits attention between two representations

**Research Opportunity**: This could be a controlled variable — test performance with/without minimap.

---

## 8. Robot "Personalities" (Idle Animations)

**Idea**: Idle robots slowly rotate or bounce to show they're "alive."

**Why we considered it**:
- Makes static scene feel more dynamic
- Helps distinguish idle from frozen/crashed
- Emotional design (cute factor)

**Why we discarded it**:
- Undermines seriousness of research context
- Constant motion is distracting
- Unclear if it helps or hinders anomaly detection

**Lesson**: "Delight" features can backfire in high-stakes interfaces.

---

## 9. Gamification: Score for Optimized Picks

**Idea**: Show "efficiency score" that increases when operators make good decisions.

**Why we considered it**:
- Motivates engagement
- Common in training simulations
- Measurable outcome

**Why we discarded it**:
- Encourages optimizing the score, not understanding the system
- Real warehouse work isn't a game — creates wrong mental model
- Scores imply "right answer" when we want to study decision-making process

**Lesson**: Gamification works for training, not for open-ended research.

---

## 10. Blender Integration for Warehouse Layout

**Idea**: Design warehouse in Blender, export to Three.js.

**Why we considered it**:
- Professional 3D modeling tools
- High-quality assets (racks, shelves, forklifts)
- Realism

**Why we discarded it**:
- Realism not the goal — clarity is
- Blender exports add complexity (file size, format conversion)
- Harder for collaborators to modify layout

**Current Approach**: Procedurally generate simple geometry in code. Easy to parameterize, version-control, and modify.

---

## 11. PostgreSQL Database (Initially)

**Idea**: Use PostgreSQL for robot state, tasks, and logs.

**Why we considered it**:
- "Proper" architecture
- Resume says PostgreSQL
- Scalable

**Why we discarded it** (for now):
- JSON files are easier to version-control (see exact state in git)
- Hand-crafting failure scenarios is simpler
- No database setup friction for collaborators

**Resume Justification**: Schema is defined in `database/schema.sql` — shows SQL knowledge even if not actively used yet.

---

*Last Updated: February 5, 2026*