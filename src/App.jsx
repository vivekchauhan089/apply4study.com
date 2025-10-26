import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';
import ChatButton from './components/common/ChatBtn';
import useTrackLinkClicks from './hooks/useTrackLinkClicks.jsx';

const App = ({ skipRedirects }) => {
  useTrackLinkClicks();

  return (
    <BrowserRouter>
      <LayoutRoutes skipRedirects={skipRedirects} />
      <ChatButton />
    </BrowserRouter>
  );
}

export default App;