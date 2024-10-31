import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import useList from "../hooks/useList";
import Popover from "../ui/Popover";
import Button from "../ui/Button";

type ListProps = {
  classes: string;
  title: string;
  initialItems: Item[];
  onApply: (item: Item) => void;
};

const List: React.FC<ListProps> = ({
  title,
  initialItems,
  onApply,
  classes,
}) => {
  const [items, setItems] = useState(initialItems);
  const { createItem, updateItem, deleteItem } = useList(
    initialItems,
    setItems
  );
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleCreate = () => {
    if (newName && newValue) {
      createItem({ name: newName, value: newValue });
      setNewName("");
      setNewValue("");
    }
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <div>
      <div className="flex w-full px-4 pt-4 pb-2 pr-2 justify-between items-center">
        <h2 className="label">{title}</h2>
        <Popover type="create">
          <div className="mb-2">
            <input
              className="Input"
              type="text"
              placeholder="New item name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="Input"
              type="text"
              placeholder="New item value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
          <Button size={"small"} onClick={handleCreate}>
            Add Item
          </Button>
        </Popover>
      </div>

      <div className={"p-2 pt-0 overflow-y-scroll " + classes}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
