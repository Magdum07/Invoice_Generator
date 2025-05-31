import { useState, useContext } from 'react';
import { BillContext } from '../context/BillContext';
import items from '../data/items.json'

const ItemSelector = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useContext(BillContext);
  
//   const items = require('../data/items.json');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItem && quantity > 0) {
      addItem(selectedItem, quantity);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Items</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <select
          value={selectedItem?.id || ''}
          onChange={(e) => setSelectedItem(items.find(item => item.id === parseInt(e.target.value)))}
          className="p-2 border rounded w-full md:w-1/3"
          required
        >
          <option value="">Select an item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>
              {item.name} - ₹{item.rate}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="p-2 border rounded w-full md:w-1/4"
          required
        />
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto Add Item">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemSelector;