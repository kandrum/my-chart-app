import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './style/Contentstyle.css'

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
    };

    if (!uploadProject.visible) {
        return null;
    }

    return (
        <div className="content-container">
            <div className="header">
                 <h1 className="header-title">Upload File for {uploadProject.companyName} - {uploadProject.projectName}</h1>
            </div>
            <div className="file-upload-container">
                <div className="button-row">
                    <button
                        onClick={handleButtonClick}
                        className="upload-button"
                    >
                        {buttonText}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                {fileData && (
                    <span className="record-info">{fileData.length} records loaded</span>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Content;
