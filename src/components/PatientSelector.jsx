import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import PatientActions from './PatientActions';

const PatientSelector = ({ onPatientSelect, showActions, onActionsClose, selectedPatient, setShowActions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const patients = [
    { fileNo: '6338', fileDate: '12/11/2024', customerName: 'نايفه عبدالله الحربي', englishName: 'NAYFAH ABDULLA Alharbi', doctorName: 'د.باسم فخري', mobile1: '0534440993', identityNumber: '1045314497', credit: '0', mobile2: '', insurance: '' },
    { fileNo: '6337', fileDate: '12/11/2024', customerName: 'ندى خالد الحسين', englishName: 'NADA Khalid Alhswn', doctorName: 'د.نهى الحميد', mobile1: '0509797975', identityNumber: '1171174921', credit: '0', mobile2: '', insurance: '' },
    { fileNo: '6336', fileDate: '12/11/2024', customerName: 'فارس خالد الحسين', englishName: 'FARES Khalid Alhswn', doctorName: 'د.نهى الحميد', mobile1: '0509797975', identityNumber: '1193965470', credit: '0', mobile2: '', insurance: '' },
  ];

  const handlePatientSelect = (patient) => {
    onPatientSelect(patient);
    setIsOpen(false);
    onActionsClose(); // Close any existing actions window
    setTimeout(() => {
      onPatientSelect(patient); // This will trigger the actions window to open
      setShowActions(true);
    }, 100);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div 
          className="flex items-center justify-between border rounded px-3 py-1.5 w-64 cursor-pointer bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${selectedPatient ? 'text-black' : 'text-gray-400'}`}>
            {selectedPatient ? selectedPatient.englishName : 'Select patient'}
          </span>
          <Search size={16} className="text-gray-400" />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-[800px] bg-white border border-gray-200 rounded shadow-lg">
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-1.5 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="overflow-auto max-h-[400px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border-b text-left w-12">File No.</th>
                    <th className="p-2 border-b text-left w-24">File Date</th>
                    <th className="p-2 border-b text-left">Customer name</th>
                    <th className="p-2 border-b text-left">English name</th>
                    <th className="p-2 border-b text-left">Doctor name</th>
                    <th className="p-2 border-b text-left w-24">Mobile 1</th>
                    <th className="p-2 border-b text-left w-24">Identity number</th>
                    <th className="p-2 border-b text-left w-16">Credit</th>
                    <th className="p-2 border-b text-left w-24">Mobile 2</th>
                    <th className="p-2 border-b text-left">Insurance</th>
                  </tr>
                </thead>
                <tbody>
                  {patients
                    .filter(patient => 
                      searchTerm === '' ||
                      patient.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      patient.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      patient.fileNo.includes(searchTerm) ||
                      patient.mobile1.includes(searchTerm) ||
                      patient.identityNumber.includes(searchTerm)
                    )
                    .map((patient) => (
                      <tr 
                        key={patient.fileNo}
                        className="hover:bg-blue-50 cursor-pointer"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <td className="p-2 border-b">{patient.fileNo}</td>
                        <td className="p-2 border-b">{patient.fileDate}</td>
                        <td className="p-2 border-b text-right">{patient.customerName}</td>
                        <td className="p-2 border-b">{patient.englishName}</td>
                        <td className="p-2 border-b text-right">{patient.doctorName}</td>
                        <td className="p-2 border-b">{patient.mobile1}</td>
                        <td className="p-2 border-b">{patient.identityNumber}</td>
                        <td className="p-2 border-b">{patient.credit}</td>
                        <td className="p-2 border-b">{patient.mobile2}</td>
                        <td className="p-2 border-b">{patient.insurance}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showActions && selectedPatient && (
        <PatientActions 
          patient={selectedPatient} 
          onClose={onActionsClose} 
        />
      )}
    </>
  );
};

export default PatientSelector;