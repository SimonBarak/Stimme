import Button from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";

export type Item = { name: string; id: string };

export function DropdownMenuDemo({
  list,
  onAdd,
}: {
  list: Item[];
  onAdd: (id: string) => void;
}) {
  const unCheckedList = (list: Item[]) =>
    list.map((item) => {
      return { ...item, isChecked: false };
    });
  const [checkList, setCheckList] = useState(unCheckedList(list));

  useEffect(() => {
    setCheckList(unCheckedList(list));
  }, [list]);

  function checked(params: Item) {
    const index = checkList.findIndex((item) => item.id === params.id);
    const newList = [...checkList];
    newList[index].isChecked = !newList[index].isChecked;
    setCheckList(newList);

    if (newList[index].isChecked) {
      onAdd(params.id);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between">
          <div className="grow-1">Voices</div>
          <Button variant="outline">Add</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>Voices</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {checkList.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <DropdownMenuCheckboxItem
                key={item.id}
                checked={item.isChecked}
                onCheckedChange={() => checked(item)}
              >
                {item.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
