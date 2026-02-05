
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TrendSpotter from './components/TrendSpotter';
import ProductGenerator from './components/ProductGenerator';
import AdGenerator from './components/AdGenerator';
import Roadmap from './components/Roadmap';
import SetupCenter from './components/SetupCenter';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trends':
        return <TrendSpotter />;
      case 'generator':
        return <ProductGenerator />;
      case 'ads':
        return <AdGenerator />;
      case 'roadmap':
        return <Roadmap />;
      case 'setup':
        return <SetupCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
