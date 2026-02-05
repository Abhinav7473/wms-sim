-- Warehouse Management System Database Schema

-- Warehouses table
CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    width FLOAT NOT NULL,
    length FLOAT NOT NULL,
    height FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Zones table
CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    warehouse_id INTEGER REFERENCES warehouses(id),
    name VARCHAR(100) NOT NULL,
    zone_type VARCHAR(50) NOT NULL, -- 'receiving', 'storage', 'picking', 'shipping'
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    size_width FLOAT NOT NULL,
    size_length FLOAT NOT NULL,
    color VARCHAR(7) DEFAULT '#ffffff'
);

-- Storage racks table
CREATE TABLE storage_racks (
    id SERIAL PRIMARY KEY,
    warehouse_id INTEGER REFERENCES warehouses(id),
    zone_id INTEGER REFERENCES zones(id),
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    position_z FLOAT NOT NULL,
    width FLOAT NOT NULL,
    height FLOAT NOT NULL,
    depth FLOAT NOT NULL,
    capacity INTEGER DEFAULT 100
);

-- Robots table
CREATE TABLE robots (
    id VARCHAR(10) PRIMARY KEY,
    warehouse_id INTEGER REFERENCES warehouses(id),
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    position_z FLOAT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('idle', 'moving', 'picking', 'error')),
    battery_level FLOAT NOT NULL CHECK (battery_level >= 0 AND battery_level <= 100),
    current_task_id VARCHAR(50),
    aruco_marker_id INTEGER UNIQUE NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id VARCHAR(50) PRIMARY KEY,
    robot_id VARCHAR(10) REFERENCES robots(id),
    task_type VARCHAR(50) NOT NULL, -- 'pick', 'place', 'transport'
    priority INTEGER DEFAULT 1,
    start_position_x FLOAT,
    start_position_y FLOAT,
    start_position_z FLOAT,
    end_position_x FLOAT,
    end_position_y FLOAT,
    end_position_z FLOAT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Path history (for optimization analysis)
CREATE TABLE path_history (
    id SERIAL PRIMARY KEY,
    robot_id VARCHAR(10) REFERENCES robots(id),
    task_id VARCHAR(50) REFERENCES tasks(id),
    planned_distance FLOAT NOT NULL,
    actual_distance FLOAT,
    planned_time FLOAT NOT NULL,
    actual_time FLOAT,
    optimization_percentage FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ArUco marker detections (for tracking accuracy)
CREATE TABLE aruco_detections (
    id SERIAL PRIMARY KEY,
    robot_id VARCHAR(10) REFERENCES robots(id),
    marker_id INTEGER NOT NULL,
    detected_position_x FLOAT NOT NULL,
    detected_position_y FLOAT NOT NULL,
    detected_position_z FLOAT NOT NULL,
    confidence FLOAT NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_robots_status ON robots(status);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_robot ON tasks(robot_id);
CREATE INDEX idx_aruco_detections_robot ON aruco_detections(robot_id);
CREATE INDEX idx_aruco_detections_timestamp ON aruco_detections(timestamp);