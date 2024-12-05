import { useSelector } from "react-redux";

const useHints = () => {
  const hintsContext = useSelector((state) => state.hintsManager.context);
  const host = useSelector((state) => state.playerManager.player.host);

  const text = {
    new: host ? (
      <>
        <p>
          <span>Start game</span> button shows how many players selected a team.
        </p>
        <p>
          <span>You</span> can start the game once everybody selects a team and both teams have at least one player!
        </p>
      </>
    ) : (
      <>
        <p>
          <span>Host</span> can start the game once everybody selects a team and both teams have at least one player!
        </p>
      </>
    ),
    voting: (
      <>
        <p>
          <span>Left Mouse Click</span> - vote for card - once everyone votes, the card for each team will be chosen based on number of votes
        </p>
        <p>
          <span>Right Mouse Click</span> - preview the image to take a better look
        </p>
      </>
    ),
    inProgress: (
      <>
        <p>
          <span>Left Mouse Click</span> - close/open a card for everyone in your team - keep in mind, that incorrectly guessed cards can't be opened
          anymore
        </p>
        <p>
          <span>Right Mouse Click</span> (if card is opened) - preview the image to take a better look
        </p>
        <p>
          <span>Right Mouse Click and Hold</span> (if card is closed) - take a peek at the image - only you will see it
        </p>
      </>
    ),
    finished: (
      <>
        <p>
          <span>Game has ended!</span>
        </p>
        <p>
          <span>Host</span> can now restart the game by clicking the button in <span>room info</span>.
        </p>
        <p>
          <span>Room info</span> can be opened by clicking the button located in the top left corner.
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
          <span>Left Mouse Click / Hold</span> - zoom in / move the image
        </p>
        <p>
          <span>Right Mouse Click</span> - reset zoom / close image preview
        </p>
      </>
    ),
  }[hintsContext];

  return { text };
};

export default useHints;
