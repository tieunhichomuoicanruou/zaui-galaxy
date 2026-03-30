import * as THREE from "three";
import { createStarField } from "./StarField";
import { createHoverHelper } from "./HoverHelper";
import { Interaction, HoverEvent } from "./Interaction";
import { CameraController } from "./CameraController";

export class GalaxyScene {
    private scene!: THREE.Scene;
    public renderer!: THREE.WebGLRenderer;
    public cameraController!: CameraController; // Để public để truy cập từ React
    private points!: THREE.Points;
    private helper!: THREE.Group;
    private interaction!: Interaction;

    constructor(
        private container: HTMLElement,
        private onHover?: (data: HoverEvent | null) => void
    ) {
        this.init();
    }

    private init(): void {
        this.scene = new THREE.Scene();
        // Giảm bớt fog để nhìn từ tâm ra vỏ rõ hơn
        this.scene.fog = new THREE.FogExp2(0x000000, 0.001);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.cameraController = new CameraController(this.container);
        this.cameraController.attach(this.renderer.domElement);

        this.points = createStarField();
        this.scene.add(this.points);

        const { group } = createHoverHelper();
        this.helper = group;
        this.scene.add(this.helper);

        this.interaction = new Interaction(
            this.cameraController.camera,
            this.container,
            this.points,
            this.helper,
            this.onHover
        );

        window.addEventListener("resize", this.onResize);
    }

    // Hàm tiện ích để bật tắt chế độ tâm
    public setInsideMode(active: boolean): void {
        this.cameraController.setInsideView(active);
    }

    render = (): void => {
        this.cameraController.update();
        this.interaction.update();

        // Tự quay quả cầu (Vỏ quay quanh camera khi đứng ở tâm)
        if (this.points) {
            this.points.rotation.y += 0.0005;
        }

        if (this.helper.visible) {
            this.helper.quaternion.copy(this.cameraController.camera.quaternion);
        }

        this.renderer.render(this.scene, this.cameraController.camera);
    };

    private onResize = (): void => {
        this.cameraController.resize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    destroy(): void {
        window.removeEventListener("resize", this.onResize);
        this.cameraController.dispose();
        this.points.geometry.dispose();
        (this.points.material as THREE.Material).dispose();
        this.renderer.dispose();
        if (this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}