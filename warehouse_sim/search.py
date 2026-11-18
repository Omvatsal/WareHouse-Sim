from __future__ import annotations

import heapq
import itertools
from collections import deque
from time import perf_counter

from .models import Position, SearchResult, Warehouse


def manhattan(a: Position, b: Position) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def _path(parent: dict[Position, Position | None], goal: Position) -> list[Position]:
    result = []
    current: Position | None = goal
    while current is not None:
        result.append(current)
        current = parent[current]
    return list(reversed(result))


def _serialise_event(step: int, current: Position, frontier, considered, scores=None) -> dict:
    return {
        "step": step,
        "current": list(current),
        "frontier": [list(position) for position in frontier],
        "considered": [list(position) for position in considered],
        "scores": scores or [],
    }


def search(
    warehouse: Warehouse,
    algorithm: str,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    algorithm = algorithm.lower()
    if algorithm not in {"bfs", "dfs", "greedy", "astar"}:
        raise ValueError(f"Unknown algorithm: {algorithm}")

    started = perf_counter()
    origin = start or warehouse.start
    destination = goal or warehouse.goal
    blocked = blocked or set()
    parent: dict[Position, Position | None] = {origin: None}
    best_cost: dict[Position, int] = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    counter = itertools.count()

    if algorithm == "bfs":
        frontier = deque([origin])
    elif algorithm == "dfs":
        frontier = [origin]
    else:
        frontier = []
        initial_priority = manhattan(origin, destination)
        heapq.heappush(frontier, (initial_priority, next(counter), origin))

    while frontier:
        if algorithm == "bfs":
            current = frontier.popleft()
        elif algorithm == "dfs":
            current = frontier.pop()
        else:
            _, _, current = heapq.heappop(frontier)

        if current in expanded:
            continue
        expanded.add(current)
        if current == destination:
            path = _path(parent, destination)
            elapsed = (perf_counter() - started) * 1000
            return SearchResult(algorithm, True, path, best_cost[destination], len(expanded), elapsed, trace)

        considered = []
        score_rows = []
        neighbors = warehouse.neighbors(current, blocked)
        if algorithm == "dfs":
            neighbors = list(reversed(neighbors))
        for neighbor in neighbors:
            new_cost = best_cost[current] + warehouse.move_cost(neighbor)
            unseen = neighbor not in parent
            improved = new_cost < best_cost.get(neighbor, 10**9)
            if (algorithm in {"bfs", "dfs"} and unseen) or (algorithm in {"greedy", "astar"} and improved):
                parent[neighbor] = current
                best_cost[neighbor] = new_cost
                considered.append(neighbor)
                heuristic = manhattan(neighbor, destination)
                priority = heuristic if algorithm == "greedy" else new_cost + heuristic
                score_rows.append({
                    "cell": list(neighbor), "g": new_cost, "h": heuristic,
                    "f": priority if algorithm == "astar" else None,
                })
                if algorithm == "bfs":
                    frontier.append(neighbor)
                elif algorithm == "dfs":
                    frontier.append(neighbor)
                else:
                    heapq.heappush(frontier, (priority, next(counter), neighbor))

        frontier_positions = (
            [entry[2] for entry in frontier]
            if algorithm in {"greedy", "astar"}
            else list(frontier)
        )
        trace.append(_serialise_event(len(trace), current, frontier_positions, considered, score_rows))

    elapsed = (perf_counter() - started) * 1000
    return SearchResult(algorithm, False, [], 0, len(expanded), elapsed, trace)
