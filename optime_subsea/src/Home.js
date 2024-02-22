import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Layout from './Layout';
import Content from './Content';
//import './style/Homestyle.css'

function Home() {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-200"> {/* Example for header background */}
        <Header/>
      </div>
      <div>
        <div>
          <Layout />
        </div>
        <div className="overflow-auto">
          <Content />
        </div>
      </div>
    </div>
  );
}


export default Home;
