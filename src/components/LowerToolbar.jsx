import React, { useState } from 'react';
import { MessageCircle, Calculator, Hourglass, Share2, Search, Building2, Heart, Users, FileText, Globe } from 'lucide-react';
import { Tooltip } from './common/Tooltip';
import WarehouseTransactions from './WarehouseTransactions';

const CustomIcon = ({ d, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none">
    <path d={d} />
  </svg>
);

const LowerToolbar = () => {
  const [showWarehouseTransactions, setShowWarehouseTransactions] = useState(false);

  return (
    <div className="bg-white p-2 flex justify-between items-center border-b border-gray-300">
      <div className="flex space-x-2 items-center">
        <Tooltip text="Timer"><CustomIcon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" size={20} /></Tooltip>
        <Tooltip text="Message"><MessageCircle size={20} /></Tooltip>
        <Tooltip text="Calculator"><Calculator size={20} /></Tooltip>
        <Tooltip text="Currency"><CustomIcon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" size={20} /></Tooltip>
        <Tooltip text="Hourglass"><Hourglass size={20} /></Tooltip>
        <Tooltip text="Share"><Share2 size={20} /></Tooltip>
        <Tooltip text="Search"><Search size={20} /></Tooltip>
        <Tooltip text="ATM"><CustomIcon d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" size={20} /></Tooltip>
      </div>
      <div className="flex space-x-2 items-center">
        <Tooltip text="Building"><Building2 size={20} /></Tooltip>
        <Tooltip text="Magnifier"><CustomIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" size={20} /></Tooltip>
        <Tooltip text="Heart"><Heart size={20} /></Tooltip>
        <Tooltip text="Globe"><Globe size={20} /></Tooltip>
        <Tooltip text="Users"><Users size={20} /></Tooltip>
        <Tooltip text="File Text"><FileText size={20} /></Tooltip>
        <Tooltip text="Chart">
          <CustomIcon 
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            size={20} 
            onClick={() => setShowWarehouseTransactions(true)}
          />
        </Tooltip>
      </div>
      {showWarehouseTransactions && (
        <WarehouseTransactions onClose={() => setShowWarehouseTransactions(false)} />
      )}
    </div>
  );
};

export default LowerToolbar;