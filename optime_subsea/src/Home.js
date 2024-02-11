import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Layout from './Layout';
import Content from './Content';
import { setUploadProject } from './redux/actions/uploadProjectActions'; // Adjust the import path as needed
import Styles from './style/Homestyle.module.css';

function Home({ uploadProject, setUploadProjectAction }) {
  // No need to use useState for companies or uploadProject as they are now managed by Redux

  const handleProjectSelect = (companyName, projectName) => {
    // Dispatch action to update the uploadProject state in Redux
    setUploadProjectAction({ visible: true, companyName, projectName });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <Header />
      </div>
      <div className={Styles.sidebar}>
        {/* Layout now directly connects to Redux for companies, no need to pass as props */}
        <Layout onProjectSelect={handleProjectSelect} />
      </div>
      <div className={Styles.content}>
        {/* Content might also directly connect to Redux or receive uploadProject as a prop from Home */}
        <Content uploadProject={uploadProject} />
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
