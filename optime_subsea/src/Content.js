import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './style/Contentstyle.css';
import { useSelector } from "react-redux"; // Corrected from UseSelector to useSelector

const Content = () => {
    const [buttonText, setButtonText] = useState("Upload File");
    const [fileData, setFileData] = useState(null);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    // Accessing current company and project from Redux state
    const currentCompany = useSelector(state => state.currentSelection.currentCompany);
    const currentProject = useSelector(state => state.currentSelection.currentProject);

    // If either currentCompany or currentProject is null, do not render the component
    if (!currentCompany || !currentProject) {
        // Optionally, return null or a message prompting selection
        return null; // or return <div>Please select a company and a project.</div>;
    }

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
    };

    return (
        <div className="content-container">
            <div className="header flex justify-center items-center">
                <h1 className="big-bold-header">You are uploading a file to {currentCompany} - {currentProject}</h1>
            </div>
            <div className="file-upload-container">
                <div className="button-row">
                    <button onClick={handleButtonClick} className="upload-button">
                        {buttonText}
                    </button>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </div>
                {fileData && (
                    <span className="record-info">{fileData.length} records loaded</span>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Content;
