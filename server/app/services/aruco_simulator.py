import random
from typing import Dict, Tuple

def simulate_aruco_detection(robot_id: str, 
                             true_position: Tuple[float, float, float],
                             noise_level: float = 0.1) -> Dict:
    """
    Simulate ArUco marker detection with optional noise
    
    Args:
        robot_id: Robot identifier
        true_position: Actual robot position
        noise_level: Amount of simulated sensor noise
    
    Returns:
        Detection result with position and confidence
    """
    # Add random noise to simulate real sensor
    detected_position = (
        true_position[0] + random.uniform(-noise_level, noise_level),
        true_position[1] + random.uniform(-noise_level, noise_level),
        true_position[2] + random.uniform(-noise_level, noise_level)
    )
    
    return {
        "robot_id": robot_id,
        "detected_position": detected_position,
        "confidence": random.uniform(0.85, 0.99),
        "marker_visible": True
    }