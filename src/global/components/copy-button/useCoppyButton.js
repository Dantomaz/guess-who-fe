import { useState } from "react";

const useCoppyButton = () => {
  const [recentlyCopied, setRecentlyCopied] = useState(false);

  const copyToClipboard = (value) => {
    setRecentlyCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setRecentlyCopied(false);
    }, [2000]);
  };

  return {
    copyToClipboard,
    recentlyCopied,
  };
};

export default useCoppyButton;
