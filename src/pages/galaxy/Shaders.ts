export const vertexShader = `
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aGlowScale;

  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vDistance;

  void main() {
    vColor = aColor;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPos = viewMatrix * worldPos;
    
    // Khoảng cách từ camera đến điểm
    vDistance = -mvPos.z;

    float sizeModifier = mix(1.0, 2.5, aGlowScale / 10.0);
    float finalSize = aSize * sizeModifier;

    // Kích thước hạt dựa trên khoảng cách (càng gần càng to)
    gl_PointSize = finalSize * uPixelRatio * (200.0 / max(abs(vDistance), 0.1));
    gl_Position = projectionMatrix * mvPos;
  }
`;

export const fragmentShader = `
  precision highp float; 
  varying vec3 vColor;
  varying float vDistance;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);

    if (d > 0.5) discard;

    float core = exp(-d * 30.0); 
    float halo = exp(-d * 10.0);

    vec3 finalColor = vColor * (halo + core);
    finalColor += vec3(0.2) * core; 
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, d);
  
    float intensity = 0.8; 
    
    gl_FragColor = vec4(finalColor * intensity, alpha);
  }
`;