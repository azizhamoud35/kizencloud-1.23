import React, { useState } from 'react';
import { X } from 'lucide-react';

const SalesBillForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
    background: '#f0f0f0',
    cursor: 'pointer',
    fontSize: '0.875rem'
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
    width: '100%',
    fontSize: '0.875rem'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    paddingRight: '1.5rem',
    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23333\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E") no-repeat right 0.5rem center/0.75rem'
  };

  const iconButtonStyle = {
    ...buttonStyle,
    padding: '0.25rem',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  };

  const [tableRows, setTableRows] = useState([{ id: 0 }]);

  const addTableRow = () => {
    const newId = Math.max(...tableRows.map(row => row.id), 0) + 1;
    setTableRows([...tableRows, { id: newId }]);
  };

  const deleteTableRow = (idToDelete) => {
    setTableRows(tableRows.filter(row => row.id !== idToDelete));
  };

  const columnWidths = [
    '3%',    // Del.
    '6%',    // Code
    '6%',    // Source B.
    '18%',   // Service / Item (3x wider)
    '6%',    // Price
    '6%',    // Count
    '6%',    // Total
    '6%',    // Discount #
    '6%',    // Discount %
    '6%',    // Total Di...
    '7%',    // Net B. VAT
    '6%',    // VAT %
    '6%',    // VAT #
    '6%',    // Exemp...
    '6%',    // Net
    '2%'     // Plus icon column
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[1295px] h-[680px] overflow-auto relative">
        <div className="absolute top-2 right-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>A new sale Bill</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexGrow: 1 }}>
            {['Save - Print', 'Save - No print', 'Custom save', 'Discounts', 'Favorite', 'Offers'].map((text, index) => (
              <button key={index} style={buttonStyle}>{text}</button>
            ))}
          </div>
          <select style={{...selectStyle, width: 'auto', marginLeft: '0.5rem'}}>
            <option>المستودع الرئيسي</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input style={inputStyle} placeholder="Patient name" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="out" style={{ marginRight: '0.25rem' }} />
            <label htmlFor="out" style={{ fontSize: '0.875rem' }}>(out)</label>
          </div>
          <input style={inputStyle} placeholder="File No." />
          <select style={selectStyle}>
            <option>Doctor name</option>
          </select>
          <select style={selectStyle}>
            <option>Clinic</option>
          </select>
          <select style={selectStyle} defaultValue="admin">
            <option>admin</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          <input style={inputStyle} type="datetime-local" defaultValue="2024-10-06T11:35" />
          <input style={inputStyle} placeholder="Note" />
          <input style={inputStyle} placeholder="Invoice No." defaultValue="-1" />
          <input style={inputStyle} placeholder="ID Number" />
          <select style={selectStyle}>
            <option>Nationality</option>
          </select>
          <select style={selectStyle}>
            <option>Source</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="checkbox" id="isInsurance" style={{ marginRight: '0.25rem' }} />
            <label htmlFor="isInsurance" style={{ fontSize: '0.875rem' }}>Is Insurance</label>
          </div>
          <input style={{...inputStyle, flex: 1, marginRight: '0.5rem', marginBottom: '0.5rem', minWidth: '150px'}} placeholder="Main company" />
          <select style={{...selectStyle, flex: 1, marginRight: '0.5rem', marginBottom: '0.5rem', minWidth: '150px'}}>
            <option>Sub company</option>
          </select>
          {['Policy number', 'Class', 'Membership No', 'Endurance %', 'Max amount', 'Visit limit', 'Approval no.', 'Eligref No.'].map((placeholder, index) => (
            <input key={index} style={{...inputStyle, flex: 1, marginRight: '0.5rem', marginBottom: '0.5rem', minWidth: '150px'}} placeholder={placeholder} />
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                {['Del.', 'Code', 'Source B.', 'Service / Item', 'Price', 'Count', 'Total', 'Discount #', 'Discount %', 'Total Di...', 'Net B. VAT', 'VAT %', 'VAT #', 'Exemp...', 'Net', ''].map((header, index) => (
                  <th key={index} style={{ 
                    border: '1px solid #ccc', 
                    padding: '0.5rem', 
                    fontSize: '0.875rem', 
                    textAlign: 'left',
                    width: columnWidths[index]
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.id}>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem', width: columnWidths[0] }}>
                    <button 
                      onClick={() => deleteTableRow(row.id)} 
                      style={{...buttonStyle, padding: '0.25rem 0.5rem', width: '100%'}}
                    >
                      X
                    </button>
                  </td>
                  {columnWidths.slice(1, -1).map((width, cellIndex) => (
                    <td key={cellIndex} style={{ 
                      border: '1px solid #ccc', 
                      padding: '0.5rem',
                      width: width
                    }}>
                      <input style={{...inputStyle, padding: '0.25rem', width: '100%'}} />
                    </td>
                  ))}
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem', width: columnWidths[columnWidths.length - 1] }}>
                    {row.id === Math.max(...tableRows.map(r => r.id)) && (
                      <button onClick={addTableRow} style={{...iconButtonStyle, width: '100%'}}>+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input type="checkbox" id="setAsFavorite" style={{ marginRight: '0.25rem' }} />
            <label htmlFor="setAsFavorite" style={{ fontSize: '0.875rem' }}>Set As Favorite</label>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[...Array(6)].map((_, index) => (
              <input key={index} style={{...inputStyle, width: '4rem', marginLeft: '0.5rem', marginBottom: '0.5rem'}} defaultValue="0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBillForm;