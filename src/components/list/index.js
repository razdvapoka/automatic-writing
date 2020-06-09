import Fog from "../fog";
import styles from "./styles.styl";
import cn from "classnames";

const List = ({ items, listId }) => {
  return (
    <div class={cn("relative py-20 px-4", styles.list)} id={listId}>
      {items.length > 0 && <Fog parentId={listId} canvasId={`${listId}-canvas`} />}
      <ul>
        {items.map(({ name, slug, title }, itemIndex) => (
          <li
            key={itemIndex}
            class={cn("uppercase xs text-black hover:text-acidgreen", styles.essay)}
          >
            <a
              href={`https://ccs1920.github.io/automatic-writing/${slug}`}
              rel="noopener noreferrer"
              target="_blank"
              class="flex"
            >
              <div class="w-1/3">{name}</div>
              <div class="w-7/12">{title}</div>
              <div class="w-1/12 view-essay text-acidgreen">view</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
