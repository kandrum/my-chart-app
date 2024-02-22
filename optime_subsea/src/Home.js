import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Layout from './Layout';
import Content from './Content';
import './style/Homestyle.css'

function Home() {
  return (
    <div className="flex-container">
      <div className="header-bg">
        <Header/>
      </div>
      <div>
        <div>
          <Layout />
        </div>
        <div className="content-overflow">
          <Content />
        </div>
      </div>
    </div>
  );
}


export default Home;
