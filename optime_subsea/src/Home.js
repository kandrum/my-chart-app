import React, { useState } from 'react';
import Header from './Header';
import Layout from './Layout';
import Content from './Content';
import Styles from './style/Homestyle.module.css';

function Home() {
  const [companies, setCompanies] = useState([]);
  const [uploadProject, setUploadProject] = useState({ visible: false, projectName: '' });

  const handleProjectSelect = (companyName, projectName) => {
    setUploadProject({ visible: true, companyName, projectName });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <Header />
      </div>
      <div className={Styles.sidebar}>
        <Layout  companies={companies} setCompanies={setCompanies} onProjectSelect={handleProjectSelect}/>
        {/* */}
      </div>
      <div className={Styles.content}>
        <Content uploadProject={uploadProject} setUploadProject={setUploadProject} />
      </div>
    </div>
  );
}

export default Home;
