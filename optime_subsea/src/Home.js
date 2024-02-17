import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Layout from './Layout';
import Content from './Content';
import { setUploadProject } from './redux/actions/uploadProjectActions'; // Adjust the import path as needed
import './style/Homestyle.css'

function Home({ uploadProject, setUploadProjectAction }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleProjectSelect = (companyName, projectName) => {
    // Dispatch action to update the uploadProject state in Redux
    setUploadProjectAction({ visible: true, companyName, projectName });
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex-container">
      <div className="header-bg">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className={`flex-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`transform top-0 left-0 w-64 bg-purple-500 overflow-auto transition duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Layout onProjectSelect={handleProjectSelect} />
        </div>
        <div className="content-overflow">
          <Content uploadProject={uploadProject} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  uploadProject: state.uploadProject,
});

const mapDispatchToProps = (dispatch) => ({
  setUploadProjectAction: (project) => dispatch(setUploadProject(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
