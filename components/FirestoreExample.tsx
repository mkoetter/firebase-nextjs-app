'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

interface Item {
  id: string;
  text: string;
  timestamp: number;
}

export default function FirestoreExample() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'items'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        fetchedItems.push({ id: doc.id, ...doc.data() } as Item);
      });
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'items'), {
        text: newItem,
        timestamp: Date.now(),
      });
      setNewItem('');
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Make sure you have configured Firebase correctly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Firestore Example</h2>

      <form onSubmit={addItem} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter item text..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Items:</h3>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">No items yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
