import { Trans } from "react-i18next";
import { useSelector } from "react-redux";

const useHints = () => {
  const hintsContext = useSelector((state) => state.hintsManager.context);
  const host = useSelector((state) => state.playerManager.player.host);

  const text = {
    new: host ? (
      <>
        <p>
          <Trans i18nKey="hints.new.host.p1">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.new.host.p2">
            <span></span>
          </Trans>
        </p>
      </>
    ) : (
      <p>
        <Trans i18nKey="hints.new.player">
          <span></span>
        </Trans>
      </p>
    ),
    voting: (
      <>
        <p>
          <Trans i18nKey="hints.voting.p1">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.voting.p2">
            <span></span>
          </Trans>
        </p>
      </>
    ),
    inProgress: (
      <>
        <p>
          <Trans i18nKey="hints.inProgress.p1">
            <span style={{ fontWeight: "bold" }}></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.inProgress.p2">
            <span style={{ fontWeight: "bold" }}></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.inProgress.p3">
            <span style={{ fontWeight: "bold" }}></span>
          </Trans>
        </p>
      </>
    ),
    finished: (
      <>
        <p>
          <Trans i18nKey="hints.finished.p1">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.finished.p2">
            <span></span>
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.finished.p3">
            <span></span>
            <span></span>
          </Trans>
        </p>
      </>
    ),
    preview: (
      <>
        <p>
          <Trans i18nKey="hints.preview.p1">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.preview.p2">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.preview.p3">
            <span></span>
          </Trans>
        </p>
        <p>
          <Trans i18nKey="hints.preview.p4">
            <span></span>
          </Trans>
        </p>
      </>
    ),
  }[hintsContext];

  return { text };
};

export default useHints;
