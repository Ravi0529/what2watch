import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  children: React.ReactNode;
}

interface MultiSelectItemProps {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: (val: string) => void;
}

export function MultiSelect({
  values,
  onChange,
  placeholder,
  children,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between bg-white border border-gray-300 shadow-sm rounded-xl px-4 py-3 text-base font-medium text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
        >
          <span className="truncate max-w-[70vw] md:max-w-[20vw]">
            {values.length > 0 ? values.join(", ") : placeholder || "Select"}
          </span>
          <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-60 text-yellow-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[220px] max-w-[95vw] p-0 bg-white border border-gray-200 shadow-lg rounded-xl mt-2">
        <Command>
          <CommandGroup>
            {React.Children.map(children, (child) => {
              if (
                React.isValidElement<MultiSelectItemProps>(child) &&
                typeof child.props.value === "string"
              ) {
                return React.cloneElement(child, {
                  selected: values.includes(child.props.value),
                  onSelect: toggleValue,
                });
              }
              return null;
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function MultiSelectItem({
  value,
  children,
  selected = false,
  onSelect,
}: MultiSelectItemProps) {
  return (
    <CommandItem
      key={value}
      onSelect={() => onSelect?.(value)}
      className={cn(
        "cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-base text-gray-800",
        selected
          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300"
          : "hover:bg-gray-100 text-gray-800"
      )}
    >
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 mr-2 transition-all",
          selected ? "bg-yellow-400 text-white" : "bg-gray-100"
        )}
      >
        {selected && <Check className="h-4 w-4" />}
      </div>
      <span className="truncate">{children}</span>
    </CommandItem>
  );
}
