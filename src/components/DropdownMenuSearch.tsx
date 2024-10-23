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
import { Flex, Box, TextField } from "@radix-ui/themes";

import React, { useEffect, useState } from "react";
import Search from "./Search";

export type Item = { name: string; id: string };

export function DropdownMenuSearch({
  list,
  onAdd,
}: {
  list: Voice[];
  onAdd: (id: string) => void;
}) {
  const unCheckedList = (list: Voice[]) =>
    list.map((item) => {
      return { ...item, isChecked: false };
    });

  const [checkList, setCheckList] = useState(unCheckedList(list));

  // useEffect(() => {
  //   setCheckList(unCheckedList(list));
  // }, [list]);

  function checked(params: Voice) {
    const index = checkList.findIndex((item) => item.Name === params.Name);
    const newList = [...checkList];
    newList[index].isChecked = !newList[index].isChecked;
    setCheckList(newList);

    if (newList[index].isChecked) {
      onAdd(params.Name);
    }
  }

  function update(items: Voice[]) {
    setCheckList(unCheckedList(items));
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between">
          <div className="grow-1">Languages</div>
          <Button variant="outline">Select</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel></DropdownMenuLabel>
        <Search allItems={[]} update={update} />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {checkList.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <DropdownMenuCheckboxItem
                key={item.Name}
                checked={item.isChecked}
                onCheckedChange={() => checked(item)}
              >
                {item.Name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
