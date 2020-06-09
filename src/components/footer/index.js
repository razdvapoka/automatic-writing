import styles from "./styles.styl";
import cn from "classnames";

const Footer = () => (
  <footer class={cn("px-4 pb-8 flex items-end xs uppercase", styles.footer)}>
    <div class="w-1/3">
      <div>Brief set by Tanya Ermolaeva</div>
      <div class="mt-1">In collaboration with Sebastian Campos</div>
    </div>
    <div class="w-5/12">
      <div>
        <a
          class="hover:text-acidgreen"
          href="https://sergeyzakharov.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          developed by Sergey Zakharov
        </a>
      </div>
      <div class="mt-1">
        <a
          class="hover:text-acidgreen"
          href="https://emolaeva.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          designed by Tanya Ermolaeva
        </a>
      </div>
    </div>
    <div class="w-1/4">
      <div>
        <a
          class="hover:text-acidgreen"
          href="https://www.instagram.com/bhsad/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow BHSAD instagram
        </a>
      </div>
      <div class="mt-1">Share</div>
    </div>
  </footer>
);

export default Footer;
