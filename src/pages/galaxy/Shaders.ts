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
    gl_PointSize = finalSize * uPixelRatio * (200.0 / vDistance);
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

    // Tạo hình tròn cho hạt
    if (d > 0.5) discard;

    // Hiệu ứng phát sáng tâm (core) và quầng (halo)
    float d_exp_core = exp(-d * 40.0); 
    float d_exp_halo = exp(-d * 15.0);

    vec3 finalColor = mix(vColor, vec3(1.0), d_exp_core * 0.4);
    finalColor *= (d_exp_core + d_exp_halo * 0.2);
    
    // Alpha dựa trên độ nhòe viền hạt
    float alpha = smoothstep(0.5, 0.2, d);

    // Làm mờ nhẹ nếu hạt ở quá sát mắt (vDistance nhỏ) để tránh bị vỡ hình
    float nearFade = smoothstep(0.0, 0.5, vDistance);
    
    gl_FragColor = vec4(finalColor, alpha * nearFade);
  }
`;