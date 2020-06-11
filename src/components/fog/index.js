import styles from "./styles.styl";
import { useCallback, useRef, useEffect, useState } from "preact/hooks";
import { Renderer, Program, Color, Mesh, Triangle } from "ogl";
import { useIntersection } from "react-use";
import cn from "classnames";

const registry = {};

const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;
const fragment = `
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform float uTime;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 3

float fbm ( in vec2 _st) {
    float v = 0.2;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st =
        _st * 2.0
        + shift
        ;
        a *= 0.5;
    }
    return v;
}

void main() {
    float cols = 2.0;
    vec2 st = vUv * cols;
    float speedCoeff = 0.3;

    vec3 color = vec3(0.0);

    vec2 q = vec2(0.0);
    q.x = fbm(st + speedCoeff * uTime);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.0);
    float rTimeCoeff = 0.15;
    float qCoeff = 1.0;
    r.x = fbm(st + qCoeff * q + rTimeCoeff * uTime);
    r.y = fbm(st + qCoeff * q + rTimeCoeff * uTime);

    float f = fbm(st + r);

    vec3 color1 = vec3(0.2, 0.2, 0.2);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    color = mix(color1,
                color2,
                clamp(f * 3.0, 0.0, 1.0));

    gl_FragColor = vec4(f * color, 1.0);
}
`;

const Fog = ({ canvasId, parentId }) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  const [state, setState] = useState(null);

  const resize = () => {
    if (state) {
      const intro = document.getElementById(parentId);
      const { width, height } = intro.getBoundingClientRect();
      state.renderer.setSize(width, height);
    }
  };

  const update = t => {
    if (registry[canvasId] !== "paused") {
      registry[canvasId] = requestAnimationFrame(update);
      state.program.uniforms.uTime.value = t * 0.001;
      state.renderer.render({ scene: state.mesh });
    }
  };

  const initShader = (canvasId, parentId) => {
    const canvas = document.getElementById(canvasId);
    const intro = document.getElementById(parentId);
    const { width, height } = intro.getBoundingClientRect();
    const renderer = new Renderer({ canvas, width, height });
    renderer.setSize(width, height);
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    renderer.render({ scene: mesh });
    return { renderer, program, mesh };
  };

  useEffect(() => {
    if (state) {
      registry[canvasId] = requestAnimationFrame(update);
      window.addEventListener("resize", resize, false);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, [state, resize, canvasId]);

  useEffect(() => {
    const shaderState = initShader(canvasId, parentId);
    setState(shaderState);
    return () => {
      cancelAnimationFrame(registry[canvasId]);
    };
  }, [canvasId, parentId, setState]);

  useEffect(() => {
    if (intersection) {
      if (intersection.intersectionRatio === 0) {
        cancelAnimationFrame(registry[canvasId]);
        registry[canvasId] = "paused";
      } else if (!registry[canvasId]) {
        registry[canvasId] = requestAnimationFrame(update);
      }
    }
  }, [intersection, canvasId]);

  return (
    <canvas
      ref={ref}
      id={canvasId}
      class={cn("absolute left-0 top-0 w-full h-full", styles.canvas)}
    />
  );
};

export default Fog;
