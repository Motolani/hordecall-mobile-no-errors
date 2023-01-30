import React, {createContext, useEffect, useState, useContext} from 'react';
import axios from 'axios';

const FileContext = createContext();

const FileProvider = ({children}) => {
    const [filePath, setFilePath] = useState('');
    const [fileUri, setFileUri] = useState('');
    const [uploading, setUploading] = useState(0);

  return (
    <FileContext.Provider value={{setFilePath, setFileUri, setUploading, filePath, fileUri, uploading}}>
      {children}
    </FileContext.Provider>
  );
};

export {FileContext, FileProvider};
