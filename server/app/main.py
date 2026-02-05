from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import warehouse, robots, pathfinding

app = FastAPI(
    title="WMS Digital Twin API",
    description="Real-time warehouse management with 3D visualization and ArUco tracking",
    version="1.0.0"
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(warehouse.router, prefix="/api/warehouse", tags=["warehouse"])
app.include_router(robots.router, prefix="/api/robots", tags=["robots"])
app.include_router(pathfinding.router, prefix="/api/pathfinding", tags=["pathfinding"])

@app.get("/")
def root():
    return {"message": "WMS Digital Twin API - See /docs for Swagger UI"}