import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const palette = {
  floor: 0x10252d, grid: 0x26414a, shelf: 0x49656f, box: 0xb07a3e,
  restricted: 0xe14d61, crowded: 0x9a5b2b, cyan: 0x35d7d0,
  amber: 0xffb648, yellow: 0xf7e36a, white: 0xf3ffff, green: 0x78e08f,
};

const state = {
  scenario: null, algorithm: "bfs", running: false, frontier: true, labels: false,
  cellMeshes: new Map(), overlays: [], coordinateLabels: [], robot: null, trolley: null,
};

const $ = (selector) => document.querySelector(selector);
const sceneHost = $("#scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08141b);
scene.fog = new THREE.Fog(0x08141b, 16, 35);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
sceneHost.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 8;
controls.maxDistance = 28;
controls.maxPolarAngle = Math.PI / 2.05;
controls.target.set(0, 0, 0);

scene.add(new THREE.HemisphereLight(0xaadce3, 0x061014, 1.8));
const keyLight = new THREE.DirectionalLight(0xd9ffff, 2.3);
keyLight.position.set(-7, 15, 8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);
const accentLight = new THREE.PointLight(palette.cyan, 22, 22, 2);
accentLight.position.set(4, 5, -3);
scene.add(accentLight);

function cellKey(position) { return position.join(","); }
function worldPosition([row, col], y = 0) {
  const { rows, cols } = state.scenario;
  return new THREE.Vector3(col - (cols - 1) / 2, y, row - (rows - 1) / 2);
}
function material(color, extras = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: .62, metalness: .12, ...extras });
}
function box(w, h, d, color, y = h / 2) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material(color));
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
function addAt(object, position) {
  const world = worldPosition(position);
  object.position.x += world.x;
  object.position.z += world.z;
  scene.add(object);
  return object;
}

function buildShelf(position) {
  const group = new THREE.Group();
  [-.34, .34].forEach((x) => [-.34, .34].forEach((z) => {
    const post = box(.07, 1.2, .07, palette.shelf, .6); post.position.x = x; post.position.z = z; group.add(post);
  }));
  [.25, .68, 1.1].forEach((y, index) => {
    const shelf = box(.82, .06, .82, palette.shelf, y); group.add(shelf);
    if (index < 2) {
      const parcel = box(.27, .22, .32, index ? 0x8f6337 : palette.box, y + .14);
      parcel.position.x = index ? -.18 : .17; group.add(parcel);
    }
  });
  return addAt(group, position);
}

function buildRestricted(position) {
  const group = new THREE.Group();
  [-.31, .31].forEach((x) => [-.31, .31].forEach((z) => {
    const post = box(.06, .78, .06, palette.restricted, .39); post.position.x = x; post.position.z = z; group.add(post);
  }));
  const beamA = box(.68, .05, .05, palette.restricted, .68); beamA.position.z = -.31; group.add(beamA);
  const beamB = box(.68, .05, .05, palette.restricted, .68); beamB.position.z = .31; group.add(beamB);
  const beamC = box(.05, .05, .68, palette.restricted, .68); beamC.position.x = -.31; group.add(beamC);
  const beamD = box(.05, .05, .68, palette.restricted, .68); beamD.position.x = .31; group.add(beamD);
  return addAt(group, position);
}

function buildCrowded(position) {
  const group = new THREE.Group();
  const pallet = box(.65, .09, .65, 0x68411f, .08); group.add(pallet);
  const parcel = box(.48, .22, .45, palette.crowded, .22); parcel.rotation.y = (position[1] % 3 - 1) * .12; group.add(parcel);
  return addAt(group, position);
}

function buildRobot(position) {
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(.28, .32, .22, 12), material(0x35d7d0, { metalness: .5 }));
  base.position.y = .24; base.castShadow = true; group.add(base);
  const head = box(.36, .25, .34, 0xddeff0, .48); group.add(head);
  const eye = box(.22, .07, .02, 0x09242b, .5); eye.position.z = -.18; group.add(eye);
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, .22), material(palette.cyan)); antenna.position.y = .72; group.add(antenna);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(.045, 10, 8), material(palette.yellow, { emissive: palette.yellow, emissiveIntensity: 2 })); beacon.position.y = .85; group.add(beacon);
  group.position.copy(worldPosition(position)); group.position.y = .02; scene.add(group); return group;
}

function buildTrolley(position) {
  const group = new THREE.Group();
  const bed = box(.58, .13, .42, 0xe18b3e, .28); group.add(bed);
  [-.22, .22].forEach((x) => [-.17, .17].forEach((z) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .05, 12), material(0x172026));
    wheel.rotation.z = Math.PI / 2; wheel.position.set(x, .11, z); group.add(wheel);
  }));
  const handle = box(.05, .65, .05, 0xb7c7c9, .55); handle.position.x = .26; group.add(handle);
  const bar = box(.32, .04, .04, 0xb7c7c9, .86); bar.position.x = .12; group.add(bar);
  group.position.copy(worldPosition(position)); group.visible = false; scene.add(group); return group;
}

function textSprite(text) {
  const canvas = document.createElement("canvas"); canvas.width = 128; canvas.height = 64;
  const context = canvas.getContext("2d"); context.fillStyle = "rgba(5,14,19,.76)"; context.fillRect(8, 10, 112, 42);
  context.font = "22px Consolas"; context.textAlign = "center"; context.fillStyle = "#b7cbd0"; context.fillText(text, 64, 39);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false }));
  sprite.scale.set(.8, .4, 1); sprite.renderOrder = 20; return sprite;
}

function buildWarehouse() {
  const { rows, cols, cells, start, goal } = state.scenario;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(cols + 2.6, rows + 2.6), material(0x091a21, { roughness: .92 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.07; ground.receiveShadow = true; scene.add(ground);
  cells.forEach(({ position, terrain }) => {
    const tileColor = terrain === "crowded" ? 0x2b211a : palette.floor;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(.91, .06, .91), material(tileColor));
    tile.position.copy(worldPosition(position, -.015)); tile.receiveShadow = true; scene.add(tile); state.cellMeshes.set(cellKey(position), tile);
    if (terrain === "shelf") buildShelf(position);
    if (terrain === "restricted") buildRestricted(position);
    if (terrain === "crowded") buildCrowded(position);
    const label = textSprite(`${position[0]},${position[1]}`); label.position.copy(worldPosition(position, .12)); label.rotation.x = -Math.PI / 2; label.visible = state.labels; scene.add(label); state.coordinateLabels.push(label);
  });
  addMarker(start, palette.green, "S"); addMarker(goal, palette.yellow, "G");
  state.robot = buildRobot(start); state.trolley = buildTrolley(state.scenario.trolley);
  resetCamera();
}

function addMarker(position, color, label) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.31, .035, 8, 24), material(color, { emissive: color, emissiveIntensity: .7 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = .08; group.add(ring);
  const sprite = textSprite(label); sprite.position.y = .68; sprite.scale.set(.48, .24, 1); group.add(sprite); addAt(group, position);
}

function overlayCell(position, color, opacity = .55, y = .08) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(.8, .035, .8), material(color, { transparent: true, opacity, emissive: color, emissiveIntensity: .65 }));
  mesh.position.copy(worldPosition(position, y)); scene.add(mesh); state.overlays.push(mesh); return mesh;
}
function clearOverlays() { state.overlays.forEach((item) => scene.remove(item)); state.overlays = []; }

function drawPath(path, color = palette.yellow) {
  if (!path?.length) return;
  path.forEach((position, index) => {
    overlayCell(position, color, .72, .105);
    if (!path[index + 1]) return;
    const start = worldPosition(position, .16); const end = worldPosition(path[index + 1], .16);
    const direction = new THREE.Vector3().subVectors(end, start); const length = direction.length();
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, length, 8), material(color, { emissive: color, emissiveIntensity: 1.2 }));
    beam.position.copy(start).add(end).multiplyScalar(.5); beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    scene.add(beam); state.overlays.push(beam);
  });
}

function resetCamera() {
  if (!state.scenario) return;
  camera.position.set(10.5, 12.5, 13.5); controls.target.set(0, 0, 0); controls.update();
}
function topCamera() { camera.position.set(0, 22, .01); controls.target.set(0, 0, 0); controls.update(); }

function resize() {
  const width = sceneHost.clientWidth, height = sceneHost.clientHeight;
  renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(sceneHost);
function frame(time) {
  controls.update();
  if (state.robot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) state.robot.position.y = .02 + Math.sin(time * .004) * .025;
  renderer.render(scene, camera); requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function setBusy(busy, label = "Running") {
  state.running = busy; $("#run-button").disabled = busy; $("#trolley-button").disabled = busy;
  $("#run-state").textContent = busy ? label : "Complete";
  $("#run-state").className = busy ? "run-state running" : "run-state complete";
  $("#system-status").innerHTML = `<span></span> ${busy ? "Simulation active" : "Engine ready"}`;
}
function updateMetrics(result) {
  $("#metric-goal").textContent = result.reached ? "Reached" : "No route";
  $("#metric-goal").style.color = result.reached ? "var(--green)" : "var(--red)";
  $("#metric-moves").textContent = result.moves;
  $("#metric-cost").textContent = result.totalCost;
  $("#metric-expanded").textContent = result.nodesExpanded;
}
function resetFeed() { $("#decision-feed").innerHTML = ""; $("#decision-count").textContent = "0 events"; }
function appendDecision(event, algorithm) {
  const scores = event.scores?.[0];
  const detail = scores && ["greedy", "astar"].includes(algorithm)
    ? `Candidate [${scores.cell.join(", ")}] · g=${scores.g}, h=${scores.h}${scores.f == null ? "" : `, f=${scores.f}`}`
    : `${event.considered.length} new candidate${event.considered.length === 1 ? "" : "s"} · ${event.frontier.length} waiting`;
  const item = document.createElement("div"); item.className = "feed-item";
  item.innerHTML = `<span class="feed-index">${String(event.step + 1).padStart(2,"0")}</span><div><b>Expand [${event.current.join(", ")}]</b><p>${detail}</p></div>`;
  const feed = $("#decision-feed"); feed.appendChild(item); feed.scrollTop = feed.scrollHeight;
  $("#decision-count").textContent = `${event.step + 1} events`;
}
const delay = () => [460, 240, 110, 35][Number($("#speed").value) - 1];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function animateTrace(result) {
  resetFeed(); clearOverlays(); state.trolley.visible = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stride = reduced ? Math.max(1, Math.ceil(result.trace.length / 8)) : 1;
  for (let index = 0; index < result.trace.length; index += stride) {
    const event = result.trace[index]; clearOverlays();
    if (state.frontier) event.frontier.forEach((position) => overlayCell(position, palette.cyan, .26));
    event.considered.forEach((position) => overlayCell(position, palette.amber, .7, .1));
    overlayCell(event.current, palette.white, .95, .13);
    appendDecision(event, state.algorithm);
    $("#step-label").textContent = `Decision ${event.step + 1} of ${result.trace.length}`;
    $("#decision-label").textContent = `Expanding [${event.current.join(", ")}]; ${event.frontier.length} cells remain in the frontier.`;
    await sleep(reduced ? 10 : delay());
  }
  clearOverlays(); drawPath(result.path);
  $("#step-label").textContent = result.reached ? "Route committed" : "Search exhausted";
  $("#decision-label").textContent = result.reached ? `${result.algorithm.toUpperCase()} selected ${result.moves} moves with a total cost of ${result.totalCost}.` : "No path reaches the dispatch point.";
}

async function runSelected() {
  if (state.running) return;
  setBusy(true, "Searching");
  try {
    const response = await fetch(`/api/run/${state.algorithm}`); if (!response.ok) throw new Error();
    const result = await response.json(); updateMetrics(result); await animateTrace(result);
  } catch { $("#decision-label").textContent = "The simulation could not be loaded. Check that the Python server is running."; $("#run-state").textContent = "Error"; }
  finally { setBusy(false); }
}

async function runTrolley() {
  if (state.running) return;
  setBusy(true, "Trolley event"); state.algorithm = "astar"; selectAlgorithm("astar"); resetFeed(); clearOverlays();
  try {
    const response = await fetch("/api/trolley"); if (!response.ok) throw new Error();
    const data = await response.json();
    $("#step-label").textContent = "Initial A* plan"; $("#decision-label").textContent = "The trolley is absent from the robot’s known map.";
    drawPath(data.original.path, palette.cyan); await sleep(900);
    clearOverlays(); drawPath(data.travelled, palette.yellow);
    state.robot.position.copy(worldPosition(data.detectedAt, .02));
    state.trolley.position.copy(worldPosition(data.trolley)); state.trolley.visible = true;
    overlayCell(data.trolley, palette.restricted, .85, .1);
    $("#step-label").textContent = "Obstacle detected"; $("#decision-label").textContent = `Trolley found one cell ahead at [${data.trolley.join(", ")}]. Updating the known map.`;
    await sleep(1200);
    await animateTrace(data.revised); state.trolley.visible = true; clearOverlays();
    drawPath(data.travelled, palette.cyan); drawPath(data.revised.path, palette.yellow);
    updateMetrics({ reached: data.goalReached, moves: data.moves, totalCost: data.totalCost, nodesExpanded: data.nodesExpanded });
    $("#step-label").textContent = data.goalReached ? "Replan successful · 1 replan" : "Replan failed";
    $("#decision-label").textContent = data.goalReached ? "A* avoided the newly mapped trolley and committed a revised route." : "No alternative route exists from the current position.";
  } catch { $("#decision-label").textContent = "The trolley experiment could not be completed."; }
  finally { setBusy(false); }
}

function selectAlgorithm(name) {
  state.algorithm = name;
  document.querySelectorAll(".algorithm").forEach((button) => button.classList.toggle("active", button.dataset.algorithm === name));
  $("#run-button span:last-child").textContent = `Run ${name === "astar" ? "A*" : name.toUpperCase()} simulation`;
  $("#inspector-title").textContent = `${name === "astar" ? "A*" : name.toUpperCase()} analysis`;
}

async function loadComparison() {
  try {
    const response = await fetch("/api/results"); const { results } = await response.json();
    $("#results-body").innerHTML = results.map((result) => `<tr><td class="algo-cell">${result.algorithm === "astar" ? "A*" : result.algorithm.toUpperCase()}</td><td class="success-text">${result.reached ? "Yes" : "No"}</td><td>${result.moves} moves</td><td>${result.totalCost}</td><td>${result.nodesExpanded}</td><td>${result.elapsedMs.toFixed(3)} ms</td></tr>`).join("");
  } catch { $("#results-body").innerHTML = '<tr><td colspan="6" class="loading-row">Performance results are unavailable.</td></tr>'; }
}

$("#speed").addEventListener("input", (event) => { $("#speed-output").textContent = ["0.5×", "1×", "2×", "4×"][event.target.value - 1]; });
$("#frontier-toggle").addEventListener("change", (event) => { state.frontier = event.target.checked; });
$("#label-toggle").addEventListener("change", (event) => { state.labels = event.target.checked; state.coordinateLabels.forEach((label) => { label.visible = state.labels; }); });
window.warehouseUI = {
  selectAlgorithm, runSelected, runTrolley, resetCamera, topCamera,
  openGuide: () => $("#guide-dialog").showModal(),
  closeGuide: () => $("#guide-dialog").close(),
};

async function initialise() {
  try {
    const response = await fetch("/api/scenario"); state.scenario = await response.json(); buildWarehouse(); loadComparison();
  } catch { $("#decision-label").textContent = "The warehouse could not be initialised. Restart the Python server."; }
}
initialise();
