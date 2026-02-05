from pydantic import BaseModel
from typing import List, Tuple

class WarehouseDimensions(BaseModel):
    width: float
    length: float
    height: float

class Warehouse(BaseModel):
    name: str
    dimensions: WarehouseDimensions
    zones: List[str] = []
    racks: List[dict] = []