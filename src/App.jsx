import React from 'react';
import LayoutRoutes from './routes/LayoutRoutes.jsx';
import ChatButton from './components/common/ChatBtn.jsx';
import useTrackLinkClicks from './hooks/useTrackLinkClicks.jsx';

const App = ({ skipRedirects }) => {
  useTrackLinkClicks();

  return (
    <>
      <LayoutRoutes skipRedirects={skipRedirects} />
      <ChatButton />
    </>
  );
}

export default App;