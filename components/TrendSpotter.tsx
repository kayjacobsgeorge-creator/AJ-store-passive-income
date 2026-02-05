
import React, { useState } from 'react';
import { getTrendingProducts } from '../services/geminiService';
import { ProductTrend } from '../types';

const TrendSpotter: React.FC = () => {
  const [niche, setNiche] = useState('Home Gadgets');
  const [trends, setTrends] = useState<ProductTrend[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSpotTrends = async () => {
    setLoading(true);
    try {
      const results = await getTrendingProducts(niche);
      setTrends(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Market Intelligence</h3>
        <p className="text-slate-500 mb-6">Identify high-margin products before they hit the mainstream on Webnode.</p>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Enter your niche (e.g., Tech, Pet Supplies...)"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={handleSpotTrends}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Spot Trends'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trends.map((trend, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{trend.niche}</span>
                <h4 className="text-xl font-bold text-slate-800 mt-1">{trend.name}</h4>
              </div>
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {trend.demandScore}/100 Demand
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{trend.reasoning}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <span className="text-slate-400 text-sm">Suggested Price: <span className="text-slate-800 font-bold">{trend.suggestedPrice}</span></span>
              <button className="text-indigo-600 text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform">
                Generate Listing →
              </button>
            </div>
          </div>
        ))}

        {!loading && trends.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">Enter a niche above to start the AI scan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendSpotter;
