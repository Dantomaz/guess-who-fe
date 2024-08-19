import { useState } from "react";

const useDragAndDrop = () => {
  const [files, setFiles] = useState();
  const fileTypes = ["PNG", "JPG", "JPEG"];
  const MAX_FILES = 30;

  const onFilesChange = (uploaded) => {
    if (!uploaded) {
      return;
    }

    const uploadedFiles = [...uploaded];
    if (uploadedFiles.length >= 1 && uploadedFiles.length <= MAX_FILES) {
      setFiles(uploadedFiles);
    }
  };

  return { fileTypes, onFilesChange, files, MAX_FILES };
};

export default useDragAndDrop;
