from __future__ import annotations

import json
import mimetypes
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from warehouse_sim.service import run_algorithm, run_all, run_trolley_experiment, scenario_payload, set_random_scenario

ROOT = Path(__file__).resolve().parent


class WarehouseHandler(SimpleHTTPRequestHandler):
    def _json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path
        try:
            if path == "/api/scenario":
                return self._json(scenario_payload())
            if path == "/api/scenario/random":
                raw_seed = parse_qs(parsed.query).get("seed", [None])[0]
                return self._json(set_random_scenario(int(raw_seed) if raw_seed else None))
            if path == "/api/results":
                return self._json(run_all())
            if path.startswith("/api/run/"):
                return self._json(run_algorithm(path.rsplit("/", 1)[-1]))
            if path == "/api/trolley":
                return self._json(run_trolley_experiment())
        except ValueError as error:
            return self._json({"error": str(error)}, 400)
        except Exception:
            return self._json({"error": "The simulation could not be completed."}, 500)

        if path == "/":
            path = "/public/index.html"
        elif path.startswith("/node_modules/") or path.startswith("/public/"):
            pass
        else:
            path = "/public" + path

        target = (ROOT / path.lstrip("/")).resolve()
        if ROOT not in target.parents or not target.is_file():
            return self.send_error(404, "Not found")
        content = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(target.name)[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def log_message(self, format: str, *args) -> None:
        print(f"[warehouse] {format % args}")


if __name__ == "__main__":
    address = ("127.0.0.1", 8000)
    print("Warehouse Route Lab running at http://127.0.0.1:8000")
    ThreadingHTTPServer(address, WarehouseHandler).serve_forever()
