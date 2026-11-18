from .models import Warehouse


def classroom_warehouse() -> Warehouse:
    """A deterministic map with a short costly route and a longer cheap route."""
    shelves = {
        (1, 3), (1, 4), (1, 5), (1, 9), (1, 10),
        (2, 3), (2, 9),
        (3, 3), (3, 5), (3, 6), (3, 7), (3, 9),
        (4, 5), (4, 9),
        (5, 1), (5, 2), (5, 3), (5, 5), (5, 7), (5, 8), (5, 9),
        (6, 5), (6, 9),
        (7, 2), (7, 3), (7, 4), (7, 5), (7, 9), (7, 10), (7, 11),
        (8, 9),
    }
    restricted = {(2, 11), (3, 11), (4, 11), (5, 11), (6, 11)}
    # The middle aisle looks direct but costs four per entered cell.
    crowded = {(4, column) for column in range(1, 9)} | {(6, 6), (6, 7), (6, 8)}
    terrain = {position: "shelf" for position in shelves}
    terrain.update({position: "restricted" for position in restricted})
    terrain.update({position: "crowded" for position in crowded})
    return Warehouse(
        rows=10,
        cols=14,
        start=(8, 1),
        goal=(1, 12),
        terrain=terrain,
        trolley=(6, 10),
    )
