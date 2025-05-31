import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BillContext } from '../context/BillContext';
import BillHeader from './BillHeader';
import ItemSelector from './ItemSelector';
import BillSummary from './BillSummary';

const AdminPage = () => {
  const { billData, totals, resetBill } = useContext(BillContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGenerateBill = () => {
    if (billData.items.length === 0) {
      setError('Please add at least one item');
      return;
    }
    navigate('/bill');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
      
      <BillHeader billNo={billData.billNo} date={billData.date} />
      
      <ItemSelector />
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-left">Item</th>
              <th className="py-2 px-4 border text-right">Rate</th>
              <th className="py-2 px-4 border text-right">Qty</th>
              <th className="py-2 px-4 border text-right">Amount</th>
              <th className="py-2 px-4 border text-right">GST (18%)</th>
              <th className="py-2 px-4 border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border text-right">₹{item.rate.toFixed(2)}</td>
                <td className="py-2 px-4 border text-right">{item.quantity}</td>
                <td className="py-2 px-4 border text-right">₹{item.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border text-right">₹{item.tax.toFixed(2)}</td>
                <td className="py-2 px-4 border text-right font-medium">₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <BillSummary totals={totals} />
      
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={resetBill}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={handleGenerateBill}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
};

export default AdminPage;