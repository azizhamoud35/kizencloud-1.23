import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, Printer, Calculator, FileText, Search } from 'lucide-react';

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

const DateInput = ({ value, onChange, className }) => (
  <input
    type="datetime-local"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`px-2 py-1 border rounded text-sm ${className}`}
  />
);

const WarehouseTransactions = ({ onClose }) => {
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    fromDate: '2024-11-14T12:00',
    toDate: '2024-11-14T23:59',
    byStore: false,
    bySupplier: false,
    byType: false,
    byItem: false,
    byExpiryDate: false
  });

  const [activeTab, setActiveTab] = useState('transactions');

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
    { type: 'Purchase', date: '2024-11-14', code: 'TRX001', sourceCode: 'SUP123', name: 'Paracetamol 500mg', group: 'Pain Relief', invoice: 'INV001', warehouse: 'Main', expiryDate: '2025-11-14', inputPrice: 12.50, inputQty: 100, inputTotal: 1250.00, outputPrice: 0, outputQty: 0, outputTotal: 0 },
    { type: 'Sale', date: '2024-11-14', code: 'TRX002', sourceCode: 'SUP124', name: 'Amoxicillin 250mg', group: 'Antibiotics', invoice: 'INV002', warehouse: 'Main', expiryDate: '2025-10-15', inputPrice: 0, inputQty: 0, inputTotal: 0, outputPrice: 15.00, outputQty: 50, outputTotal: 750.00 }
  ];

  const totals = sampleData.reduce((acc, item) => ({
    inputQty: acc.inputQty + item.inputQty,
    inputTotal: acc.inputTotal + item.inputTotal,
    outputQty: acc.outputQty + item.outputQty,
    outputTotal: acc.outputTotal + item.outputTotal
  }), { inputQty: 0, inputTotal: 0, outputQty: 0, outputTotal: 0 });

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-4 z-50">
      <div ref={modalRef} className="bg-white border border-gray-300 shadow-lg w-full max-w-[1200px] mx-4">
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-gray-200 border-b">
          <div className="flex items-center space-x-1">
            <img src="/favicon.svg" alt="" className="w-4 h-4" />
            <span className="text-sm">Warehouse Transactions</span>
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
          <ToolbarButton icon={Calculator} text="Calculate balance and profit" />
          <ToolbarButton icon={FileText} text="Open" />
          <ToolbarButton icon={Printer} text="Print" />
          <div className="flex-grow flex justify-end items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter text to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 px-2 py-0.5 border text-sm"
              />
              <Search size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-2 text-xs grid grid-cols-7 gap-2">
          <div className="flex items-center">
            <input type="checkbox" checked={true} readOnly className="mr-1" />
            <label>From Date</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.toDate} 
              onChange={(e) => setFilters({...filters, toDate: e.target.checked})}
              className="mr-1" 
            />
            <label>To Date</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.byStore} 
              onChange={(e) => setFilters({...filters, byStore: e.target.checked})}
              className="mr-1" 
            />
            <label>By Store</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.bySupplier} 
              onChange={(e) => setFilters({...filters, bySupplier: e.target.checked})}
              className="mr-1" 
            />
            <label>By Supplier</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.byType} 
              onChange={(e) => setFilters({...filters, byType: e.target.checked})}
              className="mr-1" 
            />
            <label>By Type</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.byItem} 
              onChange={(e) => setFilters({...filters, byItem: e.target.checked})}
              className="mr-1" 
            />
            <label>By Item</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.byExpiryDate} 
              onChange={(e) => setFilters({...filters, byExpiryDate: e.target.checked})}
              className="mr-1" 
            />
            <label>By expiry date</label>
          </div>

          <DateInput 
            value={filters.fromDate}
            onChange={(value) => setFilters({...filters, fromDate: value})}
            className="col-span-1"
          />
          <DateInput 
            value={filters.toDate}
            onChange={(value) => setFilters({...filters, toDate: value})}
            className="col-span-1"
          />
          <Select
            options={[{ value: '', label: '' }]}
            value=""
            onChange={() => {}}
            className="col-span-1"
          />
          <Select
            options={[{ value: '', label: '' }]}
            value=""
            onChange={() => {}}
            className="col-span-1"
          />
          <Select
            options={[{ value: '', label: '' }]}
            value=""
            onChange={() => {}}
            className="col-span-1"
          />
          <Select
            options={[{ value: '', label: '' }]}
            value=""
            onChange={() => {}}
            className="col-span-1"
          />
          <Select
            options={[{ value: '', label: '' }]}
            value=""
            onChange={() => {}}
            className="col-span-1"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-1 text-sm ${activeTab === 'transactions' ? 'bg-white border-t border-x' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Warehouse Transactions
          </button>
          <button 
            className={`px-4 py-1 text-sm ${activeTab === 'summaryByItem' ? 'bg-white border-t border-x' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('summaryByItem')}
          >
            Warehouse Transactions Summary By Item
          </button>
          <button 
            className={`px-4 py-1 text-sm ${activeTab === 'summaryByStore' ? 'bg-white border-t border-x' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('summaryByStore')}
          >
            Warehouse Transactions Summary By Store
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-grow" style={{ height: 'calc(100vh - 320px)' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1 border text-left">Type</th>
                <th className="p-1 border text-left">Transaction date ▼</th>
                <th className="p-1 border text-left">Code</th>
                <th className="p-1 border text-left">Source Code</th>
                <th className="p-1 border text-left">Name</th>
                <th className="p-1 border text-left">Group</th>
                <th className="p-1 border text-left">Invoice</th>
                <th className="p-1 border text-left">Warehouse</th>
                <th className="p-1 border text-left">Expired date</th>
                <th className="p-1 border text-center" colSpan="3">Input</th>
                <th className="p-1 border text-center" colSpan="3">Output</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="p-1 border" colSpan="9"></th>
                <th className="p-1 border text-right">Price</th>
                <th className="p-1 border text-right">Qty.</th>
                <th className="p-1 border text-right">Total</th>
                <th className="p-1 border text-right">Price</th>
                <th className="p-1 border text-right">Qty.</th>
                <th className="p-1 border text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-1 border">{item.type}</td>
                  <td className="p-1 border">{item.date}</td>
                  <td className="p-1 border">{item.code}</td>
                  <td className="p-1 border">{item.sourceCode}</td>
                  <td className="p-1 border">{item.name}</td>
                  <td className="p-1 border">{item.group}</td>
                  <td className="p-1 border">{item.invoice}</td>
                  <td className="p-1 border">{item.warehouse}</td>
                  <td className="p-1 border">{item.expiryDate}</td>
                  <td className="p-1 border text-right">{item.inputPrice.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.inputQty}</td>
                  <td className="p-1 border text-right">{item.inputTotal.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.outputPrice.toFixed(2)}</td>
                  <td className="p-1 border text-right">{item.outputQty}</td>
                  <td className="p-1 border text-right">{item.outputTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t p-1 flex items-center justify-between bg-gray-100">
          <div className="text-sm">From Date: 14/11/2024</div>
          <div className="flex space-x-4">
            <input type="text" value={totals.inputQty} readOnly className="w-16 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.inputTotal.toFixed(2)} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.outputQty} readOnly className="w-16 px-2 py-0.5 border text-right bg-white" />
            <input type="text" value={totals.outputTotal.toFixed(2)} readOnly className="w-20 px-2 py-0.5 border text-right bg-white" />
          </div>
          <div className="w-20"></div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-25 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default WarehouseTransactions;