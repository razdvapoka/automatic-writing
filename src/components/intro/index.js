import { Component } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "./styles.styl";
import cn from "classnames";
import { Renderer, Program, Color, Mesh, Triangle } from "ogl";

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
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx + uTime) + uColor;
    gl_FragColor.a = 1.0;
  }
`;

const initShader = () => {
  const canvas = document.getElementById("canvas");
  const intro = document.getElementById("intro");
  const { width, height } = intro.getBoundingClientRect();
  const renderer = new Renderer({ canvas, width, height });
  const gl = renderer.gl;
  gl.clearColor(1, 1, 1, 1);
  const resize = () => {
    const { width, height } = intro.getBoundingClientRect();
    renderer.setSize(width, height);
  };
  window.addEventListener("resize", resize, false);
  resize();
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

  const update = t => {
    requestAnimationFrame(update);
    program.uniforms.uTime.value = t * 0.001;
    renderer.render({ scene: mesh });
  };
  const af = requestAnimationFrame(update);
  return () => {
    cancelAnimationFrame(af);
    window.removeEventListener("resize", resize);
  };
};

const Intro = () => {
  useEffect(initShader, []);
  return (
    <div id="intro" class={cn(styles.intro, "pt-4 px-4 pb-20 relative")}>
      <canvas id="canvas" class={cn("absolute left-0 top-0 w-full h-full", styles.canvas)} />
      <header class="flex justify-between xs uppercase">
        <div class="w-1/3">automatic writing</div>
        <ul class="w-5/12">
          <li>Britanka [critical & contextual studies]</li>
          <li>BA(Hons) Graphic Design</li>
          <li>British higher school of art & design</li>
        </ul>
        <div class="w-1/6">
          <ul>
            <li>Autumn + Winter 2019/2020</li>
            <li>Semester A</li>
          </ul>
        </div>
        <div class="w-1/12" />
      </header>
      <div class="flex justify-end">
        <p class={cn("w-7/12 xm mt-9 mb-12 text-darkgrey", styles.description)}>
          A semester-long exploration of the realtionship between language, media and design. A
          semester-long exploration of the realtionship between language, media and design. A
          semester-long exploration of the realtionship between language, media and design. A
          semester-long exploration of the realtionship between language, media and design.
        </p>
        <div class="w-1/12" />
      </div>
      <h1 class="xxl uppercase text-lightgrey">
        automatic
        <br />
        writing
      </h1>
    </div>
  );
};

export default Intro;
