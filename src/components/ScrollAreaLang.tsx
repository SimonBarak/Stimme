import React, { useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./ScrollAreaLang.css";
import Button from "./ui/Button";
import ToggleListItem from "./ToggleListItem";
import { inputItemToItemToggle, toggleItemById } from "@/functions/helpers";

const ScrollAreaLang = ({
  items,
  selected,
  add,
  remove,
}: {
  items: Voice[];
  selected: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
}) => {
  const [toggleItems, setToggleItems] = useState<ToggleItem[]>([]);

  useEffect(() => {
    setToggleItems(inputItemToItemToggle(items, selected));
  }, [items, selected]);

  const toggle = (id: string) => {
    add(id);
    setToggleItems(toggleItemById(toggleItems, id));
  };

  const removeItem = (id: string) => {
    console.log("remove", id);
    remove(id);
    setToggleItems(toggleItemById(toggleItems, id));
  };

  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div style={{ padding: "0px 20px 50px" }}>
          {/* <div className="Text">Tags</div> */}
          {toggleItems.map((item) => (
            <ToggleListItem
              key={item.id}
              item={item}
              add={toggle}
              remove={removeItem}
            />
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
};

export default ScrollAreaLang;
