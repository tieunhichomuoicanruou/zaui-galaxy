import * as THREE from "three";

interface HoverHelper {
    group: THREE.Group;
    ring: THREE.Mesh;
    line: THREE.Line;
}

export function createHoverHelper(): HoverHelper {
    const group = new THREE.Group();
    group.visible = false;

    const ringGeo = new THREE.RingGeometry(1.5, 1.7, 32);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, 2, 0)
    ]);

    const line = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    );

    group.add(line);

    return { group, ring, line };
}