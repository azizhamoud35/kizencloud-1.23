import React from 'react';
import { Globe, Lock, Settings } from 'lucide-react';
import { Tooltip } from './common/Tooltip';
import { DropdownMenu } from './common/DropdownMenu';

const TopMenuBar = () => {
  const menuItems = {
    basicData: ["Clinics data", "Doctors", "Users and roles", "VAT management", "Set patient consultation", "Works and services", "Offers and discounts", "Categories expenses", "Update Ready Notes", "Design Custom Report", "Design Clinics Forms", "Basic data"],
    medicalFile: ["Patients statistics", "Patient balances and totals", "Medicine tree", "Patients visits", "External customers files", "Occupational Exam", "Agents And Drivers Exam", "Employment examination", "Custom Reports", "Medical Reports", "Prescriptions", "Patients in clinics", "Documents management", "Blocked files", "Patients notes"],
    accounting: ["مركز التقارير والاحصائيات", "Invoices services and Wroks", "Invoices", "Receipts", "Receipts chart", "Expenses", "Quotations / Temp Invoices", "Bank transactions", "Returns report", "VAT report for payment receipts", "Dental laboratories department", "Medical insurance", "Center revenue"],
    repositorys: ["Supplier information", "Repositorys List", "Repositorys items list", "New purchase invoices", "Open and edit purchase invoices", "Purchase invoices statistics", "Suppliers account statistics", "Repositorys transactions", "Repository assets", "Items has expiry dates", "Transport requests from the main repository"],
    administration: ["News bar texts", "Sequence forms", "Employees data", "Licensing data", "Dates nearing expiration", "Daily monitoring the movements of staff"],
    control: ["Set chat and notification", "Set current computer", "Set Kizen updater", "Set server connection settings", "Set date", "Set appointments", "Set sequence", "Set VAT", "Offers and discounts", "Set accounting", "Set EInvoice", "Set medical insurance system", "Set store", "Set administrative and employee settings", "Set printing paper", "Set patient's file", "Set medical file", "Set laboratory settings", "Set archives", "Set pharmacy settings", "Set company info", "Set other settings", "Backup"],
    sms: ["SMS policy", "Set SMS", "Set open file SMS", "Set appointment SMS", "Set analysis result SMS", "Set invoice payments SMS", "Set user notes SMS", "Set documents expired date SMS", "Set owner inform SMS", "ضبط رسالة التنبيه بانتهاء الرصيد", "Sms archive", "Sms report", "Sms ready texts", "Send Sms", "Send owner inform SMS", "Send message for all patients", "Send message patients by filters", "Balance Inquiry", "Charge SMS"],
    about: ["My Account", "Kizen programs policy of use", "About the system and license information", "Send Kizen purchase Request", "Kizen program tutorials", "Contact Technical Support", "Run the AnyDesk utility", "Run the TeamViewer utility", "Search for updates", "Updates logs"]
  };

  return (
    <div className="bg-gray-200 p-2 flex justify-between items-center">
      <div className="flex space-x-4">
        <DropdownMenu title="Basic data" items={menuItems.basicData} />
        <DropdownMenu title="Medical File" items={menuItems.medicalFile} />
        <DropdownMenu title="Accounting" items={menuItems.accounting} />
        <DropdownMenu title="Repositorys" items={menuItems.repositorys} />
        <DropdownMenu title="Administration" items={menuItems.administration} />
        <DropdownMenu title="Control" items={menuItems.control} />
        <DropdownMenu title="SMS" items={menuItems.sms} />
        <DropdownMenu title="About" items={menuItems.about} />
      </div>
      <div className="flex space-x-2">
        <Tooltip text="Language"><Globe size={16} /></Tooltip>
        <Tooltip text="Security"><Lock size={16} /></Tooltip>
        <Tooltip text="Settings"><Settings size={16} /></Tooltip>
      </div>
    </div>
  );
};

export default TopMenuBar;