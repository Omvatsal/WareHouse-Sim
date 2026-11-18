from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

Position = tuple[int, int]
Terrain = Literal["normal", "crowded", "shelf", "restricted"]


@dataclass(frozen=True)
class Warehouse:
    rows: int
    cols: int
    start: Position
    goal: Position
    terrain: dict[Position, Terrain]
    trolley: Position

    def cell(self, position: Position) -> Terrain:
        return self.terrain.get(position, "normal")

    def is_open(self, position: Position, blocked: set[Position] | None = None) -> bool:
        row, col = position
        return (
            0 <= row < self.rows
            and 0 <= col < self.cols
            and self.cell(position) not in {"shelf", "restricted"}
            and position not in (blocked or set())
        )

    def neighbors(self, position: Position, blocked: set[Position] | None = None) -> list[Position]:
        row, col = position
        # Stable ordering makes classroom comparisons reproducible.
        candidates = [(row - 1, col), (row, col + 1), (row + 1, col), (row, col - 1)]
        return [candidate for candidate in candidates if self.is_open(candidate, blocked)]

    def move_cost(self, position: Position) -> int:
        return 4 if self.cell(position) == "crowded" else 1


@dataclass
class SearchResult:
    algorithm: str
    reached: bool
    path: list[Position]
    total_cost: int
    nodes_expanded: int
    elapsed_ms: float
    trace: list[dict]

    @property
    def moves(self) -> int:
        return max(0, len(self.path) - 1) if self.reached else 0

    def as_dict(self) -> dict:
        return {
            "algorithm": self.algorithm,
            "reached": self.reached,
            "path": [list(position) for position in self.path],
            "moves": self.moves,
            "totalCost": self.total_cost,
            "nodesExpanded": self.nodes_expanded,
            "elapsedMs": round(self.elapsed_ms, 4),
            "trace": self.trace,
        }
