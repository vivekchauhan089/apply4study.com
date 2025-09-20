import React from 'react';
import './SearchSection.css';

const SearchSection = () => {
  return (

    <section className="about">
      <div className="container">
        <div className="row gy-4">
          <div className="search-container">
            <h3 className="text-white text-center search-title"> 
              <strong>18 million</strong> searches and counting
            </h3>
            <div className="search-bar">
              <div className="input-wrapper">
                <i className="bi bi-search icon"></i>
                <input type="text" placeholder="english" className='form-control' />
              </div>
              <div className="input-wrapper">
                <i className="bi bi-globe icon"></i>
                <select className='form-select form-control'>
                  <option>Canada</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <button>Search</button>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
};

export default SearchSection;
