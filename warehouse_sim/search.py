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


def _result(
    algorithm: str,
    started: float,
    parent: dict[Position, Position | None],
    destination: Position,
    best_cost: dict[Position, int],
    expanded: set[Position],
    trace: list[dict],
    reached: bool,
) -> SearchResult:
    elapsed = (perf_counter() - started) * 1000
    path = _path(parent, destination) if reached else []
    return SearchResult(
        algorithm,
        reached,
        path,
        best_cost[destination] if reached else 0,
        len(expanded),
        elapsed,
        trace,
    )


def _expand_unweighted(
    warehouse: Warehouse,
    current: Position,
    frontier,
    parent: dict[Position, Position | None],
    best_cost: dict[Position, int],
    expanded: set[Position],
    trace: list[dict],
    algorithm: str,
    blocked: set[Position] | None = None,
) -> None:
    """Expand one BFS/DFS node and append its visualisation event."""
    expanded.add(current)
    considered = []
    neighbors = warehouse.neighbors(current, blocked)
    if algorithm == "dfs":
        neighbors = list(reversed(neighbors))
    for neighbor in neighbors:
        if neighbor in parent:
            continue
        parent[neighbor] = current
        best_cost[neighbor] = best_cost[current] + warehouse.move_cost(neighbor)
        considered.append(neighbor)
        frontier.append(neighbor)
    trace.append(_serialise_event(len(trace), current, list(frontier), considered))


def bfs_search(warehouse: Warehouse, start: Position | None = None, goal: Position | None = None, blocked: set[Position] | None = None) -> SearchResult:
    """Breadth-first search: FIFO frontier, optimal number of moves."""
    started = perf_counter()
    origin, destination = start or warehouse.start, goal or warehouse.goal
    frontier = deque([origin])
    parent = {origin: None}
    best_cost = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    while frontier:
        current = frontier.popleft()
        if current in expanded:
            continue
        if current == destination:
            return _result("bfs", started, parent, destination, best_cost, expanded, trace, True)
        _expand_unweighted(warehouse, current, frontier, parent, best_cost, expanded, trace, "bfs", blocked)
    return _result("bfs", started, parent, destination, best_cost, expanded, trace, False)


def dfs_search(warehouse: Warehouse, start: Position | None = None, goal: Position | None = None, blocked: set[Position] | None = None) -> SearchResult:
    """Depth-first search: LIFO frontier, useful for deep exploration."""
    started = perf_counter()
    origin, destination = start or warehouse.start, goal or warehouse.goal
    frontier = [origin]
    parent = {origin: None}
    best_cost = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    while frontier:
        current = frontier.pop()
        if current in expanded:
            continue
        if current == destination:
            return _result("dfs", started, parent, destination, best_cost, expanded, trace, True)
        _expand_unweighted(warehouse, current, frontier, parent, best_cost, expanded, trace, "dfs", blocked)
    return _result("dfs", started, parent, destination, best_cost, expanded, trace, False)


def _informed_search(
    warehouse: Warehouse,
    algorithm: str,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Shared priority-queue mechanics for Greedy Best-First Search and A*."""
    started = perf_counter()
    origin, destination = start or warehouse.start, goal or warehouse.goal
    blocked = blocked or set()
    frontier = []
    counter = itertools.count()
    heapq.heappush(frontier, (manhattan(origin, destination), next(counter), origin))
    parent = {origin: None}
    best_cost = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    while frontier:
        _, _, current = heapq.heappop(frontier)
        if current in expanded:
            continue
        expanded.add(current)
        if current == destination:
            return _result(algorithm, started, parent, destination, best_cost, expanded, trace, True)
        considered = []
        scores = []
        for neighbor in warehouse.neighbors(current, blocked):
            new_cost = best_cost[current] + warehouse.move_cost(neighbor)
            if new_cost >= best_cost.get(neighbor, 10**9):
                continue
            parent[neighbor] = current
            best_cost[neighbor] = new_cost
            heuristic = manhattan(neighbor, destination)
            priority = heuristic if algorithm == "greedy" else new_cost + heuristic
            considered.append(neighbor)
            scores.append({"cell": list(neighbor), "g": new_cost, "h": heuristic, "f": priority if algorithm == "astar" else None})
            heapq.heappush(frontier, (priority, next(counter), neighbor))
        trace.append(_serialise_event(len(trace), current, [entry[2] for entry in frontier], considered, scores))
    return _result(algorithm, started, parent, destination, best_cost, expanded, trace, False)


def greedy_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Greedy Best-First Search: prioritize h(n), the estimated distance to goal."""
    return _informed_search(warehouse, "greedy", start, goal, blocked)


def astar_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """A*: prioritize f(n) = g(n) + h(n), balancing cost-so-far and estimate."""
    return _informed_search(warehouse, "astar", start, goal, blocked)


def search(
    warehouse: Warehouse,
    algorithm: str,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Compatibility dispatcher used by the API and trolley experiment."""
    algorithm = algorithm.lower()
    functions = {
        "bfs": bfs_search,
        "dfs": dfs_search,
        "greedy": greedy_search,
        "astar": astar_search,
    }
    if algorithm not in functions:
        raise ValueError(f"Unknown algorithm: {algorithm}")
    return functions[algorithm](warehouse, start, goal, blocked)
