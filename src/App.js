import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/upload', formData)
      .then((response) => {
        setUploadStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
        setUploadStatus('Error uploading file.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} accept="application/pdf" />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <div>{uploadStatus}</div>}
    </div>
  );
}

export default FileUploader;
