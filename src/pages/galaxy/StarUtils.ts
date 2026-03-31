import * as THREE from "three";

interface Palette {
    base: THREE.Color;
    alt: THREE.Color;
    weight: number;
}

const PALETTES: Palette[] = [
    { base: new THREE.Color("#ffffff"), alt: new THREE.Color("#e0e0e0"), weight: 0.40 },
    { base: new THREE.Color("#cccccc"), alt: new THREE.Color("#b0b0b0"), weight: 0.30 },
    { base: new THREE.Color("#888888"), alt: new THREE.Color("#666666"), weight: 0.20 },
    { base: new THREE.Color("#444444"), alt: new THREE.Color("#333333"), weight: 0.08 },
    { base: new THREE.Color("#111111"), alt: new THREE.Color("#000000"), weight: 0.02 }
];

const _tempColor = new THREE.Color();

export const getSymbolicColor = (): THREE.Color => {
    const rand = Math.random();
    let cumulativeWeight = 0;
    let selected = PALETTES[0];

    for (let i = 0; i < PALETTES.length; i++) {
        cumulativeWeight += PALETTES[i].weight;
        if (rand < cumulativeWeight) {
            selected = PALETTES[i];
            break;
        }
    }

    _tempColor.copy(selected.base);
    return _tempColor.lerp(selected.alt, Math.random()).clone();
};

export const getRandomSpherePoint = (radius: number, target: THREE.Vector3 = new THREE.Vector3()): THREE.Vector3 => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const sinPhi = Math.sin(phi);

    target.set(
        radius * sinPhi * Math.cos(theta),
        radius * sinPhi * Math.sin(theta),
        radius * Math.cos(phi)
    );

    return target;
};

export const getStarMass = (): number => {
    const rand = Math.random();
    if (rand < 0.8) return 0.5 + Math.random() * 0.5;
    if (rand < 0.95) return 1.5 + Math.random() * 1.5;
    return 4.0 + Math.random() * 6.0;
};
