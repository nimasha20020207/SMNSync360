import React from 'react';

import Home from "./Components/Customer/Home/Home";
import App from './App';
import './index.css';

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path ="/" element ={<Home/>}/>         
        </Routes>
      </React.Fragment>

      
    </div>
  );
}

export default App;

