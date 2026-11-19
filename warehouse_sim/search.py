from __future__ import annotations

import heapq
import itertools
from collections import deque
from time import perf_counter

from .models import Position, SearchResult, Warehouse


def manhattan(a: Position, b: Position) -> int:
    """Admissible Manhattan distance heuristic (L1 norm).

    On a 4-directional grid with minimum step cost c_min = 1:
    h(n) = |row_a - row_b| + |col_a - col_b| <= true remaining travel cost.
    """
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def _path(parent: dict[Position, Position | None], goal: Position) -> list[Position]:
    """Reconstruct path backwards from destination to origin."""
    result = []
    current: Position | None = goal
    while current is not None:
        result.append(current)
        current = parent.get(current)
    return list(reversed(result))


def _serialise_event(
    step: int,
    current: Position,
    frontier: list[Position],
    considered: list[Position],
    scores: list[dict] | None = None,
) -> dict:
    """Format single search step decision event for visualization."""
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
    warehouse: Warehouse,
    expanded: set[Position],
    trace: list[dict],
    reached: bool,
) -> SearchResult:
    """Package search metrics and path into SearchResult dataclass."""
    elapsed = (perf_counter() - started) * 1000
    path = _path(parent, destination) if reached else []
    total_cost = sum(warehouse.move_cost(pos) for pos in path[1:]) if reached else 0
    return SearchResult(
        algorithm=algorithm,
        reached=reached,
        path=path,
        total_cost=total_cost,
        nodes_expanded=len(expanded),
        elapsed_ms=elapsed,
        trace=trace,
    )


def bfs_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Breadth-First Search (BFS): FIFO frontier.

    Guarantees shortest path in number of moves (unweighted hop count).
    Uses canonical AIMA early goal test upon neighbor generation.
    """
    started = perf_counter()
    origin = start or warehouse.start
    destination = goal or warehouse.goal
    blocked = blocked or set()

    if origin == destination:
        return SearchResult("bfs", True, [origin], 0, 0, (perf_counter() - started) * 1000, [])

    frontier: deque[Position] = deque([origin])
    reached: set[Position] = {origin}
    parent: dict[Position, Position | None] = {origin: None}
    expanded: set[Position] = set()
    trace: list[dict] = []
    goal_found = False

    while frontier and not goal_found:
        current = frontier.popleft()
        expanded.add(current)
        considered: list[Position] = []

        for neighbor in warehouse.neighbors(current, blocked):
            if neighbor not in reached:
                reached.add(neighbor)
                parent[neighbor] = current
                considered.append(neighbor)
                frontier.append(neighbor)

                if neighbor == destination:
                    goal_found = True
                    expanded.add(neighbor)
                    trace.append(_serialise_event(len(trace), current, list(frontier), considered))
                    break

        if not goal_found:
            trace.append(_serialise_event(len(trace), current, list(frontier), considered))

    return _result("bfs", started, parent, destination, warehouse, expanded, trace, goal_found)


def dfs_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Depth-First Search (DFS): LIFO stack frontier.

    Explores deep along active branch before backtracking.
    Tracks parent pointers along stack transitions to avoid stale cross-branch pointers.
    Shows classic wandering, non-optimal behavior characteristic of unguided DFS.
    """
    started = perf_counter()
    origin = start or warehouse.start
    destination = goal or warehouse.goal
    blocked = blocked or set()

    if origin == destination:
        return SearchResult("dfs", True, [origin], 0, 0, (perf_counter() - started) * 1000, [])

    # Stack holds tuples of (state, parent_state)
    frontier: list[tuple[Position, Position | None]] = [(origin, None)]
    parent: dict[Position, Position | None] = {}
    expanded: set[Position] = set()
    trace: list[dict] = []
    goal_found = False

    while frontier:
        current, p = frontier.pop()
        if current in expanded:
            continue

        expanded.add(current)
        parent[current] = p

        if current == destination:
            goal_found = True
            trace.append(_serialise_event(len(trace), current, [item[0] for item in frontier], []))
            break

        considered: list[Position] = []
        # Reversing candidate order so Up, Right, Down, Left pop in natural priority order
        neighbors = list(reversed(warehouse.neighbors(current, blocked)))
        for neighbor in neighbors:
            if neighbor not in expanded:
                considered.append(neighbor)
                frontier.append((neighbor, current))

        trace.append(_serialise_event(len(trace), current, [item[0] for item in frontier], considered))

    return _result("dfs", started, parent, destination, warehouse, expanded, trace, goal_found)


def greedy_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Greedy Best-First Search: priority queue ordered strictly by h(n).

    Heuristic: h(n) = Manhattan distance to destination.
    Ignores step cost g(n) during node selection, aggressively pulling toward goal.
    """
    started = perf_counter()
    origin = start or warehouse.start
    destination = goal or warehouse.goal
    blocked = blocked or set()

    if origin == destination:
        return SearchResult("greedy", True, [origin], 0, 0, (perf_counter() - started) * 1000, [])

    counter = itertools.count()
    h0 = manhattan(origin, destination)
    frontier: list[tuple[int, int, Position]] = []
    heapq.heappush(frontier, (h0, next(counter), origin))

    parent: dict[Position, Position | None] = {origin: None}
    g_score: dict[Position, int] = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    goal_found = False

    while frontier:
        _, _, current = heapq.heappop(frontier)
        if current in expanded:
            continue

        expanded.add(current)

        if current == destination:
            goal_found = True
            trace.append(_serialise_event(len(trace), current, [item[2] for item in frontier], []))
            break

        considered: list[Position] = []
        scores: list[dict] = []

        for neighbor in warehouse.neighbors(current, blocked):
            if neighbor not in expanded and neighbor not in parent:
                parent[neighbor] = current
                g_score[neighbor] = g_score[current] + warehouse.move_cost(neighbor)
                h = manhattan(neighbor, destination)
                considered.append(neighbor)
                scores.append({"cell": list(neighbor), "g": g_score[neighbor], "h": h, "f": None})
                heapq.heappush(frontier, (h, next(counter), neighbor))

        trace.append(_serialise_event(len(trace), current, [item[2] for item in frontier], considered, scores))

    return _result("greedy", started, parent, destination, warehouse, expanded, trace, goal_found)


def astar_search(
    warehouse: Warehouse,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """A* Search: priority queue ordered by f(n) = g(n) + h(n).

    Guarantees cost-optimal route when h(n) is admissible and consistent.
    Tie-breaking prefers smaller h(n) (closer to goal) for maximum efficiency.
    """
    started = perf_counter()
    origin = start or warehouse.start
    destination = goal or warehouse.goal
    blocked = blocked or set()

    if origin == destination:
        return SearchResult("astar", True, [origin], 0, 0, (perf_counter() - started) * 1000, [])

    counter = itertools.count()
    h0 = manhattan(origin, destination)
    # Heap tuple: (f, h, counter, position)
    frontier: list[tuple[int, int, int, Position]] = []
    heapq.heappush(frontier, (h0, h0, next(counter), origin))

    parent: dict[Position, Position | None] = {origin: None}
    g_score: dict[Position, int] = {origin: 0}
    expanded: set[Position] = set()
    trace: list[dict] = []
    goal_found = False

    while frontier:
        f, h, _, current = heapq.heappop(frontier)
        if current in expanded:
            continue

        expanded.add(current)

        if current == destination:
            goal_found = True
            trace.append(_serialise_event(len(trace), current, [item[3] for item in frontier], []))
            break

        considered: list[Position] = []
        scores: list[dict] = []

        for neighbor in warehouse.neighbors(current, blocked):
            tentative_g = g_score[current] + warehouse.move_cost(neighbor)
            if tentative_g < g_score.get(neighbor, float("inf")):
                g_score[neighbor] = tentative_g
                parent[neighbor] = current
                h_val = manhattan(neighbor, destination)
                f_val = tentative_g + h_val
                considered.append(neighbor)
                scores.append({"cell": list(neighbor), "g": tentative_g, "h": h_val, "f": f_val})
                heapq.heappush(frontier, (f_val, h_val, next(counter), neighbor))

        trace.append(_serialise_event(len(trace), current, [item[3] for item in frontier], considered, scores))

    return _result("astar", started, parent, destination, warehouse, expanded, trace, goal_found)


def search(
    warehouse: Warehouse,
    algorithm: str,
    start: Position | None = None,
    goal: Position | None = None,
    blocked: set[Position] | None = None,
) -> SearchResult:
    """Algorithm dispatcher for warehouse route planning."""
    algorithm = algorithm.lower()
    functions = {
        "bfs": bfs_search,
        "dfs": dfs_search,
        "greedy": greedy_search,
        "astar": astar_search,
    }
    if algorithm not in functions:
        raise ValueError(f"Unknown algorithm: {algorithm}. Must be one of {list(functions.keys())}")
    return functions[algorithm](warehouse, start, goal, blocked)
