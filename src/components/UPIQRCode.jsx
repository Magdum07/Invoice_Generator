import { QRCodeSVG } from 'qrcode.react';

const UPIQRCode = ({ amount }) => {
  const upiId = "9561263230@upi";
  const payeeName = "ShopEasy Mart";
  const transactionNote = "Bill Payment";
  
  const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&tn=${encodeURIComponent(transactionNote)}&cu=INR`;

  return (
    <div className="mt-8 p-4 border rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Scan to Pay via UPI</h3>
      <div className="flex justify-center">
        <QRCodeSVG 
          value={upiString} 
          size={180} 
          includeMargin={true}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">Total: ₹{amount.toFixed(2)}</p>
    </div>
  );
};

export default UPIQRCode;