from random import Random

from .models import Warehouse


def classroom_warehouse() -> Warehouse:
    """Map with a short crowded aisle and longer low-cost bypasses.

    The direct centre aisle takes 11 moves but crosses ten crowded cells.
    Either outer bypass takes 15 normal-cost moves. This makes the PDF's
    shortest-route versus lowest-cost comparison unambiguous.
    """
    # Shelf banks enclose the centre aisle. Columns 1 and 12 remain open so
    # both the upper and lower bypass stay reachable.
    shelves = (
        {(3, column) for column in range(2, 12)}
        | {(5, column) for column in range(2, 12)}
        | {(1, 3), (1, 4), (1, 9), (1, 10)}
        | {(7, 3), (7, 4), (7, 9), (7, 10)}
    )
    restricted = {(8, 5), (8, 6), (8, 7), (8, 8)}
    # Crowded cells are traversable, but entering one costs 4 instead of 1.
    crowded = {(4, column) for column in range(2, 12)}
    terrain = {position: "shelf" for position in shelves}
    terrain.update({position: "restricted" for position in restricted})
    terrain.update({position: "crowded" for position in crowded})
    return Warehouse(
        rows=10,
        cols=14,
        start=(4, 1),
        goal=(4, 12),
        terrain=terrain,
        trolley=(2, 7),
    )


def random_warehouse(seed: int | None = None) -> Warehouse:
    """Generate a complete new warehouse map, including size, endpoints and terrain.

    A randomized walk is carved after terrain generation so every grid remains solvable.
    """
    rng = Random(seed)
    rows, cols = rng.randint(8, 13), rng.randint(11, 17)
    start = (rng.randrange(rows), 0)
    goal = (rng.randrange(rows), cols - 1)
    terrain: dict[tuple[int, int], str] = {}
    for row in range(rows):
        for column in range(cols):
            roll = rng.random()
            terrain[(row, column)] = "shelf" if roll < 0.22 else "restricted" if roll < 0.28 else "crowded" if roll < 0.42 else "normal"

    # Carve a randomized monotonic route from the left edge to the right edge.
    cursor = start
    carved = {cursor}
    while cursor != goal:
        row, column = cursor
        moves = []
        if column < goal[1]:
            moves.append((row, column + 1))
        if row < goal[0]:
            moves.append((row + 1, column))
        elif row > goal[0]:
            moves.append((row - 1, column))
        cursor = rng.choice(moves)
        carved.add(cursor)
    for position in carved | {start, goal}:
        terrain[position] = "normal"

    candidates = [position for position, kind in terrain.items() if kind == "normal" and position not in {start, goal}]
    trolley = rng.choice(candidates) if candidates else start
    return Warehouse(rows=rows, cols=cols, start=start, goal=goal, terrain=terrain, trolley=trolley)
