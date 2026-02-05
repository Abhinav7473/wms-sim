-- Seed data for WMS Digital Twin

-- Insert warehouse
INSERT INTO warehouses (name, width, length, height) VALUES
('Main Distribution Center', 50, 50, 10);

-- Insert zones
INSERT INTO zones (warehouse_id, name, zone_type, position_x, position_y, size_width, size_length, color) VALUES
(1, 'Receiving Area', 'receiving', -15, 0, 10, 20, '#ff4444'),
(1, 'Storage Area', 'storage', 0, 0, 20, 30, '#4444ff'),
(1, 'Picking Area', 'picking', 15, 5, 10, 15, '#44ff44'),
(1, 'Shipping Area', 'shipping', 15, -10, 10, 10, '#ffaa00');

-- Insert storage racks
INSERT INTO storage_racks (warehouse_id, zone_id, position_x, position_y, position_z, width, height, depth, capacity) VALUES
-- Left column
(1, 2, -7, 1.5, -10, 3, 3, 0.5, 120),
(1, 2, -7, 1.5, -5, 3, 3, 0.5, 120),
(1, 2, -7, 1.5, 0, 3, 3, 0.5, 120),
(1, 2, -7, 1.5, 5, 3, 3, 0.5, 120),
-- Center column
(1, 2, 0, 1.5, -10, 3, 3, 0.5, 120),
(1, 2, 0, 1.5, -5, 3, 3, 0.5, 120),
(1, 2, 0, 1.5, 5, 3, 3, 0.5, 120),
(1, 2, 0, 1.5, 10, 3, 3, 0.5, 120),
-- Right column
(1, 2, 7, 1.5, -10, 3, 3, 0.5, 120),
(1, 2, 7, 1.5, -5, 3, 3, 0.5, 120),
(1, 2, 7, 1.5, 0, 3, 3, 0.5, 120),
(1, 2, 7, 1.5, 5, 3, 3, 0.5, 120);

-- Insert robots
INSERT INTO robots (id, warehouse_id, position_x, position_y, position_z, status, battery_level, current_task_id, aruco_marker_id) VALUES
('R001', 1, -18.0, 0.0, 5.0, 'idle', 85.0, NULL, 1),
('R002', 1, -10.0, 0.0, 0.0, 'moving', 72.0, 'PICK-A123', 2),
('R003', 1, 12.0, 0.0, 8.0, 'picking', 91.0, 'PICK-B456', 3),
('R004', 1, 18.0, 0.0, -12.0, 'idle', 100.0, NULL, 4);

-- Insert sample tasks
INSERT INTO tasks (id, robot_id, task_type, priority, start_position_x, start_position_y, start_position_z, end_position_x, end_position_y, end_position_z, status) VALUES
('PICK-A123', 'R002', 'pick', 1, -10.0, 0.0, 0.0, 0.0, 0.0, -5.0, 'in_progress'),
('PICK-B456', 'R003', 'pick', 2, 12.0, 0.0, 8.0, 7.0, 0.0, 5.0, 'in_progress');