import React, { useRef, useEffect } from 'react';

const PrintMenu = ({ onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { label: "The patient's file", type: "header" },
    { label: "Account statement" },
    { label: "Payments statement" },
    { label: "Print card" },
    { label: "Print label" },
    { label: "divider" },
    { label: "Schedule and visits" },
    { label: "Dental clinics report" },
    { label: "Dental lab report" },
    { label: "Patient medical visits report" },
    { label: "Patient analytics report" },
    { label: "Patient prescriptions report" },
    { label: "divider" },
    { label: "Master patient file" }
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg z-50"
    >
      {menuItems.map((item, index) => {
        if (item.type === "header") {
          return (
            <div 
              key={index}
              className="px-4 py-2 font-semibold bg-gray-50 border-b"
            >
              {item.label}
            </div>
          );
        } else if (item.label === "divider") {
          return <hr key={index} className="my-1 border-gray-200" />;
        } else {
          return (
            <div 
              key={index}
              className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.label}
            </div>
          );
        }
      })}
    </div>
  );
};

export default PrintMenu;