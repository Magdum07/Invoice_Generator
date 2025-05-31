const BillSummary = ({ totals }) => {
  return (
    <div className="mt-8 border-t pt-4">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Subtotal:</span>
        <span>₹{totals.subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold">GST (18%):</span>
        <span>₹{totals.totalTax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xl font-bold mt-4 pt-2 border-t">
        <span>Grand Total:</span>
        <span>₹{totals.grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BillSummary;