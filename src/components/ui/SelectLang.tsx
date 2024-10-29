import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./Select.css";

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const SelectDemo = ({
  setValue,
  options,
  def,
}: {
  setValue: (e: any) => void;
  options: string[];
  def: string;
}) => (
  <Select.Root onValueChange={setValue}>
    <Select.Trigger className="SelectTrigger" aria-label="Food">
      <Select.Value placeholder={def} />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          {options.map((i) => (
            // eslint-disable-next-line react/jsx-key
            <SelectItem key={i} value={i}>
              {i}
            </SelectItem>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        // @ts-ignore
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default SelectDemo;
