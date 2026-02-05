
import React, { useState } from 'react';
import { getPassiveIncomeRoadmap } from '../services/geminiService';

const Roadmap: React.FC = () => {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const data = await getPassiveIncomeRoadmap('AJ Store');
      setRoadmap(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-700 to-violet-800 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4">Your 24/7 Freedom Map</h2>
          <p className="text-indigo-100 max-w-xl mb-8">
            Stop working for your store. Let the AI work for you. Generate a tailored automation strategy 
            for AJ Store on Webnode that runs while you sleep.
          </p>
          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? 'Processing Strategy...' : 'Generate 24/7 Roadmap'}
          </button>
        </div>
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </div>

      {roadmap && (
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 prose prose-indigo max-w-none">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">🤖</div>
            <h3 className="text-2xl font-bold text-slate-800 m-0">AI Strategic Roadmap</h3>
          </div>
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
            {roadmap}
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
