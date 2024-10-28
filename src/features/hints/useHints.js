import { useSelector } from "react-redux";

const useHints = () => {
  const hintsContext = useSelector((state) => state.hintsManager.context);

  const text = {
    default: (
      <>
        <p>
          <span>Left Mouse Click</span> - close/open a card for everyone in your team; keep in mind, that incorrectly guessed cards can't be opened
          anymore
        </p>
        <p>
          <span>Right Mouse Click</span> (if card is opened) - preview the image to take a better look
        </p>
        <p>
          <span>Right Mouse Click and Hold</span> (if card is closed) - take a peek at the image
        </p>
      </>
    ),
    preview: (
      <>
        <p>
          <span>Mouse Scroll Up</span> - zoom in
        </p>
        <p>
          <span>Mouse Scroll Down</span> - zoom out
        </p>
        <p>
          <span>Left Mouse Click</span> (if zoomed out) - zoom in
        </p>
        <p>
          <span>Left Mouse Click and Hold</span> (if zoomed in) - move the image
        </p>
        <p>
          <span>Right Mouse Click</span> (if zoomed in) - reset zoom or close
        </p>
      </>
    ),
  }[hintsContext];

  return { text };
};

export default useHints;
