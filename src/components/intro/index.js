import { Component } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Link } from "preact-router/match";
import cn from "classnames";
import FontFaceObserver from "fontfaceobserver";

import Fog from "../fog";
import styles from "./styles.styl";

const Intro = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    const font = new FontFaceObserver("FKRasterGroteskCompact-Blended");
    font.load().then(() => {
      setIsFontLoaded(true);
    });
  }, []);
  return (
    <div id="intro" class={cn(styles.intro, "pt-4 sm:pt-3 relative pb-10 sm:pb-1")}>
      <Fog canvasId="canvas" parentId="intro" />
      <header
        class={cn(
          "sm:hidden z-50 fixed w-full px-4 flex justify-between xs uppercase",
          styles.fixedHeader
        )}
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
      <div class={cn("sm:hidden px-4 flex justify-between xs uppercase", styles.secondHeader)}>
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
      <div class="hidden sm:flex xs uppercase px-2">
        <div class="w-1/2">
          <Link class={cn("fixed", styles.mobileHomeLink)} href="/">
            automatic writing
          </Link>
        </div>
        <div class={cn("w-1/2", styles.headerCol)}>
          <div>Britanka [critical & contextual studies]</div>
          <div class="mt-2">BA(Hons) Graphic Design</div>
          <div class="mt-2">Autumn + Winter 2019/2020</div>
        </div>
      </div>
      <div class="flex justify-end">
        <p class={cn("w-7/12 sm:w-full sm:px-2 xm mt-9 sm:mt-6 text-darkgrey", styles.description)}>
          A semester-long exploration of the realtionship between language, media and design.
        </p>
        <div class="w-1/12 sm:hidden" />
      </div>
      <h1
        class={cn(
          "max-w-full overflow-hidden px-4 sm:px-2 xxl uppercase text-lightgrey",
          isFontLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        auto
        <br class="hidden sm:inline" />
        matic
        <br />
        writing
      </h1>
    </div>
  );
};

export default Intro;
