import React from 'react';
import { Star } from 'lucide-react';
import { Cafe } from '../types';

interface CafeListProps {
  cafes: Cafe[];
}

const CafeList: React.FC<CafeListProps> = ({ cafes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cafes.map((cafe) => (
        <div key={cafe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={cafe.image}
            alt={cafe.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{cafe.name}</h3>
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">{cafe.rating}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{cafe.category}</p>
            <p className="text-gray-500 text-sm">{cafe.location.address}</p>
            <p className="text-gray-700 mt-2 text-sm line-clamp-2">{cafe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeList;