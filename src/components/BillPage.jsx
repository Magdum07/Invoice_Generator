import { useRef, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { BillContext } from '../context/BillContext';
import BillHeader from './BillHeader';
import BillSummary from './BillSummary';
import UPIQRCode from './UPIQRCode';

const BillPage = () => {
  const { billData, totals, resetBill } = useContext(BillContext);
  const billRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => billRef.current, // Fixed: directly return the DOM node
    documentTitle: `Invoice_${billData.billNo}`,
    onBeforeGetContent: () => console.log('Preparing print content'),
    onPrintError: () => console.log('Print error occurred')
  });

  const handleNewBill = () => {
    resetBill();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Buttons moved OUTSIDE of printable area */}
      <div className="mb-6 flex justify-end gap-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Print Bill
        </button>
        <button
          onClick={handleNewBill}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition cursor-pointer"
        >
          New Bill
        </button>
      </div>
      
      {/* Printable content with ref */}
      <div ref={billRef} className="bg-white p-8 border shadow-none">
        <BillHeader billNo={billData.billNo} date={billData.date} />
        
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Item</th>
                <th className="py-2 px-4 border text-right">Rate</th>
                <th className="py-2 px-4 border text-right">Qty</th>
                <th className="py-2 px-4 border text-right">Amount</th>
                <th className="py-2 px-4 border text-right">GST</th>
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
        
        <UPIQRCode amount={totals.grandTotal} />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for your business!</p>
          <p>Goods once sold will not be taken back or exchanged</p>
        </div>
      </div>
    </div>
  );
};

export default BillPage;