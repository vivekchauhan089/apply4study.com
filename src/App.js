import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';
import ChatButton from './components/common/ChatBtn';
import useTrackLinkClicks from './hooks/useTrackLinkClicks';

const App = () => {
  useTrackLinkClicks();

  return(
  <BrowserRouter>
    <LayoutRoutes />
    <ChatButton />
  </BrowserRouter>
)
}

export default App;