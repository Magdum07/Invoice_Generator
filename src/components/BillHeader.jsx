import { format } from 'date-fns';

const BillHeader = ({ billNo, date }) => {
  return (
    <div className="mb-8 border-b pb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIf8EcvgaJMBPpyGO2p5KGlUsDYD9ngb05A&s" alt="Shop Logo" className="w-16 h-16 mr-4" />
            <h1 className="text-3xl font-bold">ShopEasy Mart</h1>
          </div>
          <p className="text-gray-600 mt-2">
            123 Main Street, City Center, State - 560001
          </p>
        </div>
        
        <div className="text-right">
          <p className="font-semibold">Bill No: {billNo}</p>
          <p>Date: {format(date, 'dd/MM/yyyy')}</p>
          <p>Time: {format(date, 'HH:mm:ss')}</p>
        </div>
      </div>
    </div>
  );
};

export default BillHeader;