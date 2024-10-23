import React from "react";
import Image from "next/image";
import { CheckIcon } from "@radix-ui/react-icons";

const ToggleItem = ({
  item,
  add,
  remove,
}: {
  item: ToggleItem;
  add: (id: string) => void;
  remove: (id: string) => void;
}) => (
  <button
    onClick={() => {
      item.isSelected ? remove(item.id) : add(item.id);
    }}
    className="Tag flex w-full items-center"
    key={item.id}
  >
    <div className="w-10">{item.isSelected ? <CheckIcon /> : null}</div>
    <div className="flex justify-start items-center grow">
      {item.avatar ? (
        // eslint-disable-next-line react/jsx-no-undef
        <Image src={item.avatar} alt="" width={35} height={35} />
      ) : null}
      <div
        contentEditable={false}
        style={{ userSelect: "none" }}
        className="p-1 font-medium mr-2"
      >
        {item.name}
      </div>
    </div>
  </button>
);

export default ToggleItem;
