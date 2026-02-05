
import React, { useState } from 'react';
import { generateProductListing } from '../services/geminiService';
import { GeneratedContent } from '../types';

const ProductGenerator: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [niche, setNiche] = useState('Electronics');
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleGenerate = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const data = await generateProductListing(productName, niche);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadWebnodeCSV = () => {
    if (!result) return;
    setIsExporting(true);
    
    // Webnode Product Import CSV format (minimal required columns)
    const headers = "Name,Description,Price,Currency,Category,Tags\n";
    const row = `"${result.title}","${result.description.replace(/"/g, '""')}",29.99,USD,"${niche}","${result.keywords.join(',')}"`;
    const csvContent = "data:text/csv;charset=utf-8," + headers + row;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${productName.toLowerCase().replace(/\s+/g, '_')}_webnode_import.csv`);
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Automated Product Creator</h3>
        <p className="text-slate-500 mb-6">Create high-converting Webnode listings in seconds.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name (e.g. Ergonomic Keyboard)"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Category"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !productName}
          className="mt-4 w-full bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Writing Listing...
            </>
          ) : 'Generate Full Listing'}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Optimized Title</h4>
              <p className="text-xl font-bold text-slate-800 mb-6">{result.title}</p>
              
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Compelling Description</h4>
              <div className="text-slate-600 whitespace-pre-wrap leading-relaxed text-sm">{result.description}</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Marketing Hooks</h4>
              <div className="bg-indigo-50 p-4 rounded-xl text-indigo-800 italic text-sm">
                "{result.marketingCopy}"
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">SEO Tags</h4>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-medium">#{kw}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500 rounded-lg">🚀</div>
                <h4 className="font-bold">Webnode Sync</h4>
              </div>
              <p className="text-xs text-indigo-100 mb-6">Download a compatible CSV to instantly import this product to your AJ Store.</p>
              <button 
                onClick={downloadWebnodeCSV}
                className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
              >
                {isExporting ? 'Preparing File...' : 'Download Webnode CSV'}
              </button>
              <p className="text-[10px] text-center text-indigo-300 mt-4 italic">
                Settings > Import > Upload File in Webnode
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGenerator;
