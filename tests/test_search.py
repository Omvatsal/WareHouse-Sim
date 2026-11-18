import unittest

from warehouse_sim.scenario import classroom_warehouse
from warehouse_sim.search import manhattan, search
from warehouse_sim.service import run_trolley_experiment


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

    def test_astar_is_no_more_expensive_than_bfs(self):
        bfs = search(self.warehouse, "bfs")
        astar = search(self.warehouse, "astar")
        self.assertLessEqual(astar.total_cost, bfs.total_cost)

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


if __name__ == "__main__":
    unittest.main()
