
import React, { useState } from 'react';

const SetupCenter: React.FC = () => {
  const [deployedUrl, setDeployedUrl] = useState('https://your-app-name.vercel.app');

  const embedCode = `<iframe 
  src="${deployedUrl}" 
  width="100%" 
  height="900px" 
  style="border:none; border-radius:24px; box-shadow: 0 20px 50px rgba(0,0,0,0.1);"
  title="AJ Store AI Engine">
</iframe>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const steps = [
    {
      title: "Step 1: Host the Engine",
      content: "Upload this project to Vercel. It's free and takes 1 minute. Once done, Vercel will give you a 'Production URL'.",
      action: "Open Vercel",
      icon: "☁️"
    },
    {
      title: "Step 2: Get your URL",
      content: "Paste your Vercel URL into the box below to generate your custom Webnode embed code.",
      action: "Update URL",
      icon: "🔗"
    },
    {
      title: "Step 3: Embed in Webnode",
      content: "In your Webnode Editor, click '+' > 'HTML'. Paste the code from the box below and click 'Save'.",
      action: "Webnode Editor",
      icon: "🛠️"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Integration Portal</div>
        <h2 className="text-4xl font-black text-slate-800">Publish to AJ Store</h2>
        <p className="text-slate-500 text-lg">Move this engine from your computer to your live Webnode website.</p>
      </header>

      {/* Embedding Section */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Webnode Embed Code</h3>
              <p className="text-slate-400 text-sm">Copy this code into an 'HTML' block on a hidden page of your store.</p>
            </div>
            <div className="w-full md:w-auto">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Your Deployed App URL</label>
              <input 
                type="text" 
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                placeholder="https://aj-store-engine.vercel.app"
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-indigo-300 w-full md:w-80 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-8 relative group">
            <div className="absolute -top-3 left-6 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase">HTML Snippet</div>
            <pre className="bg-black/50 p-6 rounded-2xl font-mono text-xs text-indigo-200 overflow-x-auto border border-white/5">
              {embedCode}
            </pre>
            <button 
              onClick={() => copyToClipboard(embedCode)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all backdrop-blur-md"
            >
              Copy Code
            </button>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="space-y-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                {step.icon}
              </div>
              <h4 className="font-bold text-slate-800">{step.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{step.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Security Tip</h3>
          <p className="text-indigo-100 text-sm leading-relaxed mb-6">
            Since this dashboard controls your 24/7 passive income engine, we recommend putting the 
            embed code on a <strong>Password Protected</strong> page in Webnode.
          </p>
          <ul className="space-y-3 text-xs text-indigo-200 font-medium">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✔</span> Webnode Settings > Page Security
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✔</span> Create a 'Members Only' area
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✔</span> Restrict access to you only
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Need Hosting Help?</h3>
          <p className="text-slate-500 text-sm mb-8">
            If you've never used Vercel, it's the professional way to host React apps for free. 
            Once hosted, your engine will be live 24/7.
          </p>
          <div className="flex flex-col gap-3">
            <a href="https://vercel.com/new" target="_blank" className="bg-slate-900 text-white py-3 rounded-2xl text-center font-bold text-sm hover:bg-slate-800 transition-colors">
              Deploy to Vercel Now
            </a>
            <button className="text-slate-400 text-xs font-medium hover:text-slate-600">
              Watch Deployment Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupCenter;
