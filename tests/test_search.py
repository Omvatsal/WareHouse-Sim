import unittest

from warehouse_sim.scenario import classroom_warehouse
from warehouse_sim.search import manhattan, search
from warehouse_sim.service import run_all, run_trolley_experiment


class SearchTests(unittest.TestCase):
    def setUp(self):
        self.warehouse = classroom_warehouse()

    def test_all_algorithms_reach_goal(self):
        for algorithm in ("bfs", "dfs", "greedy", "astar"):
            with self.subTest(algorithm=algorithm):
                result = search(self.warehouse, algorithm)
                self.assertTrue(result.reached)
                self.assertEqual(result.path[0], self.warehouse.start)
                self.assertEqual(result.path[-1], self.warehouse.goal)
                self.assertGreater(len(result.path), 1)

    def test_all_algorithm_paths_are_strictly_contiguous(self):
        """Verify every step is adjacent and every path avoids blocked terrain."""
        for algorithm in ("bfs", "dfs", "greedy", "astar"):
            with self.subTest(algorithm=algorithm):
                result = search(self.warehouse, algorithm)
                path = result.path
                for i in range(len(path) - 1):
                    dist = manhattan(path[i], path[i + 1])
                    self.assertEqual(
                        dist, 1,
                        f"{algorithm} produced non-contiguous step from {path[i]} to {path[i+1]}"
                    )
                blocked_cells = [
                    position for position in path
                    if self.warehouse.cell(position) in {"shelf", "restricted"}
                ]
                self.assertEqual(blocked_cells, [], f"{algorithm} entered blocked cells: {blocked_cells}")

    def test_bfs_and_dfs_are_distinct(self):
        """Verify DFS deep exploration produces a distinct path from BFS hop-optimal search."""
        bfs = search(self.warehouse, "bfs")
        dfs = search(self.warehouse, "dfs")
        self.assertNotEqual(bfs.path, dfs.path)
        self.assertGreater(dfs.moves, bfs.moves)
        self.assertEqual(bfs.moves, 11)
        self.assertEqual(dfs.moves, 31)
        self.assertEqual(dfs.total_cost, 31)

    def test_astar_is_no_more_expensive_than_bfs(self):
        bfs = search(self.warehouse, "bfs")
        astar = search(self.warehouse, "astar")
        self.assertLessEqual(astar.total_cost, bfs.total_cost)
        self.assertLess(bfs.moves, astar.moves)
        self.assertEqual(astar.moves, 15)
        self.assertEqual(astar.total_cost, 15)
        self.assertEqual(bfs.moves, 11)
        self.assertEqual(bfs.total_cost, 41)
        self.assertTrue(any(self.warehouse.cell(position) == "crowded" for position in bfs.path))
        self.assertFalse(any(self.warehouse.cell(position) == "crowded" for position in astar.path))

    def test_greedy_is_faster_than_bfs(self):
        greedy = search(self.warehouse, "greedy")
        bfs = search(self.warehouse, "bfs")
        self.assertLess(greedy.nodes_expanded, bfs.nodes_expanded)
        self.assertEqual(greedy.moves, 11)
        self.assertEqual(greedy.total_cost, 41)

    def test_manhattan_is_consistent_for_neighbors(self):
        goal = self.warehouse.goal
        for row in range(self.warehouse.rows):
            for col in range(self.warehouse.cols):
                current = (row, col)
                for neighbor in self.warehouse.neighbors(current):
                    self.assertLessEqual(manhattan(current, goal), 1 + manhattan(neighbor, goal))

    def test_trolley_replans_around_blocked_cell(self):
        experiment = run_trolley_experiment()
        self.assertEqual(experiment["replans"], 1)
        self.assertNotIn(experiment["trolley"], experiment["revised"]["path"])
        self.assertTrue(experiment["goalReached"])
        self.assertEqual(experiment["detectedAt"], [2, 6])
        self.assertEqual(experiment["trolley"], [2, 7])
        self.assertEqual(experiment["moves"], 17)
        self.assertEqual(experiment["totalCost"], 17)

    def test_trolley_is_on_initial_astar_route(self):
        astar = search(self.warehouse, "astar")
        self.assertIn(self.warehouse.trolley, astar.path)
        trolley_idx = astar.path.index(self.warehouse.trolley)
        self.assertGreater(trolley_idx, 0)
        self.assertLess(trolley_idx, len(astar.path) - 1)

    def test_trolley_detection_is_strictly_one_step_ahead(self):
        experiment = run_trolley_experiment()
        self.assertEqual(experiment["distanceToBlockedCell"], 1)
        self.assertEqual(experiment["detectedAt"], [2, 6])
        self.assertEqual(experiment["trolley"], [2, 7])

    def test_trolley_reports_failure_when_no_alternative_exists(self):
        blocked_goal = {(3, 12), (4, 11), (5, 12), (4, 13)}
        result = search(self.warehouse, "astar", start=(2, 6), blocked=blocked_goal)
        self.assertFalse(result.reached)
        self.assertEqual(result.path, [])

    def test_run_all_contains_five_benchmark_rows(self):
        data = run_all()
        results = data["results"]
        self.assertEqual(len(results), 5)
        algo_names = [r["algorithm"] for r in results]
        self.assertEqual(algo_names, ["bfs", "dfs", "greedy", "astar", "astar_replan"])


if __name__ == "__main__":
    unittest.main()
