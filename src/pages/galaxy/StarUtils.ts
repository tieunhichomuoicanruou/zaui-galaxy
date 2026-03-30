import * as THREE from "three";

interface Palette {
    base: THREE.Color;
    alt: THREE.Color;
    weight: number;
}

const PALETTES: Palette[] = [
    { base: new THREE.Color("#ffffff"), alt: new THREE.Color("#eeeeee"), weight: 0.4 },
    { base: new THREE.Color("#dddddd"), alt: new THREE.Color("#bbbbbb"), weight: 0.3 },
    { base: new THREE.Color("#aaaaaa"), alt: new THREE.Color("#888888"), weight: 0.2 },
    { base: new THREE.Color("#666666"), alt: new THREE.Color("#333333"), weight: 0.1 }
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
    // .clone() là cần thiết ở đây vì chúng ta đang dùng chung _tempColor
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
    if (rand < 0.8) return 0.5 + Math.random() * 0.5;   // Sao nhỏ
    if (rand < 0.95) return 1.5 + Math.random() * 1.5; // Sao vừa
    return 4.0 + Math.random() * 6.0;                  // Sao khổng lồ
};