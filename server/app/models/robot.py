from pydantic import BaseModel
from typing import Tuple, Optional
from enum import Enum

class RobotStatus(str, Enum):
    IDLE = "idle"
    MOVING = "moving"
    PICKING = "picking"
    ERROR = "error"

class Robot(BaseModel):
    id: str
    position: Tuple[float, float, float]
    status: RobotStatus
    battery: float
    current_task: Optional[str] = None
    aruco_marker_id: int

class TaskAssignment(BaseModel):
    task_id: str
    priority: int = 1
    destination: Optional[Tuple[float, float, float]] = None