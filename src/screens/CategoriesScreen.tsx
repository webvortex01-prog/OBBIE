import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CategoryIcon } from '../components/CategoryIcon';
import { Search, ChevronRight } from 'lucide-react';

export const CategoriesScreen: React.FC = () => {
  const { categories, selectCategoryById, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (catId: string) => {
    selectCategoryById(catId);
    navigateTo('category_listings');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Categorias" showBack={true} />

      {/* Search Inside Categories */}
      <div className="px-5 pt-3 pb-2 bg-white border-b border-slate-100">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar na categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200/60 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Categories List (Matching Screen 4) */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5">
        {filteredCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className="w-full bg-white rounded-xl p-3 border border-slate-100 shadow-xs hover:border-blue-100 hover:shadow-sm active:scale-[0.99] transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${cat.iconBgColor}`}
              >
                <CategoryIcon name={cat.iconName} className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">{cat.subtitle}</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0052FF] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
          </button>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">Nenhuma categoria encontrada com esse termo.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
