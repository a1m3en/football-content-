import React, { useState } from 'react';
import Navbar from "./Navbar/Navbar.jsx";
import Home from './Home/Home.jsx';
import Matches from './Matches/Matches.jsx';
import Summaries from './Summaries/Summaries.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch(activeTab) {
      case 'Home':
        return <Home setActiveTab={setActiveTab} />;
      case 'Matches':
        return <Matches />;
      case 'Summaries':
        return <Summaries />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="App">
      <Navbar selected={activeTab} setSelected={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;