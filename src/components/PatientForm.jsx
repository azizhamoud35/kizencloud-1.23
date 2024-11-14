import React from 'react';
import { X, Save, Send, MessageCircle, FileText, PenTool, Image, File, CreditCard, MoreVertical } from 'lucide-react';

const ActionButton = ({ label, primary, icon: Icon }) => (
  <button className={`flex items-center px-2 py-1 rounded text-xs ${primary ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
    {Icon && <Icon size={16} className="mr-1" />}
    {label}
  </button>
);

const FormField = ({ label, required, type = "text", className = "" }) => (
  <div className={`flex items-center space-x-2 mb-1 ${className}`}>
    <label className={`text-xs ${required ? "text-red-500" : ""} w-1/3`}>{label}</label>
    {type === "select" ? (
      <select className="border p-1 text-xs w-2/3">
        <option>Select...</option>
      </select>
    ) : type === "checkbox" ? (
      <input type="checkbox" className="ml-2" />
    ) : (
      <input type={type} className="border p-1 text-xs w-2/3" />
    )}
  </div>
);

const PatientForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[1295px] h-[680px] overflow-auto relative">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="flex space-x-2">
            <ActionButton label="Save" icon={Save} primary />
            <ActionButton label="Send to doctor" icon={Send} />
            <ActionButton label="SMS" icon={MessageCircle} />
            <ActionButton label="Invoice" icon={FileText} />
            <ActionButton label="E-signature" icon={PenTool} />
            <ActionButton label="Images" icon={Image} />
            <ActionButton label="Documents" icon={File} />
            <ActionButton label="Card" icon={CreditCard} />
            <ActionButton label="Other actions" icon={MoreVertical} />
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-[0.9fr_0.9fr_1.2fr] gap-4">
          <div className="border-r pr-4">
            <FormField label="Arabic Name :" required />
            <FormField label="English name :" required />
            <FormField label="Age :" required type="number" />
            <FormField label="Doctor name :" required type="select" />
            <FormField label="Gender :" required type="select" />
            <FormField label="Nationality :" required type="select" />
            <FormField label="Job :" type="select" />
            <FormField label="Social status :" type="select" />
            <FormField label="City :" type="select" />
            <FormField label="Address :" required type="select" />
            <FormField label="Identity type :" required type="select" />
            <FormField label="ID Number :" required />
            <FormField label="Mobile 1 :" required />
            <FormField label="Mobile 2 :" />
            <FormField label="Phone 1 :" />
            <FormField label="Phone 2 :" />
            <FormField label="Job Source :" type="select" />
            <FormField label="VAT No. :" />
          </div>

          <div className="border-r px-4">
            <FormField label="Customer Level :" type="select" />
            <FormField label="Patient source :" required type="select" />
            <FormField label="Source details :" />
            <FormField label="Shared Doctors :" type="select" />
            <FormField label="Xtra file no. :" />
            <FormField label="No. of Children :" type="number" />
            <FormField label="Qualification :" type="select" />
            <FormField label="Email 1 :" type="email" />
            <FormField label="Email 2 :" type="email" />
            <FormField label="Watt's up :" />
            <FormField label="Facebook :" />
            <FormField label="Website :" />
            <FormField label="Default discount % :" type="number" />
            <div className="flex flex-col mt-2">
              <label>Note :</label>
              <textarea className="border p-1 h-20 text-sm" />
            </div>
          </div>

          <div className="pl-4">
            <FormField label="Insurance company :" type="select" />
            <FormField label="Policy number :" />
            <div className="flex space-x-2">
              <FormField label="Policy name :" className="w-2/3" />
              <FormField label="Class :" type="select" className="w-1/3" />
            </div>
            <div className="flex space-x-2">
              <FormField label="Membership Number :" className="w-2/3" />
              <FormField label="Relationship :" type="select" className="w-1/3" />
            </div>

            <div className="flex items-center space-x-4">
              <FormField label="Discount card expiry :" type="date" className="w-1/2" />
              <button className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">Delete insurance data</button>
            </div>

            <div className="flex space-x-2">
              <FormField label="File type :" type="select" className="w-2/3" />
              <FormField label="Sequence :" className="w-1/3" />
            </div>
            <FormField label="Surety passport :" />
            <FormField label="Father Identity :" />
            <FormField label="Mother Identity :" />
            <div className="flex space-x-2">
              <FormField label="Blood group :" type="select" className="w-1/2" />
              <FormField label="Other Identity :" className="w-1/2" />
            </div>
            <FormField label="Surety name :" />
            <FormField label="Surety details :" />
            <FormField label="Surety number :" />
            <div className="flex space-x-2">
              <FormField label="Relative name :" className="w-2/3" />
              <FormField label="Phone :" className="w-1/3" />
            </div>
            <FormField label="GLN No. :" />
            <div className="flex space-x-2">
              <FormField label="Weight (kg) :" type="number" className="w-1/2" />
              <FormField label="Baldi Order No. :" className="w-1/2" />
            </div>

            <div className="mt-2 grid grid-cols-[1fr_1fr_1.2fr] gap-2">
              <div className="flex items-center space-x-1 justify-start">
                <input type="checkbox" id="block-sms" className="ml-0" />
                <label htmlFor="block-sms" className="text-xs whitespace-nowrap">Block SMS</label>
              </div>
              <div className="flex items-center space-x-1 justify-start">
                <input type="checkbox" id="block-appointments" className="ml-0" />
                <label htmlFor="block-appointments" className="text-xs whitespace-nowrap">Block Appointments</label>
              </div>
              <div className="flex items-center space-x-1 justify-start">
                <input type="checkbox" id="block-invoices" className="ml-0" />
                <label htmlFor="block-invoices" className="text-xs whitespace-nowrap">Block Invoices</label>
              </div>
              <div className="flex items-center space-x-1 justify-start">
                <input type="checkbox" id="block-file" className="ml-0" />
                <label htmlFor="block-file" className="text-xs whitespace-nowrap">Block File</label>
              </div>
              <div className="flex items-center space-x-1 justify-start">
                <input type="checkbox" id="electronic-signature" className="ml-0" />
                <label htmlFor="electronic-signature" className="text-xs whitespace-nowrap">Electronic Signature</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 border-t pt-2">
          <div className="flex space-x-4">
            <div>User: admin</div>
            <div>Edit</div>
            <div>File No.: -1</div>
          </div>
          <div>
            File Date: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;