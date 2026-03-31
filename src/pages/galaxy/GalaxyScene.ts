import * as THREE from "three";
import { createStarField } from "./StarField";
import { CameraController } from "./CameraController";

export class GalaxyScene {
    private scene!: THREE.Scene;
    public renderer!: THREE.WebGLRenderer;
    public cameraController!: CameraController;
    private points!: THREE.Points;

    // Constructor giờ chỉ cần container, không cần callback onHover/onSelect nữa
    constructor(private container: HTMLElement) {
        this.init();
    }

    private init(): void {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.0005);

        // Khởi tạo Renderer tối ưu hiệu suất cho mobile
        this.renderer = new THREE.WebGLRenderer({
            antialias: false, // Tắt để tăng FPS trên điện thoại
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Khởi tạo Camera và bộ điều khiển xoay/zoom
        this.cameraController = new CameraController(this.container);
        this.cameraController.attach(this.renderer.domElement);

        // Tạo dải sao
        this.points = createStarField();
        this.scene.add(this.points);

        window.addEventListener("resize", this.onResize);
    }

    render = (): void => {
        // Cập nhật vị trí camera (cho OrbitControls mượt mà)
        this.cameraController.update();

        // Hiệu ứng thiên hà tự quay chậm rãi
        if (this.points) {
            this.points.rotation.y += 0.0005;
        }

        this.renderer.render(this.scene, this.cameraController.camera);
    };

    private onResize = (): void => {
        this.cameraController.resize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    destroy(): void {
        window.removeEventListener("resize", this.onResize);

        // Dừng vòng lặp render ngay lập tức
        this.renderer.setAnimationLoop(null);

        this.cameraController.dispose();

        // Giải phóng tài nguyên GPU
        if (this.points) {
            this.points.geometry.dispose();
            if (this.points.material instanceof THREE.Material) {
                this.points.material.dispose();
            }
        }

        this.renderer.dispose();

        if (this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}