"use client";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent
} from "@/components/ui/select";

import React from "react";

interface Props {
  filters: {
    name: string;
    value: string;
  }[]; // making it an array
  otherClasses?: string;
  containerClasses?: string;
}
const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  return (
    <div className={`relative  ${containerClasses}`}>
      <Select>
        <SelectTrigger className={`${otherClasses} 
        body-regular light-border 
        background-light800_dark300
        text-dark500_light700
        no-focus border px-5 py-2`}>
        <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
        </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark400">
            <SelectGroup>
                {filters.map((item)=>(
                    <SelectItem key={item.value}
                    value={item.value}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
