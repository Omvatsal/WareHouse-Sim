from __future__ import annotations

from .models import SearchResult
from .models import Warehouse
from .scenario import classroom_warehouse, random_warehouse
from .search import manhattan, search

_active_warehouse: Warehouse = classroom_warehouse()


def set_random_scenario(seed: int | None = None) -> dict:
    global _active_warehouse
    _active_warehouse = random_warehouse(seed)
    return scenario_payload()


def scenario_payload() -> dict:
    warehouse = _active_warehouse
    cells = []
    for row in range(warehouse.rows):
        for col in range(warehouse.cols):
            cells.append({"position": [row, col], "terrain": warehouse.cell((row, col))})
    return {
        "rows": warehouse.rows,
        "cols": warehouse.cols,
        "start": list(warehouse.start),
        "goal": list(warehouse.goal),
        "trolley": list(warehouse.trolley),
        "cells": cells,
        "costs": {"normal": 1, "crowded": 4},
        "heuristic": {
            "name": "Manhattan distance",
            "explanation": "With only four-directional movement and a minimum step cost of 1, Manhattan distance never overestimates the remaining cost, so it is an admissible lower bound.",
        },
    }


def run_algorithm(name: str) -> dict:
    return search(_active_warehouse, name).as_dict()


def run_all() -> dict:
    algorithms = ["bfs", "dfs", "greedy", "astar"]
    results = [run_algorithm(name) for name in algorithms]
    trolley_data = run_trolley_experiment()
    results.append({
        "algorithm": "astar_replan",
        "reached": trolley_data["goalReached"],
        "path": trolley_data["combinedPath"],
        "moves": trolley_data["moves"],
        "totalCost": trolley_data["totalCost"],
        "nodesExpanded": trolley_data["nodesExpanded"],
        "elapsedMs": round(trolley_data["original"]["elapsedMs"] + trolley_data["revised"]["elapsedMs"], 4),
        "replans": trolley_data["replans"],
        "trolley": trolley_data["trolley"],
        "detectedAt": trolley_data["detectedAt"],
    })
    return {"results": results, "trolley": trolley_data}


def run_trolley_experiment() -> dict:
    warehouse = _active_warehouse
    original = search(warehouse, "astar")
    if not original.reached or len(original.path) < 2:
        return {
            "original": original.as_dict(),
            "travelled": [list(warehouse.start)],
            "detectedAt": list(warehouse.start),
            "trolley": list(warehouse.trolley),
            "revised": SearchResult("astar", False, [], 0, 0, 0.0, []).as_dict(),
            "combinedPath": [],
            "goalReached": False,
            "replans": 0,
            "moves": 0,
            "totalCost": 0,
            "nodesExpanded": original.nodes_expanded,
            "distanceToBlockedCell": manhattan(warehouse.start, warehouse.trolley),
        }

    travelled = [warehouse.start]
    detection_index = None
    current = warehouse.start

    for index, next_position in enumerate(original.path[1:], start=1):
        if next_position == warehouse.trolley:
            detection_index = index
            break
        travelled.append(next_position)
        current = next_position

    # If scenario changes make the trolley miss the route, place it at the route midpoint.
    trolley = warehouse.trolley
    if detection_index is None and len(original.path) > 2:
        detection_index = len(original.path) // 2
        trolley = original.path[detection_index]
        travelled = original.path[:detection_index]
        current = travelled[-1]

    revised = search(warehouse, "astar", start=current, blocked={trolley})
    combined = travelled + revised.path[1:] if revised.reached else travelled
    total_cost = sum(warehouse.move_cost(tuple(position)) for position in combined[1:]) if combined else 0
    return {
        "original": original.as_dict(),
        "travelled": [list(position) for position in travelled],
        "detectedAt": list(current),
        "trolley": list(trolley),
        "revised": revised.as_dict(),
        "combinedPath": [list(position) for position in combined],
        "goalReached": revised.reached,
        "replans": 1 if revised.reached else 0,
        "moves": max(0, len(combined) - 1),
        "totalCost": total_cost,
        "nodesExpanded": original.nodes_expanded + revised.nodes_expanded,
        "distanceToBlockedCell": manhattan(current, trolley),
    }
