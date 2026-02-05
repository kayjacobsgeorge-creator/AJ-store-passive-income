
import React, { useState } from 'react';
import { generateAdCampaign } from '../services/geminiService';
import { AdCampaign } from '../types';

const AdGenerator: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('Impulse buyers, 18-35 interested in tech');
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const data = await generateAdCampaign(productName, targetAudience);
      setCampaign(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Automated Ad Engine</h3>
        <p className="text-slate-500 mb-6">Generate high-converting ads for Facebook, TikTok, and Google instantly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Minimalist Desk Lamp"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !productName}
          className="mt-6 w-full bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Engine Running...
            </>
          ) : 'Generate 24/7 Ad Campaign'}
        </button>
      </div>

      {campaign && (
        <div className="space-y-6">
          {/* Strategy Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Suggested Daily Budget</h4>
              <p className="text-2xl font-black text-indigo-900">{campaign.suggestedDailyBudget}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h4 className="text-sm font-bold text-green-700 uppercase mb-2">Scaling Strategy</h4>
              <p className="text-sm text-green-900 leading-relaxed font-medium">{campaign.scalingStrategy}</p>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { id: 'facebook', name: 'Meta Ads', color: 'bg-[#1877F2]', data: campaign.platforms.facebook },
              { id: 'tiktok', name: 'TikTok Ads', color: 'bg-black', data: campaign.platforms.tiktok },
              { id: 'google', name: 'Google Ads', color: 'bg-[#4285F4]', data: campaign.platforms.google },
            ].map((platform) => (
              <div key={platform.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className={`${platform.color} p-4 flex justify-between items-center`}>
                  <h4 className="text-white font-bold">{platform.name}</h4>
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">Ready</span>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase block mb-1">Headline</span>
                    <p className="text-sm font-bold text-slate-800">{platform.data.headline}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase block mb-1">Ad Body Content</span>
                    <p className="text-xs text-slate-600 leading-relaxed italic">"{platform.data.body}"</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1 text-center">CTA Button</span>
                    <div className="text-center font-bold text-indigo-600 text-sm uppercase tracking-wide">{platform.data.cta}</div>
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase block mb-1">Visual Direction</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{platform.data.visualDirection}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdGenerator;
