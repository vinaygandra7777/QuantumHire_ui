import React, { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone'; // Need to install: npm install react-dropzone

const UploadArea = ({ onFileUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      setFileName(file.name);
      // Simulate upload/processing delay
      setTimeout(() => {
        // Pass the file up to the parent component for actual processing
        if (onFileUpload) {
          onFileUpload(file);
        }
        setUploading(false);
         // Reset file name after processing in parent or keep it displayed
      }, 1500);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { // Define acceptable file types
          'application/pdf': ['.pdf'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'text/plain': ['.txt']
      },
      multiple: false // Allow only single file upload
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ease-in-out
        ${isDragActive ? 'border-brand-purple bg-brand-purple/10' : 'border-brand-gray-dark hover:border-brand-gray-medium bg-brand-gray-extradark/50 hover:bg-brand-gray-extradark'}
      `}
    >
      <input {...getInputProps()} />
      <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? 'text-brand-purple' : 'text-brand-gray'}`} />

      {uploading ? (
        <p className="text-lg font-semibold text-white">Uploading {fileName}...</p>
      ) : fileName && !uploading ? (
         <p className="text-lg font-semibold text-green-400">Uploaded: {fileName}</p>
      ): isDragActive ? (
        <p className="text-lg font-semibold text-brand-purple">Drop the file here ...</p>
      ) : (
        <>
          <p className="mb-2 text-lg font-semibold text-white">
            <span className="text-brand-purple-light">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-brand-gray">PDF, DOCX, or TXT (MAX. 5MB)</p>
        </>
      )}
    </div>
  );
};

export default UploadArea;