import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Plus, FileText, Eye, Settings, Printer, Search } from 'lucide-react';

const ToolbarButton = ({ icon: Icon, text }) => (
  <button className="flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-50">
    <Icon size={16} className="mr-1" />
    <span>{text}</span>
  </button>
);

const ItemsAndServices = ({ onClose }) => {
  const modalRef = useRef(null);
  const [searchCategories, setSearchCategories] = useState('');
  const [searchServices, setSearchServices] = useState('');

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

  const services = [
    { sn: '18987', code: '18987', source: '', name: 'كشف وفحص واستشارة', selling: '-200.00', group: 'Examination الكشف والتشخيص' },
    { sn: '1', code: 'F.Pros1', source: '', name: 'one esthetic veneer E.max وجهة فينير اماكس تجميلي', selling: '2000.00', group: 'Fixed Prosthodontics التركيبات الثابتة' },
    { sn: '2', code: 'F.Pros2', source: '', name: 'one esthetic veneer glass ceramic وجهة فينير جلاس سيراميك تجميلي', selling: '2500.00', group: 'Fixed Prosthodontics التركيبات الثابتة' },
    { sn: '3', code: 'F.Pros3', source: '', name: 'metal crown تاج سير معدني', selling: '300.00', group: 'Fixed Prosthodontics التركيبات الثابتة' }
  ];

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-4 z-50">
      <div ref={modalRef} className="bg-white border border-gray-300 shadow-lg w-full max-w-[1200px] mx-4">
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-gray-200 border-b">
          <div className="flex items-center space-x-1">
            <img src="/favicon.svg" alt="" className="w-4 h-4" />
            <span className="text-sm">A list of items and services and categories</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-gray-300">−</button>
            <button className="p-1 hover:bg-gray-300">□</button>
            <button onClick={onClose} className="p-1 hover:bg-red-500 hover:text-white">×</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-1 p-1 border-b bg-gray-100">
          <ToolbarButton icon={Plus} text="Parent group" />
          <ToolbarButton icon={Plus} text="Sub group" />
          <ToolbarButton icon={FileText} text="Update" />
          <div className="border-l mx-2 h-6"></div>
          <ToolbarButton icon={Plus} text="New item" />
          <ToolbarButton icon={FileText} text="Update" />
          <ToolbarButton icon={RefreshCw} text="Refresh" />
          <ToolbarButton icon={Eye} text="View all" />
          <ToolbarButton icon={Settings} text="Disabled" />
          <ToolbarButton icon={Settings} text="Group" />
          <ToolbarButton icon={FileText} text="Price list" />
          <ToolbarButton icon={Printer} text="Export" />
          <ToolbarButton icon={Settings} text="Other" />
        </div>

        <div className="flex">
          {/* Left panel - Categories */}
          <div className="w-1/3 border-r">
            <div className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder=".. Click here to search in categories .."
                  value={searchCategories}
                  onChange={(e) => setSearchCategories(e.target.value)}
                  className="w-full px-2 py-1 border text-sm"
                />
                <Search size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="overflow-auto" style={{ height: 'calc(100vh - 320px)' }}>
              <div className="text-sm">
                <div className="flex items-center px-2 py-1 hover:bg-gray-100">
                  <span className="mr-2">−</span>
                  <span>Dental Services خدمات الأسنان</span>
                </div>
                <div className="pl-6">
                  <div className="px-2 py-1 hover:bg-gray-100">Examination الكشف والتشخيص</div>
                  <div className="px-2 py-1 hover:bg-gray-100">Pediatric & Special Care الأطفال والاحتياجات الخاصة</div>
                  <div className="px-2 py-1 hover:bg-gray-100">Restorative الحشوات</div>
                  <div className="px-2 py-1 hover:bg-gray-100">Fixed Prosthodontics التركيبات الثابتة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Services */}
          <div className="w-2/3">
            <div className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder=".. Click here to look at the business and services .."
                  value={searchServices}
                  onChange={(e) => setSearchServices(e.target.value)}
                  className="w-full px-2 py-1 border text-sm"
                />
                <Search size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="overflow-auto" style={{ height: 'calc(100vh - 320px)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 border text-left">SN</th>
                    <th className="p-2 border text-left">Code</th>
                    <th className="p-2 border text-left">Source</th>
                    <th className="p-2 border text-left">Name</th>
                    <th className="p-2 border text-right">Selling</th>
                    <th className="p-2 border text-left">Group</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.sn} className="hover:bg-gray-50">
                      <td className="p-2 border">{service.sn}</td>
                      <td className="p-2 border">{service.code}</td>
                      <td className="p-2 border">{service.source}</td>
                      <td className="p-2 border">{service.name}</td>
                      <td className="p-2 border text-right">{service.selling}</td>
                      <td className="p-2 border">{service.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-25 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default ItemsAndServices;