import React, {createContext, useEffect, useState, useContext} from 'react';
import axios from 'axios';

const FileContext = createContext();

const FileProvider = ({children}) => {
    const [filePath, setFilePath] = useState('');
    const [fileUri, setFileUri] = useState('');

  return (
    <FileContext.Provider value={{setFilePath, setFileUri, filePath, fileUri}}>
      {children}
    </FileContext.Provider>
  );
};

export {FileContext, FileProvider};
