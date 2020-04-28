import { useEffect, useRef, useCallback, useState } from "preact/hooks";
import styles from "./styles.styl";
import cn from "classnames";
import { randomArrItem } from "../../utils";

const BG_COLORS = ["darkgreyBG", "greyBG", "lightgreyBG"];

const registry = {};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const Excerpts = ({ id, items, backgroundColor }) => {
  const ref = useRef();
  const [isOnTop, setIsOnTop] = useState(false);
  const [groups, setGroups] = useState(null);

  const type = useCallback(() => {
    registry[id].interval = window.setInterval(() => {
      const { maxCharIndex, lastCharIndex } = registry[id];
      if (lastCharIndex < maxCharIndex) {
        const itemElements = ref.current.querySelectorAll(`.sentence`);
        itemElements.forEach(itemElement => {
          const charElements = itemElement.querySelectorAll(`.char`);
          charElements.forEach((charElement, charIndex) => {
            charElement.style.opacity = charIndex <= lastCharIndex ? 1 : 0;
          });
        });
        registry[id].lastCharIndex++;
      } else {
        window.clearInterval(registry[id].interval);
      }
    }, 10);
  }, [ref]);

  const updateIsOnTop = useCallback(() => {
    if (ref.current) {
      const { top } = ref.current.getBoundingClientRect();
      if (top <= 0) {
        setIsOnTop(true);
        type();
        window.removeEventListener("scroll", updateIsOnTop);
      }
    }
  }, [setIsOnTop, ref, type]);

  useEffect(() => {
    window.addEventListener("scroll", updateIsOnTop);
    return () => {
      window.removeEventListener("scroll", updateIsOnTop);
    };
  }, []);

  useEffect(() => {
    const newMaxCharIndex = Math.max(...items.map(item => item.length));
    registry[id] = { maxCharIndex: newMaxCharIndex, lastCharIndex: -1 };
    const groupItems = items.map(item => {
      const width = 60 + Math.random() * 40;
      const shift = Math.random() * (100 - width);
      const backgroundColor = randomArrItem(BG_COLORS);
      return {
        sentence: item,
        width,
        shift,
        backgroundColor
      };
    });
    setGroups(
      chunk(groupItems, 2).map(g => {
        /*
        const first = Math.floor(Math.random() * 100);
        const second = Math.floor(first + Math.random() * (100 - first));
        const third = Math.floor(second + Math.random() * (100 - second));
        const gradient = `linear-gradient(270deg, #696969 0%, #CDCDCD ${first}%, #FDFDFD ${second}%, #DDDDDD ${third}%, #B4B4B4 100%)`;
        */
        const gradient =
          Math.random() > 0.5
            ? `linear-gradient(270deg, #696969 0%, #CDCDCD 30%, #FDFDFD 60%, #DDDDDD 80%, #B4B4B4 100%)`
            : null;
        return {
          gradient,
          items: g
        };
      })
    );
  }, [items, setGroups]);

  return (
    <div class="xmAlt py-4" ref={ref} style={{ backgroundColor }}>
      {groups &&
        groups.map((group, groupIndex) => (
          <div
            class={cn("px-4", { [styles.groupWithBg]: groupIndex % 2 !== 0 })}
            style={{
              background: group.gradient || "transparent"
            }}
          >
            {group.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                class="sentence"
                style={{
                  width: `${item.width}%`,
                  marginLeft: `${item.shift}%`
                }}
              >
                <span class={`text-darkgrey bg-${item.backgroundColor}`}>
                  {item.sentence.map((char, charIndex) => (
                    <span class="char opacity-0" key={`${groupIndex}-${itemIndex}-${charIndex}`}>
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Excerpts;
