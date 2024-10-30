import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";

const useDragAndDrop = () => {
  const [files, setFiles] = useState();
  const { value: isLoading, setTrue: showLoading, setFalse: hideLoading } = useBoolean(false);
  const fileTypes = ["PNG", "JPG", "JPEG"];
  const MIN_FILES = 12;
  const MAX_FILES = 24;
  const controller = useRef();

  // destructure object to an array
  const onFilesChange = ([...uploaded]) => {
    if (!uploaded) {
      return;
    }

    if (uploaded.length < 1 || uploaded.length > MAX_FILES || uploaded.length < MIN_FILES) {
      return;
    }

    showLoading();
    compressImages(uploaded)
      .then(setFiles)
      .catch((error) => {})
      .finally(hideLoading);
  };

  const compressImages = (images) => {
    controller.current = new AbortController();

    const compressionOptions = {
      maxSizeMB: 0.2,
      maxWidth: 1920,
      useWebWorker: true,
      signal: controller.current.signal,
    };

    // Return promise of compressing ALL images
    return Promise.all(images.map((image) => imageCompression(image, compressionOptions)));
  };

  const abortCompression = () => {
    if (isLoading) {
      controller.current.abort("Image uploading has been cancelled");
    }
  };

  return { fileTypes, onFilesChange, abortCompression, files, MAX_FILES, isLoading };
};

export default useDragAndDrop;
