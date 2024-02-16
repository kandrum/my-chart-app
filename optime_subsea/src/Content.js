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
    };

    if (!uploadProject.visible) {
        return null;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="py-5">
                <h1 className="text-2xl font-bold text-center mb-4 text-white">Upload File for {uploadProject.companyName} - {uploadProject.projectName}</h1>
            </div>
            <div style={{ background: '#E5E7EB', marginLeft: '8cm', marginRight: '8cm', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
                <div className="flex justify-center items-center">
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
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
                    <span className="text-gray-300 text-sm">{fileData.length} records loaded</span>
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
