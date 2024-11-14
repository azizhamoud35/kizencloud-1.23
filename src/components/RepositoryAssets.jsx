import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, Printer, FileText, Calendar, Search, Info } from 'lucide-react';

const ToolbarButton = ({ icon: Icon, text }) => (
  <button className="flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-50">
    <Icon size={16} className="mr-1" />
    <span>{text}</span>
  </button>
);

const Select = ({ options, value, onChange, className }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className={`px-2 py-1 border rounded text-sm ${className}`}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const RepositoryAssets = ({ onClose }) => {
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    presence: 'available',
    stores: 'warehouses',
    specifiedWarehouse: '',
    calculatePrice: 'average',
    calcDate: '',
    itemType: 'all',
    expiryDate: 'hide',
    expiryPeriod: 90
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const sampleData = [
    { id: 1, itemCode: 'MED001', sourceCode: 'SUP123', item: 'Paracetamol 500mg', group: 'Pain Relief', price: 12.50, quantity: 500, total: 6250.00, sale: 15.00, profit: 2.50 },
    { id: 2, itemCode: 'MED002', sourceCode: 'SUP124', item: 'Amoxicillin 250mg', group: 'Antibiotics', price: 25.00, quantity: 200, total: 5000.00, sale: 30.00, profit: 5.00 },
    { id: 3, itemCode: 'MED003', sourceCode: 'SUP125', item: 'Ibuprofen 400mg', group: 'Pain Relief', price: 15.00, quantity: 300, total: 4500.00, sale: 18.00, profit: 3.00 },
    { id: 4, itemCode: 'MED004', sourceCode: 'SUP126', item: 'Omeprazole 20mg', group: 'Gastric', price: 30.00, quantity: 150, total: 4500.00, sale: 35.00, profit: 5.00 },
    { id: 5, itemCode: 'MED005', sourceCode: 'SUP127', item: 'Cetirizine 10mg', group: 'Allergy', price: 8.00, quantity: 400, total: 3200.00, sale: 10.00, profit: 2.00 }
  ];

  const totals = sampleData.reduce((acc, item) => ({
    quantity: acc.quantity + item.quantity,
    total: acc.total + item.total,
    sale: acc.sale + (item.sale * item.quantity),
    profit: acc.profit + (item.profit * item.quantity)
  }), { quantity: 0, total: 0, sale: 0, profit: 0 });

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-4 z-50">
      <div ref={modalRef} className="bg-white border border-gray-300 shadow-lg w-full max-w-[1200px] mx-4">
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-gray-200 border-b">
          <div className="flex items-center space-x-1">
            <img src="/favicon.svg" alt="" className="w-4 h-4" />
            <span className="text-sm">Repository assets</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-gray-300">−</button>
            <button className="p-1 hover:bg-gray-300">□</button>
            <button onClick={onClose} className="p-1 hover:bg-red-500 hover:text-white">×</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-1 p-1 border-b bg-gray-100">
          <ToolbarButton icon={RefreshCw} text="Refresh" />
          <ToolbarButton icon={X} text="Clear quantity" />
          <ToolbarButton icon={Printer} text="Print" />
          <ToolbarButton icon={FileText} text="Show item transactions" />
          <ToolbarButton icon={Calendar} text="Items has expired date" />
          <ToolbarButton icon={Info} text="" />
          <div className="flex-grow flex justify-end items-center space-x-1">
            <div className="w-3 h-3 bg-green-400"></div>
            <div className="w-3 h-3 bg-green-600"></div>
            <div className="w-3 h-3 bg-yellow-500"></div>
            <div className="w-3 h-3 bg-red-500"></div>
            <div className="relative">
              <input
                type="text"
                placeholder=".. Click to search .."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 px-2 py-0.5 border text-sm"
              />
              <Search size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-2 text-xs">
          <div className="grid grid-cols-8 gap-x-2 mb-1">
            <label>Presence in the warehouse</label>
            <label>Stores</label>
            <label>Specified warehouse</label>
            <label>Calculate price by:</label>
            <label className="col-span-2">Calc on a specific date <span className="text-red-500">X</span></label>
            <label>Item type</label>
            <div className="flex space-x-1">
              <label className="flex-grow">Expiry date</label>
              <label className="w-16">Period</label>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-x-2">
            <Select
              options={[{ value: 'available', label: 'Available' }]}
              value={filters.presence}
              onChange={(value) => setFilters({ ...filters, presence: value })}
              className="w-full"
            />
            <Select
              options={[{ value: 'warehouses', label: 'Warehouses grouped' }]}
              value={filters.stores}
              onChange={(value) => setFilters({ ...filters, stores: value })}
              className="w-full"
            />
            <Select
              options={[{ value: '', label: '' }]}
              value={filters.specifiedWarehouse}
              onChange={(value) => setFilters({ ...filters, specifiedWarehouse: value })}
              className="w-full"
            />
            <Select
              options={[{ value: 'average', label: 'Average purchase' }]}
              value={filters.calculatePrice}
              onChange={(value) => setFilters({ ...filters, calculatePrice: value })}
              className="w-full"
            />
            <Select
              options={[{ value: '', label: '' }]}
              value={filters.calcDate}
              onChange={(value) => setFilters({ ...filters, calcDate: value })}
              className="col-span-2 w-full"
            />
            <Select
              options={[{ value: 'all', label: 'All' }]}
              value={filters.itemType}
              onChange={(value) => setFilters({ ...filters, itemType: value })}
              className="w-full"
            />
            <div className="flex space-x-1">
              <Select
                options={[{ value: 'hide', label: 'Hide expiry d...' }]}
                value={filters.expiryDate}
                onChange={(value) => setFilters({ ...filters, expiryDate: value })}
                className="flex-grow"
              />
              <input
                type="number"
                value={filters.expiryPeriod}
                onChange={(e) => setFilters({ ...filters, expiryPeriod: e.target.value })}
                className="w-16 px-1 py-1.5 border rounded-sm text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-grow" style={{ height: 'calc(100vh - 280px)' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-8 p-1 border text-center"><input type="checkbox" /></th>
                <th className="p-1 border text-left">Item Code</th>
                <th className="p-1 border text-left">Source Code</th>
                <th className="p-1 border text-left">Item</th>
                <th className="p-1 border text-left">Group</th>
                <th className="p-1 border text-right">Price</th>
                <th className="p-1 border text-right">Quantity ▼</th>
                <th className="p-1 border text-right">Total</th>
                <th className="p-1 border text-right">Sale</th>
                <th className="p-1 border text-right">Profit</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-1 border text-center"><input type="checkbox" /></td>
                  <td className="p-1 border">{item.itemCode}</td>
                  <td className="p-1 border">{item.sourceCode}</td>
                  <td className="p-1 border">{item.item}</td>
                  <td className="p-1 border">{item.group}</td>
                  <td className="p-1 border text-right">{item.price.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.quantity}</td>
                  <td className="p-1 border text-right">{item.total.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.sale.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.profit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t p-1 flex items-center justify-between bg-gray-100">
          <div className="flex items-center space-x-2">
            <button className="p-1 border bg-gray-200 hover:bg-gray-300">×</button>
            <input type="checkbox" className="ml-1" />
            <span className="text-sm">[Quantity] > '0.00'</span>
          </div>
          <div className="flex space-x-4">
            <input type="text" value={totals.quantity} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.total.toFixed(2)} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.sale.toFixed(2)} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.profit.toFixed(2)} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
          </div>
          <button className="text-sm text-blue-600 hover:underline">Edit Filter</button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-25 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default RepositoryAssets;