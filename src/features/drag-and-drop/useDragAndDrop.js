import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";

const useDragAndDrop = () => {
  const [files, setFiles] = useState();
  const { value: isLoading, setTrue: showLoading, setFalse: hideLoading } = useBoolean(false);
  const [feedback, setFeedback] = useState({ display: false, message: null });
  const fileTypes = ["PNG", "JPG", "JPEG"];
  const MIN_FILES = 12;
  const MAX_FILES = 24;
  const controller = useRef();

  // destructure object to an array
  const onFilesChange = ([...uploaded]) => {
    if (!uploaded) {
      return;
    }

    const numberOfImages = uploaded.length;

    if (numberOfImages < MIN_FILES || numberOfImages > MAX_FILES) {
      setFeedbackMessage(numberOfImages);
      return;
    }

    showLoading();
    compressImages(uploaded)
      .then(setFiles)
      .catch((error) => {})
      .finally(hideLoading);
  };

  const setFeedbackMessage = (numberOfImages) => {
    const message = (
      <>
        <p>Selected: {numberOfImages}</p>
        <p>{numberOfImages < MIN_FILES ? `Min: ${MIN_FILES}` : `Max: ${MAX_FILES}`}</p>
      </>
    );
    setFeedback({ display: true, message });
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
      controller.current.abort("Uploading of images has been cancelled");
    }
  };

  const clearFeedback = () => setFeedback((prev) => ({ display: false, message: prev.message }));

  return { fileTypes, onFilesChange, abortCompression, files, MAX_FILES, isLoading, feedback, clearFeedback };
};

export default useDragAndDrop;
