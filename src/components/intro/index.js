import { Component } from "preact";
import styles from "./styles.styl";
import cn from "classnames";

const Intro = () => (
  <div class={cn("h-screen flex flex-col", styles.intro)}>
    <header class="flex justify-between xs uppercase">
      <div class="w-1/3">automatic writing</div>
      <ul class="w-5/12">
        <li>Britanka [critical & contextual studies]</li>
        <li>BA(Hons) Graphic Design</li>
        <li>British higher school of art & design</li>
      </ul>
      <div class="flex justify-between w-1/4">
        <ul>
          <li>Autumn + Winter 2019/2020</li>
          <li>Semester A</li>
        </ul>
        <button class={cn(styles.info, "rounded-full bg-white utility")}>i</button>
      </div>
    </header>
    <h1 class={cn("xxl uppercase", styles.header)}>
      aut<span class="xxlAlt">o</span>matic
      <br />
      <span class={cn("xxlAlt", styles.w)}>w</span>riti<span class={styles.ng}>n</span>
      <span class={cn("xxlAlt", styles.ng)}>g</span>
    </h1>
  </div>
);

export default Intro;
