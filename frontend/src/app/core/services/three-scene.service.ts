import { Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Position, TraceEvent, WarehouseScenario } from '../models/warehouse.model';

export const SCENE_PALETTE = {
  background: 0x080c12,
  floor: 0x0f1722,
  grid: 0x1a2636,
  shelf: 0x334155,
  box: 0x926038,
  restricted: 0xef4444,
  crowded: 0x78350f,
  frontier: 0x2dd4bf, // Studio Teal
  candidate: 0xf59e0b, // Warm Amber
  route: 0xeab308, // Gold
  current: 0xffffff, // White
  start: 0x10b981, // Emerald
  goal: 0xf59e0b, // Amber Gold
};

@Injectable({
  providedIn: 'root',
})
export class ThreeSceneService {
  private readonly ngZone = inject(NgZone);

  private container: HTMLElement | null = null;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private scenario: WarehouseScenario | null = null;
  private robotMesh: THREE.Group | null = null;
  private robotBeaconMesh: THREE.Mesh | null = null;
  private trolleyMesh: THREE.Group | null = null;
  private overlays: THREE.Object3D[] = [];
  private coordinateLabels: THREE.Sprite[] = [];
  private cellMeshes: Map<string, THREE.Mesh> = new Map();

  init(container: HTMLElement): void {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(SCENE_PALETTE.background);
    this.scene.fog = new THREE.Fog(SCENE_PALETTE.background, 16, 36);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 120);
    this.camera.position.set(11, 13, 14);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 32;
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.target.set(0, 0, 0);

    // Setup Lighting
    const hemiLight = new THREE.HemisphereLight(0xb4dbe2, 0x050c12, 1.8);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xe8fbff, 2.4);
    dirLight.position.set(-8, 16, 9);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    dirLight.shadow.camera.top = 12;
    dirLight.shadow.camera.bottom = -12;
    this.scene.add(dirLight);

    const accentLight = new THREE.PointLight(SCENE_PALETTE.frontier, 20, 24, 2);
    accentLight.position.set(4, 5, -3);
    this.scene.add(accentLight);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);

    this.startRenderLoop();
  }

  private startRenderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const render = (time: number) => {
        this.controls.update();
        if (this.robotMesh && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.robotMesh.position.y = 0.02 + Math.sin(time * 0.0035) * 0.025;
        }
        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(render);
      };
      this.animationFrameId = requestAnimationFrame(render);
    });
  }

  buildWarehouse(scenario: WarehouseScenario, showLabels = false): void {
    this.scenario = scenario;
    const { rows, cols, cells, start, goal } = scenario;

    // Ground Plane
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(cols + 2.8, rows + 2.8),
      this.material(0x0a1017, { roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.07;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Floor Cells
    cells.forEach(({ position, terrain }) => {
      const tileColor = terrain === 'crowded' ? 0x241a12 : SCENE_PALETTE.floor;
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.06, 0.92),
        this.material(tileColor, { roughness: 0.7 })
      );
      tile.position.copy(this.worldPosition(position, -0.015));
      tile.receiveShadow = true;
      this.scene.add(tile);
      this.cellMeshes.set(position.join(','), tile);

      if (terrain === 'shelf') this.buildShelf(position);
      if (terrain === 'restricted') this.buildRestricted(position);
      if (terrain === 'crowded') this.buildCrowded(position);

      const label = this.textSprite(`${position[0]},${position[1]}`);
      label.position.copy(this.worldPosition(position, 0.12));
      label.rotation.x = -Math.PI / 2;
      label.visible = showLabels;
      this.scene.add(label);
      this.coordinateLabels.push(label);
    });

    this.addMarker(start, SCENE_PALETTE.start, 'START');
    this.addMarker(goal, SCENE_PALETTE.goal, 'GOAL');

    this.robotMesh = this.buildRobot(start);
    this.trolleyMesh = this.buildTrolley(scenario.trolley);

    this.resetCamera();
  }

  private material(color: number, extras: Record<string, any> = {}): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.65,
      metalness: 0.15,
      ...extras,
    });
  }

  private box(w: number, h: number, d: number, color: number, y: number = h / 2): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.material(color));
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private worldPosition(pos: Position, y = 0): THREE.Vector3 {
    if (!this.scenario) return new THREE.Vector3();
    const { rows, cols } = this.scenario;
    return new THREE.Vector3(pos[1] - (cols - 1) / 2, y, pos[0] - (rows - 1) / 2);
  }

  private addAt(object: THREE.Object3D, position: Position): THREE.Object3D {
    const world = this.worldPosition(position);
    object.position.x += world.x;
    object.position.z += world.z;
    this.scene.add(object);
    return object;
  }

  private buildShelf(position: Position): THREE.Group {
    const group = new THREE.Group();
    [-0.34, 0.34].forEach((x) =>
      [-0.34, 0.34].forEach((z) => {
        const post = this.box(0.07, 1.25, 0.07, SCENE_PALETTE.shelf, 0.625);
        post.position.x = x;
        post.position.z = z;
        group.add(post);
      })
    );
    [0.25, 0.68, 1.12].forEach((y, index) => {
      const shelf = this.box(0.84, 0.06, 0.84, SCENE_PALETTE.shelf, y);
      group.add(shelf);
      if (index < 2) {
        const parcel = this.box(0.28, 0.22, 0.32, index ? 0x7c4f24 : SCENE_PALETTE.box, y + 0.14);
        parcel.position.x = index ? -0.18 : 0.17;
        group.add(parcel);
      }
    });
    return this.addAt(group, position) as THREE.Group;
  }

  private buildRestricted(position: Position): THREE.Group {
    const group = new THREE.Group();
    [-0.32, 0.32].forEach((x) =>
      [-0.32, 0.32].forEach((z) => {
        const post = this.box(0.06, 0.8, 0.06, SCENE_PALETTE.restricted, 0.4);
        post.position.x = x;
        post.position.z = z;
        group.add(post);
      })
    );
    const beamA = this.box(0.7, 0.05, 0.05, SCENE_PALETTE.restricted, 0.7);
    beamA.position.z = -0.32;
    group.add(beamA);
    const beamB = this.box(0.7, 0.05, 0.05, SCENE_PALETTE.restricted, 0.7);
    beamB.position.z = 0.32;
    group.add(beamB);
    const beamC = this.box(0.05, 0.05, 0.7, SCENE_PALETTE.restricted, 0.7);
    beamC.position.x = -0.32;
    group.add(beamC);
    const beamD = this.box(0.05, 0.05, 0.7, SCENE_PALETTE.restricted, 0.7);
    beamD.position.x = 0.32;
    group.add(beamD);
    return this.addAt(group, position) as THREE.Group;
  }

  private buildCrowded(position: Position): THREE.Group {
    const group = new THREE.Group();
    const pallet = this.box(0.68, 0.09, 0.68, 0x543216, 0.08);
    group.add(pallet);
    const parcel = this.box(0.48, 0.24, 0.46, SCENE_PALETTE.crowded, 0.24);
    parcel.rotation.y = ((position[1] % 3) - 1) * 0.15;
    group.add(parcel);
    return this.addAt(group, position) as THREE.Group;
  }

  private buildRobot(position: Position): THREE.Group {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.22, 16),
      this.material(SCENE_PALETTE.frontier, { metalness: 0.5 })
    );
    base.position.y = 0.24;
    base.castShadow = true;
    group.add(base);

    const head = this.box(0.36, 0.25, 0.34, 0xd8eaed, 0.48);
    group.add(head);

    const eye = this.box(0.22, 0.07, 0.02, 0x071b20, 0.5);
    eye.position.z = -0.18;
    group.add(eye);

    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.22),
      this.material(SCENE_PALETTE.frontier)
    );
    antenna.position.y = 0.72;
    group.add(antenna);

    this.robotBeaconMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.048, 12, 10),
      this.material(SCENE_PALETTE.candidate, {
        emissive: SCENE_PALETTE.candidate,
        emissiveIntensity: 2.2,
      })
    );
    this.robotBeaconMesh.position.y = 0.85;
    group.add(this.robotBeaconMesh);

    group.position.copy(this.worldPosition(position));
    group.position.y = 0.02;
    this.scene.add(group);
    return group;
  }

  private buildTrolley(position: Position): THREE.Group {
    const group = new THREE.Group();
    const bed = this.box(0.58, 0.13, 0.42, 0xd97706, 0.28);
    group.add(bed);

    [-0.22, 0.22].forEach((x) =>
      [-0.17, 0.17].forEach((z) => {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.05, 12),
          this.material(0x131d24)
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.11, z);
        group.add(wheel);
      })
    );

    const handle = this.box(0.05, 0.65, 0.05, 0x94a3b8, 0.55);
    handle.position.x = 0.26;
    group.add(handle);

    const bar = this.box(0.32, 0.04, 0.04, 0x94a3b8, 0.86);
    bar.position.x = 0.12;
    group.add(bar);

    group.position.copy(this.worldPosition(position));
    group.visible = false;
    this.scene.add(group);
    return group;
  }

  private textSprite(text: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(10, 16, 24, 0.85)';
      ctx.fillRect(8, 10, 112, 44);
      ctx.font = '600 20px Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(text, 64, 38);
    }
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(canvas),
        transparent: true,
        depthTest: false,
      })
    );
    sprite.scale.set(0.8, 0.4, 1);
    sprite.renderOrder = 20;
    return sprite;
  }

  private addMarker(position: Position, color: number, label: string): void {
    const group = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.04, 10, 28),
      this.material(color, { emissive: color, emissiveIntensity: 0.8 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.08;
    group.add(ring);

    const sprite = this.textSprite(label);
    sprite.position.y = 0.72;
    sprite.scale.set(0.6, 0.3, 1);
    group.add(sprite);

    this.addAt(group, position);
  }

  overlayCell(pos: Position, color: number, opacity = 0.55, y = 0.08): THREE.Mesh {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 0.035, 0.82),
      this.material(color, {
        transparent: true,
        opacity,
        emissive: color,
        emissiveIntensity: 0.7,
      })
    );
    mesh.position.copy(this.worldPosition(pos, y));
    this.scene.add(mesh);
    this.overlays.push(mesh);
    return mesh;
  }

  clearOverlays(): void {
    this.overlays.forEach((obj) => this.scene.remove(obj));
    this.overlays = [];
  }

  drawPath(path: Position[], color = SCENE_PALETTE.route): void {
    if (!path || path.length === 0) return;
    path.forEach((pos, idx) => {
      this.overlayCell(pos, color, 0.72, 0.105);
      if (!path[idx + 1]) return;
      const start = this.worldPosition(pos, 0.16);
      const end = this.worldPosition(path[idx + 1], 0.16);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, len, 10),
        this.material(color, { emissive: color, emissiveIntensity: 1.3 })
      );
      beam.position.copy(start).add(end).multiplyScalar(0.5);
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      this.scene.add(beam);
      this.overlays.push(beam);
    });
  }

  renderTraceEvent(event: TraceEvent, showFrontier: boolean): void {
    this.clearOverlays();
    if (showFrontier) {
      event.frontier.forEach((pos) => this.overlayCell(pos, SCENE_PALETTE.frontier, 0.28));
    }
    event.considered.forEach((pos) => this.overlayCell(pos, SCENE_PALETTE.candidate, 0.72, 0.1));
    this.overlayCell(event.current, SCENE_PALETTE.current, 0.96, 0.13);
  }

  setRobotPosition(pos: Position): void {
    if (this.robotMesh) {
      this.robotMesh.position.copy(this.worldPosition(pos, 0.02));
      this.robotMesh.rotation.y = 0;
    }
  }

  setTrolley(pos: Position, visible = true): void {
    if (this.trolleyMesh) {
      this.trolleyMesh.position.copy(this.worldPosition(pos));
      this.trolleyMesh.visible = visible;
    }
  }

  showObstacleAlert(trolleyPos: Position, robotPos: Position): void {
    if (this.trolleyMesh) {
      this.trolleyMesh.position.copy(this.worldPosition(trolleyPos));
      this.trolleyMesh.visible = true;
    }

    // Overlay pulsing alert cell on the blocked trolley position
    this.overlayCell(trolleyPos, SCENE_PALETTE.restricted, 0.88, 0.1);

    // Draw proximity radar beam from robot to trolley
    const startVec = this.worldPosition(robotPos, 0.35);
    const endVec = this.worldPosition(trolleyPos, 0.35);
    const dir = new THREE.Vector3().subVectors(endVec, startVec);
    const len = dir.length();
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, len, 8),
      this.material(SCENE_PALETTE.restricted, {
        emissive: SCENE_PALETTE.restricted,
        emissiveIntensity: 2.2,
      })
    );
    beam.position.copy(startVec).add(endVec).multiplyScalar(0.5);
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    this.scene.add(beam);
    this.overlays.push(beam);

    // Flash robot beacon in warning red
    if (this.robotBeaconMesh) {
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).color.setHex(SCENE_PALETTE.restricted);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissive.setHex(SCENE_PALETTE.restricted);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 3.5;
    }
  }

  resetRobotBeacon(): void {
    if (this.robotBeaconMesh) {
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).color.setHex(SCENE_PALETTE.candidate);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissive.setHex(SCENE_PALETTE.candidate);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.2;
    }
  }

  celebrateGoal(): void {
    if (this.robotBeaconMesh) {
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).color.setHex(SCENE_PALETTE.start);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissive.setHex(SCENE_PALETTE.start);
      (this.robotBeaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 3.5;
    }
  }

  /**
   * Smoothly drives the robot mesh step-by-step along path waypoints,
   * orienting the robot heading toward the direction of travel.
   */
  async driveRobot(
    path: Position[],
    stepDelayMs: number,
    onStep?: (pos: Position, index: number) => void
  ): Promise<void> {
    if (!this.robotMesh || !path || path.length === 0) return;

    for (let i = 0; i < path.length; i++) {
      const currentPos = path[i];
      const targetVec = this.worldPosition(currentPos, 0.02);

      // Rotate robot to face the direction of the next step
      if (i < path.length - 1) {
        const nextPos = path[i + 1];
        const dRow = nextPos[0] - currentPos[0];
        const dCol = nextPos[1] - currentPos[1];
        // Col is X, Row is Z.
        const angle = Math.atan2(dCol, dRow);
        this.robotMesh.rotation.y = angle;
      }

      this.robotMesh.position.copy(targetVec);

      // Draw subtle trail tile behind the robot
      this.overlayCell(currentPos, SCENE_PALETTE.route, 0.45, 0.08);

      if (onStep) {
        onStep(currentPos, i);
      }

      await new Promise((resolve) => setTimeout(resolve, stepDelayMs));
    }
  }

  toggleLabels(visible: boolean): void {
    this.coordinateLabels.forEach((label) => (label.visible = visible));
  }

  resetCamera(): void {
    if (!this.camera || !this.controls) return;
    this.camera.position.set(10.5, 12.5, 13.5);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  topCamera(): void {
    if (!this.camera || !this.controls) return;
    this.camera.position.set(0, 22, 0.01);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  resize(): void {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.renderer?.dispose();
  }
}
