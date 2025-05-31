import { createContext, useState } from 'react';

export const BillContext = createContext();

export const BillProvider = ({ children }) => {
  const [billData, setBillData] = useState({
    items: [],
    billNo: `BILL-${Date.now()}`,
    date: new Date(),
  });

  const addItem = (item, quantity) => {
    const amount = item.rate * quantity;
    const tax = amount * 0.18; // 18% GST
    const total = amount + tax;
    
    setBillData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...item,
          quantity,
          amount,
          tax,
          total
        }
      ]
    }));
  };

  const resetBill = () => {
    setBillData({
      items: [],
      billNo: `BILL-${Date.now()}`,
      date: new Date(),
    });
  };

  const totals = {
    subTotal: billData.items.reduce((sum, item) => sum + item.amount, 0),
    totalTax: billData.items.reduce((sum, item) => sum + item.tax, 0),
    grandTotal: billData.items.reduce((sum, item) => sum + item.total, 0)
  };

  return (
    <BillContext.Provider value={{ billData, addItem, resetBill, totals }}>
      {children}
    </BillContext.Provider>
  );
};