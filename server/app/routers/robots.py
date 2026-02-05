from fastapi import APIRouter, HTTPException
from typing import List
from app.models.robot import Robot, RobotStatus, TaskAssignment
import json
from pathlib import Path
import random
import time

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "robots.json"

def load_robots() -> List[dict]:
    with open(DATA_PATH, "r") as f:
        return json.load(f)

def save_robots(robots: List[dict]):
    with open(DATA_PATH, "w") as f:
        json.dump(robots, f, indent=2)

@router.get("/", response_model=List[Robot])
def get_all_robots():
    """Get all robots with their current positions and status"""
    return load_robots()

@router.get("/{robot_id}", response_model=Robot)
def get_robot(robot_id: str):
    """Get specific robot details"""
    robots = load_robots()
    robot = next((r for r in robots if r["id"] == robot_id), None)
    if not robot:
        raise HTTPException(status_code=404, detail=f"Robot {robot_id} not found")
    return robot

@router.post("/{robot_id}/task")
def assign_task(robot_id: str, task: TaskAssignment):
    """Assign task to robot"""
    robots = load_robots()
    robot = next((r for r in robots if r["id"] == robot_id), None)
    if not robot:
        raise HTTPException(status_code=404, detail=f"Robot {robot_id} not found")
    
    robot["status"] = "moving"
    robot["current_task"] = task.task_id
    save_robots(robots)
    
    return {"status": "assigned", "robot_id": robot_id, "task": task.dict()}

@router.put("/{robot_id}/position")
def update_robot_position(robot_id: str, position: List[float]):
    """Update robot position (simulates ArUco tracking)"""
    if len(position) != 3:
        raise HTTPException(status_code=400, detail="Position must be [x, y, z]")
    
    robots = load_robots()
    robot = next((r for r in robots if r["id"] == robot_id), None)
    if not robot:
        raise HTTPException(status_code=404, detail=f"Robot {robot_id} not found")
    
    robot["position"] = position
    save_robots(robots)
    return {"status": "updated", "robot_id": robot_id, "position": position}

@router.get("/simulate-movement")
def simulate_robot_movement():
    """Simulate robots moving between zones"""
    robots = load_robots()
    
    for robot in robots:
        if robot["status"] == "moving":
            # Gradually move toward storage center (0, 0, 0)
            robot["position"][0] += random.uniform(-0.5, 0.5)
            robot["position"][2] += random.uniform(-0.5, 0.5)
            
            # Random chance to complete task
            if random.random() < 0.1:
                robot["status"] = "picking"
                robot["position"] = [0, 0, 0]  # Arrived at storage
    
    save_robots(robots)
    return {"status": "updated", "robots": robots}