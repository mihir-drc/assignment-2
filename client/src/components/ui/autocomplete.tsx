"use client";

import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface AutoSuggestProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function AutoSuggest({
  value,
  onChange,
  options,
}: AutoSuggestProps) {
  const [open, setOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { translations } = auth;
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value || translations.TYPE}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <Command>
          <CommandInput
            placeholder={translations.SEARCHORTYPE}
            value={value}
            onValueChange={onChange}
            onKeyDown={handleEnterPress}
          />
          <CommandList>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {option}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty className="p-2">
                {value
                  ? `${translations.PRESSENTERTOUSE} "${value}"`
                  : translations.TYPEANYTHING}
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
