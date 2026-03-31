import * as THREE from "three";

export interface HoverEvent {
    index: number;
    x: number;
    y: number;
}

export class Interaction {
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private hoveredIndex: number | null = null;

    constructor(
        private camera: THREE.Camera,
        private container: HTMLElement,
        private points: THREE.Points,
        private helper: THREE.Group,
        private onHover?: (data: HoverEvent | null) => void
    ) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-1, -1);
        this.raycaster.params.Points!.threshold = 0.5;

        container.addEventListener("mousemove", (e) => this.onMouseMove(e));
    }

    private onMouseMove(event: MouseEvent): void {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    update(): void {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.points);

        if (intersects.length > 0) {
            const id = intersects[0].index!;

            if (this.hoveredIndex !== id) {
                this.hoveredIndex = id;

                const posAttr = this.points.geometry.attributes.position;
                const pos = new THREE.Vector3().fromBufferAttribute(posAttr, id);

                this.helper.position.copy(pos);
                this.helper.visible = true;

                const screen = pos.clone().project(this.camera);
                const x = (screen.x * 0.5 + 0.5) * this.container.clientWidth;
                const y = (-screen.y * 0.5 + 0.5) * this.container.clientHeight;

                this.onHover?.({ index: id, x, y });
            }
        } else {
            this.hoveredIndex = null;
            this.helper.visible = false;
            this.onHover?.(null);
        }
    }
}