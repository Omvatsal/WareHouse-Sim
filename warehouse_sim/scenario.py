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
