import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, Calendar, DollarSign, MessageCircle, Camera, PenTool, File, Search } from 'lucide-react';

const ActionItem = ({ icon: Icon, children }) => (
  <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Icon size={16} className="mr-2 text-gray-600" />
    <span>{children}</span>
  </div>
);

const PatientActions = ({ patient, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);

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

  if (!patient) return null;

  const actions = [
    { icon: FileText, label: 'Open profile' },
    { icon: FileText, label: 'Open the medical file.' },
    { icon: Calendar, label: 'New appointment' },
    { icon: Calendar, label: 'View appointments' },
    { icon: DollarSign, label: 'New invoice' },
    { icon: DollarSign, label: 'View invoices' },
    { icon: FileText, label: 'Send the patient to the doctor' },
    { icon: MessageCircle, label: 'Send a text message to the customer' },
    { icon: MessageCircle, label: 'Open customer sent SMS' },
    { icon: Camera, label: 'Photo file' },
    { icon: PenTool, label: 'Electronic signature of the file' },
    { icon: File, label: 'File documents' },
    { icon: FileText, label: 'New temporary bill - quote' },
    { icon: FileText, label: 'Temporary bills - quotes' },
    { icon: FileText, label: 'Block patient' }
  ];

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
      <div ref={modalRef} className="bg-white rounded shadow-lg w-full max-w-[500px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b bg-gray-100">
          <div className="flex items-center">
            <span className="text-lg font-semibold">{`${patient.fileNo} - ${patient.customerName}`}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-2 p-2 border-b">
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Open</button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Pat. reports</button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Patient master file</button>
          <div className="relative flex-grow max-w-[200px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 text-sm border rounded pr-8"
            />
            <Search size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Actions List */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredActions.map((action, index) => (
            <ActionItem key={index} icon={action.icon}>
              {action.label}
            </ActionItem>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-2 text-xs text-gray-600">
          <div>Last bill: Date {patient.fileDate}, Time 07:36 PM</div>
          <div>Last entry: Date {patient.fileDate}, Time 07:36 PM for the center</div>
          <div>Last entry: Date {patient.fileDate}, Time 08:22 PM to the clinic</div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-25 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default PatientActions;