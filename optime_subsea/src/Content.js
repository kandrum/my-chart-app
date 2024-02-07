import styles from './style/content.module.css'; // Adjust path as necessary
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const Content = ({ uploadProject, setUploadProject }) => {
    const [buttonText, setButtonText] = useState("Upload File"); 
    const [fileData, setFileData] = useState(null);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => { 
        const file = event.target.files[0];
        if (file) {
            setButtonText(file.name); 
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setFileData(results.data);
                }
            });
        }
    };

    const handleSubmit = () => {
        navigate('/analyze', { state: { fileData } });
        // Reset uploadProject state to hide the upload interface
        setUploadProject({ visible: false, projectName: '' });
    };

    // Only display the upload interface if a project has been selected
    if (!uploadProject.visible) {
        return null; // Or any other placeholder content when no project is selected
    }

    return (
        <div>
            <div className={styles.div1}>
                <h1 className={styles.heading}>Upload File for {uploadProject.companyName} - {uploadProject.projectName}</h1>
            </div>
            <div className={styles.div2}>
                <button onClick={handleButtonClick}>{buttonText}</button>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {buttonText !== "Upload File" && <p>File selected: {buttonText}</p>}
            </div>
            <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Content;
