import { Component } from "preact";
import { Link } from "preact-router/match";
import cn from "classnames";

import Fog from "../fog";
import styles from "./styles.styl";

const Intro = () => {
  return (
    <div id="intro" class={cn(styles.intro, "pt-4 relative pb-10")}>
      <Fog canvasId="canvas" parentId="intro" />
      <header
        class={cn("z-50 fixed w-full px-4 flex justify-between xs uppercase", styles.fixedHeader)}
      >
        <div class="w-1/3">
          <Link href="/">automatic writing</Link>
        </div>
        <ul class="w-5/12">
          <li>Britanka [critical & contextual studies]</li>
        </ul>
        <div class="w-1/6">
          <ul>
            <li>Autumn + Winter 2019/2020</li>
          </ul>
        </div>
        <div class="w-1/12" />
      </header>
      <div class={cn("px-4 flex justify-between xs uppercase", styles.secondHeader)}>
        <div class="w-1/3"></div>
        <ul class="w-5/12">
          <li>BA(Hons) Graphic Design</li>
          <li>British higher school of art & design</li>
        </ul>
        <div class="w-1/6">
          <ul>
            <li>Semester A</li>
          </ul>
        </div>
        <div class="w-1/12" />
      </div>
      <div class="flex justify-end">
        <p class={cn("w-7/12 xm mt-9 text-darkgrey", styles.description)}>
          A semester-long exploration of the realtionship between language, media and design.
        </p>
        <div class="w-1/12" />
      </div>
      <h1 class="px-4 xxl uppercase text-lightgrey">
        automatic
        <br />
        writing
      </h1>
    </div>
  );
};

export default Intro;
