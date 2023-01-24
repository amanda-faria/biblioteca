import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';
import Sidebar from './components/sidebar.js';

class App extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <Navbar />
        <div className='row'>
          <div className='col-2'>
            <Sidebar />
          </div>
          <div className='col-10'>
            <Rotas />
          </div>

        </div>
      </div>
    );
  }
}

export default App;