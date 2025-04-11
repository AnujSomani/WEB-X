import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Coffee } from 'lucide-react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import CafeList from './components/CafeList';
import Map from './components/Map';
import { Cafe, FilterOptions } from './types';
import 'leaflet/dist/leaflet.css';



function App() {
  
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    rating: null,
    category: null,
    location: null,
  });

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cafes');
        setCafes(response.data);
        setFilteredCafes(response.data);
      } catch (error) {
        console.error('Error fetching cafes:', error);
      }
    };

    fetchCafes();
  }, []);

  useEffect(() => {
    let filtered = [...cafes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(cafe =>
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(cafe => cafe.rating >= filters.rating!);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(cafe => cafe.category === filters.category);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(cafe =>
        cafe.location.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    setFilteredCafes(filtered);
  }, [searchQuery, filters, cafes]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coffee className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">CafeFinder</h1>
            </div>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <Map cafes={filteredCafes} />
            <CafeList cafes={filteredCafes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;