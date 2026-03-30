export const CAMERA_CONFIG = {
    FOV: 75,
    NEAR: 1,
    FAR: 5000,
    POSITION: { x: 0, y: 0, z: 255 },
    CONTROLS: {
        ENABLE_DAMPING: true,
        DAMPING_FACTOR: 0.05,
        MIN_DISTANCE: 77,
        MAX_DISTANCE: 444
    }
} as const;