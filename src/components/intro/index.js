import { Component } from "preact";
import styles from "./styles.styl";
import cn from "classnames";

const Intro = () => (
  <div class={cn(styles.intro, "pt-4 px-4 pb-20")}>
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

export default Intro;
