import React, { useRef, useEffect, useState } from 'react';

const DollarMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const [position, setPosition] = useState('bottom');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const updatePosition = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.bottom > viewportHeight) {
          setPosition('top');
        } else {
          setPosition('bottom');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    updatePosition();

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    "By Receipts",
    "By Users",
    "By Doctors",
    "إحصائيات حسب الأطباء ( النقدي والشركات )",
    "Totals by users (thermal roll)",
    "Totals by doctors (thermal roll)"
  ];

  return (
    <div 
      ref={menuRef}
      className={`absolute right-0 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 ${
        position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
      }`}
      style={{ transform: 'translateX(0%)' }}
    >
      {menuItems.map((item, index) => (
        <div 
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          style={{ direction: item.includes('إحصائيات') ? 'rtl' : 'ltr' }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DollarMenu;