import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Store,
  Building2,
  ShoppingCart,
  Package,
  Building,
  Check,
  X
} from 'lucide-react';
import Header from '../components/Header';

interface Marketplace {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

export default function MarketplaceSelector() {
  const navigate = useNavigate();
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([
    { id: 'mercadolivre', name: 'Mercado Livre', icon: <ShoppingBag className="w-6 h-6" />, selected: false },
    { id: 'amazon', name: 'Amazon', icon: <ShoppingCart className="w-6 h-6" />, selected: false },
    { id: 'shopee', name: 'Shopee', icon: <Store className="w-6 h-6" />, selected: false },
    { id: 'shein', name: 'Shein', icon: <Package className="w-6 h-6" />, selected: false },
    { id: 'magalu', name: 'Magazine Luiza', icon: <Building2 className="w-6 h-6" />, selected: false },
    { id: 'olx', name: 'OLX', icon: <Building className="w-6 h-6" />, selected: false },
  ]);

  const toggleMarketplace = (id: string) => {
    setMarketplaces(marketplaces.map(marketplace =>
      marketplace.id === id 
        ? { ...marketplace, selected: !marketplace.selected }
        : marketplace
    ));
  };

  const handleSubmit = () => {
    const selectedMarketplaces = marketplaces.filter(m => m.selected);
    if (selectedMarketplaces.length === 0) {
      alert('Por favor, selecione pelo menos um marketplace');
      return;
    }
    navigate('/product-details', { 
      state: { selectedMarketplaces: selectedMarketplaces.map(m => ({ id: m.id, name: m.name })) }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastro Multi-Marketplace</h1>
          <p className="text-gray-600 mb-8">Selecione as plataformas onde deseja publicar seu produto</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {marketplaces.map((marketplace) => (
              <div
                key={marketplace.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  marketplace.selected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200 bg-white'
                }`}
                onClick={() => toggleMarketplace(marketplace.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    marketplace.selected ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {marketplace.icon}
                  </div>
                  <span className="flex-grow font-medium text-gray-700">
                    {marketplace.name}
                  </span>
                  {marketplace.selected ? (
                    <Check className="w-6 h-6 text-indigo-500" />
                  ) : (
                    <X className="w-6 h-6 text-gray-300" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Continuar
            </button>
          </div>

          {marketplaces.some(m => m.selected) && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Plataformas selecionadas:</h2>
              <div className="flex flex-wrap gap-2">
                {marketplaces
                  .filter(m => m.selected)
                  .map(marketplace => (
                    <span
                      key={marketplace.id}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {marketplace.icon}
                      {marketplace.name}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}