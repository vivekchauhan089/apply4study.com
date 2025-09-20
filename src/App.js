import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';
import ChatButton from './components/common/ChatBtn';

const App = () => {
 
  return(
  <BrowserRouter>
    <LayoutRoutes />
    <ChatButton />
  </BrowserRouter>
)
}

export default App;