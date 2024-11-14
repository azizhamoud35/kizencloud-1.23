import React, { useState } from 'react';

export const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <span className="cursor-pointer hover:text-blue-600">{title}</span>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg z-10">
          {items.map((item, index) => (
            <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};