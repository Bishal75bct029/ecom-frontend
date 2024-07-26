import React from 'react';

interface DropdownProps {
  items: { value: string; label: string }[];
  selectedItem: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, selectedItem, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor="dynamic-dropdown">{placeholder}</label>
      <select id="dynamic-dropdown" value={selectedItem} onChange={onChange}>
        <option value="" disabled>
          Select an item
        </option>
        {items.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
