import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import SelectLang from "./SelectLang";

interface PopoverBodyProps {
  fields: Field[];
}

const PopoverBody: React.FC<PopoverBodyProps> = ({ fields }) => (
  <div className="flex flex-col gap-2 text-sm">
    {fields.map((field) => (
      <fieldset className="Fieldset" key={field.id}>
        <label className="label w-24" htmlFor={field.id}>
          {field.label}
        </label>
        {field.editable ? (
          field.options ? (
            <SelectLang
              setValue={field.onChange}
              options={field.options}
              def={field.value ?? ""}
            />
          ) : (
            <input
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="Input"
              id={field.id}
            />
          )
        ) : (
          <div className="-">{field.value}</div>
        )}
      </fieldset>
    ))}
    <button className="PopoverClose" aria-label="Close">
      <Cross2Icon />
    </button>
  </div>
);

export default PopoverBody;
