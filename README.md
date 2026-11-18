# Warehouse Route Lab

A complete Python implementation of the **AI-Based Route Planning for a Warehouse Delivery Robot** assignment, presented as an interactive 3D simulation.

## Included

- Warehouse grid with normal cells (cost 1), crowded cells (cost 4), shelves, restricted zones, start, and destination.
- Four-direction movement and a shared problem formulation.
- BFS, DFS, Greedy Best-First Search, and A* with reproducible decision traces.
- Manhattan-distance heuristic for Greedy and A*.
- Hidden-trolley detection before entry, known-map update, A* replanning, and no-route handling.
- Goal reached, path length, path cost, nodes expanded, execution time, and replan metrics.
- 3D shelves, parcels, restricted-zone barriers, robot, trolley, route beams, candidates, frontier, and current expansion.
- Responsive controls, comparison table, keyboard focus, reduced-motion support, and camera controls.

## Problem formulation

| Element | Definition |
| --- | --- |
| State | Robot grid coordinate `(row, column)` plus the currently known blocked cells. |
| Initial state | Packing station at `[8, 1]`. |
| Actions | Move up, right, down, or left into a passable cell. |
| Transition model | Applying an action moves the robot to the adjacent coordinate when it is in bounds and not a shelf, restricted zone, or known trolley. |
| Goal test | Current coordinate equals the dispatch point `[1, 12]`. |
| Path cost | Sum of entered-cell costs: normal is 1 and crowded is 4. |

Manhattan distance is admissible because the robot cannot move diagonally and every legal step costs at least 1. Therefore `|row-goalRow| + |column-goalColumn|` can never exceed the true remaining travel cost.

## Run

Requirements: Python 3.10+ and Node.js/npm.

```powershell
npm install
python server.py
```

Open `http://127.0.0.1:8000`.

## Test

```powershell
python -m unittest discover -s tests -v
```

The Python package contains all search and scenario logic. The browser code only renders API results and manages interaction, keeping domain logic separate from the UI.

## Project structure

```text
warehouse_sim/       Python domain and search engine
  models.py          Warehouse and result models
  scenario.py        Shared weighted warehouse scenario
  search.py          BFS, DFS, Greedy, A*, trace generation
  service.py         API-ready orchestration and trolley experiment
public/              3D frontend and design layer
server.py            Dependency-free local HTTP/API server
tests/               Search and replanning tests
```

## Group submission checklist

Before submission, add group number, names, roll numbers, responsibilities, screenshots, and the final repository link. The assignment requests one repository and one email to the instructor from the group representative.
