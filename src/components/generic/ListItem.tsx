"use client";
import React from "react";
import Popover from "../ui/Popover";
import Select from "../ui/Select";
import Image from "next/image";

type ListItemProps = {
  item: Item;
  onApply: (item: Item) => void;
  onUpdate: (id: string, updatedItem: Partial<Item>) => void;
  onDelete: (id: string) => void;
};

const ListItem: React.FC<ListItemProps> = ({
  item,
  onUpdate,
  onDelete,
  onApply,
}) => {
  const handleNameChange = (value: string) => {
    onUpdate(item.id, { name: value });
  };

  const handleValueChange = (value: string) => {
    onUpdate(item.id, { value: value });
  };

  const handleDelete = (id: string) => {
    onDelete(item.id);
  };

  return (
    <div className="flex items-center menuItem">
      <div className="flex grow gap-2">
        <button
          onClick={() => onApply(item)}
          className="w-full px-2 py-2 flex gap-2 hover:bg-gray-300 rounded cursor-pointer"
        >
          <div className="flex gap-2">
            {item.avatar ? (
              <Image src={item.avatar} alt="" width={25} height={25} />
            ) : null}
            {item.name}
          </div>

          {item.value != "normal" ? <div>{item.value}</div> : null}
        </button>
      </div>
      {/* TODO: clean pop-over */}
      <Popover type="update">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex gap-2 justify-start items-center">
            <div className="label w-16">Name</div>
            <input
              className="max-w-24"
              type="text"
              value={item.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="label w-16">Value</div>
            {item.options ? (
              <Select
                options={item.options}
                defaulto={item.value}
                setValue={(value: string) => handleValueChange(value)}
              />
            ) : (
              <div className="text-gray-500">No options</div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ListItem;
