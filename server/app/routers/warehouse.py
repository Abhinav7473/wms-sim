from fastapi import APIRouter
from typing import Dict, Any
import json
from pathlib import Path

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "warehouse_layout.json"

def load_warehouse() -> Dict[str, Any]:
    try:
        with open(DATA_PATH, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            "name": "Main Warehouse",
            "dimensions": {"width": 50, "length": 50, "height": 10},
            "zones": [],
            "racks": []
        }

@router.get("/layout")
def get_warehouse_layout():
    """Get complete warehouse layout"""
    return load_warehouse()

@router.get("/status")
def get_warehouse_status():
    """Get warehouse operational status"""
    return {
        "operational": True,
        "active_robots": 4,
        "total_capacity": 10000,
        "current_utilization": 0.72
    }