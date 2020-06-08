import { arrayShuffle } from "@adriantombu/array-shuffle";
import { useIntersection } from "react-use";
import { useMemo, useEffect, useRef, useCallback, useState } from "preact/hooks";
import cn from "classnames";

import { randomArrItem } from "../../utils";
import styles from "./styles.styl";

const BG_COLORS = ["darkgreyBG", "greyBG", "lightgreyBG"];

const registry = {};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const ExcerptItem = ({
  id,
  width,
  shift,
  backgroundColor,
  sentence,
  groupIndex,
  itemIndex,
  ...rest
}) => {
  const [isTyped, setIsTyped] = useState(null);
  const regId = `${id}-${groupIndex}-${itemIndex}`;
  const ref = useRef();

  const type = useCallback(() => {
    setIsTyped(true);
    registry[regId].interval = window.setInterval(() => {
      const { maxCharIndex, lastCharIndex } = registry[regId];
      if (lastCharIndex < maxCharIndex && ref.current) {
        const charElements = ref.current.querySelectorAll(`.char`);
        charElements.forEach((charElement, charIndex) => {
          charElement.style.opacity = charIndex <= lastCharIndex ? 1 : 0;
        });
        registry[regId].lastCharIndex++;
      } else {
        window.clearInterval(registry[regId].interval);
      }
    }, 10);
  }, [ref, setIsTyped]);

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1
  });

  useEffect(() => {
    if (!isTyped && intersection && intersection.intersectionRatio === 1) {
      type();
    }
  }, [intersection, isTyped]);

  useEffect(() => {
    registry[regId] = { maxCharIndex: sentence.length, lastCharIndex: -1 };
  }, [sentence]);

  return (
    <div
      ref={ref}
      class="sentence"
      style={{
        width: `${width}%`,
        marginLeft: `${shift}%`
      }}
    >
      <span class={`text-darkgrey bg-${backgroundColor}`}>
        {sentence.map((char, charIndex) => (
          <span class="char opacity-0" key={`${groupIndex}-${itemIndex}-${charIndex}`}>
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};

const RefreshButton = ({ handleClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1
  });
  useEffect(() => {
    if (intersection) {
      setIsVisible(intersection.intersectionRatio === 1);
    }
  }, [intersection]);
  return (
    <button
      ref={ref}
      onClick={handleClick}
      class={cn("sticky utility right-0 overflow-hidden self-end mr-4 my-4", styles.refreshButton, {
        [styles.refreshButtonVisible]: isVisible
      })}
    >
      Refresh
    </button>
  );
};

const Excerpts = ({ id, items, backgroundColor }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const [groups, setGroups] = useState(null);
  const selectedItems = useMemo(() => {
    return arrayShuffle(items).slice(0, 10);
  }, [items, refreshKey]);

  useEffect(() => {
    const groupItems = selectedItems.map(item => {
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
  }, [selectedItems, setGroups]);

  return (
    <div class="xmAlt py-12 relative" style={{ backgroundColor }}>
      {groups &&
        groups.map((group, groupIndex) => (
          <div
            class="px-4"
            style={{
              background: group.gradient || "transparent"
            }}
          >
            {group.items.map((item, itemIndex) => (
              <ExcerptItem
                id={id}
                key={`${refreshKey}-${itemIndex}`}
                itemIndex={itemIndex}
                groupIndex={groupIndex}
                {...item}
              />
            ))}
          </div>
        ))}
      <div class="absolute left-0 top-0 w-full h-full flex justify-end">
        <RefreshButton handleClick={refresh} />
      </div>
    </div>
  );
};

export default Excerpts;
