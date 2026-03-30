import * as THREE from "three";
import { GALAXY_CONFIG } from "@/constants/galaxy";
import { getSymbolicColor, getRandomSpherePoint, getStarMass } from "./StarUtils";
import { vertexShader, fragmentShader } from "./Shaders";

export function createStarField(): THREE.Points {
    const { COUNT, RADIUS, PARTICLE_SIZE } = GALAXY_CONFIG;

    const geo = new THREE.BufferGeometry();

    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const glowScale = new Float32Array(COUNT);

    const _tempVec = new THREE.Vector3();

    for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;

        getRandomSpherePoint(RADIUS, _tempVec);
        pos[i3] = _tempVec.x;
        pos[i3 + 1] = _tempVec.y;
        pos[i3 + 2] = _tempVec.z;

        const mass = getStarMass();
        const color = getSymbolicColor();

        col[i3] = color.r;
        col[i3 + 1] = color.g;
        col[i3 + 2] = color.b;

        size[i] = PARTICLE_SIZE * (0.5 + mass * 0.2);
        glowScale[i] = mass;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aGlowScale", new THREE.BufferAttribute(glowScale, 1));

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        }
    });

    const points = new THREE.Points(geo, material);
    points.frustumCulled = true;

    return points;
}