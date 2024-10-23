import * as React from "react";
import Image from "next/image";

const ListItem: React.FC<MenuItemProps> = ({ item, onClick, onRemove }) => (
  <button
    onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick(item.id)}
    className="flex justify-between items-center mb-4 px-4 gap-4 w-full border rounded"
  >
    {item.avatar ? (
      <Image src={item.avatar} alt="" width={35} height={35} />
    ) : (
      <div>👩🏽</div>
    )}

    <span className="w-full">{item.name}</span>

    {/* <div
      onClick={() => onRemove(item.id)}
      className="bg-red-500 text-white p-1 rounded"
    >
      Remove
    </div> */}
  </button>
);

type ListManagerProps = {
  items: MenuItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
};

function ListManager({ items, onAdd, onRemove, onClick }: ListManagerProps) {
  return (
    <div>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onClick={onClick}
        />
      ))}
      {/* <ToggleGroup type="single">
          {items.map((item) => (
            <ToggleGroupItem
              value={item.id}
              aria-label={item.name}
              key={item.id}
              onClick={() => onClick(item.id)}
            >
              <ListItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onClick={onClick}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup> */}
    </div>
  );
}

export default ListManager;
