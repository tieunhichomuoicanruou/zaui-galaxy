import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CAMERA_CONFIG } from "@/constants/camera";

export class CameraController {
    public camera: THREE.PerspectiveCamera;
    public controls: OrbitControls | null = null;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.camera = new THREE.PerspectiveCamera(
            CAMERA_CONFIG.FOV,
            window.innerWidth / window.innerHeight,
            0.01,
            CAMERA_CONFIG.FAR
        );

        this.resetPosition();
    }

    public resetPosition(): void {
        const { x, y, z } = CAMERA_CONFIG.POSITION;
        this.camera.position.set(x, y, z);
        if (this.controls) {
            this.controls.target.set(0, 0, 0);
            this.controls.update();
        }
    }

    public setInsideView(active: boolean): void {
        if (!this.controls) return;

        if (active) {
            this.camera.position.set(0, 0, 0.1);
            this.controls.target.set(0, 0, 0.2);
        } else {
            this.resetPosition();
        }
        this.controls.update();
    }

    attach(rendererDom: HTMLCanvasElement): void {
        this.controls = new OrbitControls(this.camera, rendererDom);
        const c = CAMERA_CONFIG.CONTROLS;

        this.controls.enableDamping = c.ENABLE_DAMPING;
        this.controls.dampingFactor = c.DAMPING_FACTOR;

        this.controls.minDistance = 0;
        this.controls.maxDistance = c.MAX_DISTANCE;
    }

    update(): void {
        this.controls?.update();
    }

    resize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    dispose(): void {
        this.controls?.dispose();
    }
}