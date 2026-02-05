
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockData = [
  { name: 'Mon', sales: 400, clicks: 2400 },
  { name: 'Tue', sales: 300, clicks: 1398 },
  { name: 'Wed', sales: 200, clicks: 9800 },
  { name: 'Thu', sales: 278, clicks: 3908 },
  { name: 'Fri', sales: 189, clicks: 4800 },
  { name: 'Sat', sales: 239, clicks: 3800 },
  { name: 'Sun', sales: 349, clicks: 4300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome back, AJ!</h2>
          <p className="text-slate-500 text-sm">Your AI-driven passive income engine is ready for action.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">System Live</span>
          </div>
        </div>
      </header>

      {/* Publishing Quick Action */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Ready to publish your first product?</h3>
          <p className="text-indigo-100 text-xs">Run the Trend Spotter to find what's selling right now.</p>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform shrink-0 shadow-lg">
          Start Auto-Sync →
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Automations', value: '12', change: '+2 today', color: 'text-indigo-600' },
          { label: 'Passive Income Proj.', value: '$2,450', change: '+15% vs last month', color: 'text-green-600' },
          { label: 'AI Content Created', value: '148', change: 'Updated hourly', color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</h3>
            <p className="text-[10px] text-slate-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-800 mb-6 text-sm">Traffic Engagement</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-800 mb-6 text-sm">AI-Generated Sales</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip />
                <Bar dataKey="sales" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-semibold text-slate-800 text-sm">24/7 Automation Activity</h4>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
             <span className="text-[10px] font-bold text-green-600 uppercase">Live Update</span>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-bold">Automation Task</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold">Last Run</th>
              <th className="px-6 py-3 font-bold">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { task: 'SEO Keyword Re-optimization', status: 'Success', last: '2 mins ago', outcome: 'High Impact' },
              { task: 'Auto-Ad Copy Generation', status: 'Success', last: '1 hour ago', outcome: 'Ready' },
              { task: 'Webnode Sync Check', status: 'Active', last: '15 mins ago', outcome: 'Balanced' },
              { task: 'Trend Analysis (Daily)', status: 'Success', last: '45 mins ago', outcome: 'Updated' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-xs font-semibold text-slate-700">{row.task}</td>
                <td className="px-6 py-4">
                   <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">
                    {row.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-[10px] text-slate-500 font-mono uppercase">{row.last}</td>
                <td className="px-6 py-4">
                   <span className="text-[10px] font-bold text-indigo-600">
                    {row.outcome}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
