import React, { useState } from 'react';
import { ChevronDown, Printer, BookText, Clock, Calendar, Plus, Tag, User, Globe, ShoppingBag, BarChart2, FileText, DollarSign, Banknote } from 'lucide-react';
import { Tooltip } from './common/Tooltip';
import PatientSelector from './PatientSelector';
import PatientForm from './PatientForm';
import SalesBillForm from './SalesBillForm';
import RepositoryAssets from './RepositoryAssets';
import PrintMenu from './PrintMenu';
import WarehouseTransactions from './WarehouseTransactions';
import ItemsAndServices from './ItemsAndServices';
import DollarMenu from './DollarMenu';

const UpperToolbar = () => {
  const [isPatientFormOpen, setIsPatientFormOpen] = useState(false);
  const [isSalesBillFormOpen, setIsSalesBillFormOpen] = useState(false);
  const [isRepositoryAssetsOpen, setIsRepositoryAssetsOpen] = useState(false);
  const [isWarehouseTransactionsOpen, setIsWarehouseTransactionsOpen] = useState(false);
  const [isItemsAndServicesOpen, setIsItemsAndServicesOpen] = useState(false);
  const [showDollarMenu, setShowDollarMenu] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowActions(true);
  };

  const handleUserClick = () => {
    if (selectedPatient) {
      setShowActions(true);
    }
  };

  return (
    <div className="bg-white p-2 flex justify-between items-center border-b border-gray-300">
      <div className="flex items-center space-x-2">
        <Tooltip text="Add New Patient">
          <Plus size={20} onClick={() => setIsPatientFormOpen(true)} className="cursor-pointer" />
        </Tooltip>
        <Tooltip text="Tags">
          <Tag size={20} onClick={() => setIsSalesBillFormOpen(true)} className="cursor-pointer" />
        </Tooltip>
        <Tooltip text="User">
          <User 
            size={20} 
            onClick={handleUserClick}
            className={`cursor-pointer ${selectedPatient ? 'text-blue-600' : 'text-gray-400'}`}
          />
        </Tooltip>
        <PatientSelector 
          onPatientSelect={handlePatientSelect}
          showActions={showActions}
          onActionsClose={() => setShowActions(false)}
          selectedPatient={selectedPatient}
          setShowActions={setShowActions}
        />
        <div className="relative">
          <Tooltip text="Print">
            <Printer 
              size={20} 
              className="cursor-pointer"
              onClick={() => setShowPrintMenu(!showPrintMenu)}
            />
          </Tooltip>
          {showPrintMenu && <PrintMenu onClose={() => setShowPrintMenu(false)} />}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Tooltip text="Shopping Bag">
          <ShoppingBag 
            size={20} 
            className="cursor-pointer"
            onClick={() => setIsRepositoryAssetsOpen(true)}
          />
        </Tooltip>
        <Tooltip text="Charts">
          <BarChart2 
            size={20} 
            className="cursor-pointer"
            onClick={() => setIsWarehouseTransactionsOpen(true)}
          />
        </Tooltip>
        <Tooltip text="File Text">
          <FileText 
            size={20} 
            className="cursor-pointer"
            onClick={() => setIsItemsAndServicesOpen(true)}
          />
        </Tooltip>
        <div className="relative">
          <Tooltip text="Dollar">
            <DollarSign 
              size={20} 
              className="cursor-pointer"
              onClick={() => setShowDollarMenu(!showDollarMenu)}
            />
          </Tooltip>
          {showDollarMenu && <DollarMenu onClose={() => setShowDollarMenu(false)} />}
        </div>
        <Tooltip text="Cash Register"><Banknote size={20} /></Tooltip>
        <Tooltip text="Book"><BookText size={20} /></Tooltip>
        <Tooltip text="Clock"><Clock size={20} /></Tooltip>
        <Tooltip text="Calendar"><Calendar size={20} /></Tooltip>
      </div>
      <PatientForm isOpen={isPatientFormOpen} onClose={() => setIsPatientFormOpen(false)} />
      <SalesBillForm isOpen={isSalesBillFormOpen} onClose={() => setIsSalesBillFormOpen(false)} />
      {isRepositoryAssetsOpen && (
        <RepositoryAssets onClose={() => setIsRepositoryAssetsOpen(false)} />
      )}
      {isWarehouseTransactionsOpen && (
        <WarehouseTransactions onClose={() => setIsWarehouseTransactionsOpen(false)} />
      )}
      {isItemsAndServicesOpen && (
        <ItemsAndServices onClose={() => setIsItemsAndServicesOpen(false)} />
      )}
    </div>
  );
};

export default UpperToolbar;