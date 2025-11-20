"use client";

import { useState } from "react";

interface SortOption {
  label: string;
  value: "asc" | "desc" | "none";
}

interface SortProps {
  onChange: (value: "asc" | "desc" | "none") => void;
  label?: string;
}

export default function Sort({ onChange, label = "Sort by Name" }: SortProps) {
  const [value, setValue] = useState<"asc" | "desc" | "none">("none");

  const options: SortOption[] = [
    { label: "Default", value: "none" },
    { label: `${label} A → Z`, value: "asc" },
    { label: `${label} Z → A`, value: "desc" },
  ];

  const handleChange = (val: "asc" | "desc" | "none") => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className="flex mb-4 items-center gap-3">
      <span className="text-sm text-gray-600 whitespace-nowrap">Sort:</span>
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value as any)}
        className="border text-gray-600 border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}