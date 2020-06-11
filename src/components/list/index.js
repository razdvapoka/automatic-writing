import Fog from "../fog";
import styles from "./styles.styl";
import cn from "classnames";

const List = ({ items, listId }) => {
  return (
    <div class={cn("relative py-20 sm:pt-3 sm:pb-10 px-4", styles.list)} id={listId}>
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
              class="flex sm:flex-col"
            >
              <div class="w-1/3 sm:w-full">{name}</div>
              <div class="w-7/12 sm:w-11/12 sm:mt-2">{title}</div>
              <div class="w-1/12 sm:w-full view-essay text-acidgreen sm:mt-2">view</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
