import styles from "./styles.styl";
import cn from "classnames";

const getBoxPositionOnScreenCenter = (width, height) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2
});

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
      <button
        class="mt-1 uppercase hover:text-acidgreen"
        onClick={() => {
          const params = {
            height: 400,
            width: 550,
            ...getBoxPositionOnScreenCenter(400, 550)
          };
          const config = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join(", ");
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${"https://automatic-writing.now.sh" ||
              document.location}`,
            "",
            config
          );
        }}
      >
        Share
      </button>
    </div>
  </footer>
);

export default Footer;
