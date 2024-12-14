import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import { isStringBlank, isStringSame } from "../../global/utils";
import LanguageSelect from "./language-select/LanguageSelect";
import styles from "./PlayerSettings.module.scss";
import TeamSelect from "./team-select/TeamSelect";
import usePlayerSettings from "./usePlayerSettings";

const PlayerSettings = ({ hidePanel }) => {
  const { t } = useTranslation();
  const player = useSelector((state) => state.playerManager.player);
  const { register, reset, handleSubmit, formState } = useForm({ defaultValues: { nickname: player?.name } });
  const { changeNickname, onLeave } = usePlayerSettings({ hidePanel });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className={styles["container"]}>
      <div className={styles["team-select"]}>
        <TeamSelect />
      </div>
      <div className={styles["settings"]}>
        <div className={styles["section"]}>
          <div className={styles["language"]}>
            {t("player-settings.language.title")}
            <LanguageSelect />
          </div>
          <form onSubmit={handleSubmit(changeNickname)}>
            <Input
              id="nickname"
              type="text"
              label={t("player-settings.input-field.placeholder")}
              register={register("nickname", {
                required: t("player-settings.input-field.error.required"),
                validate: {
                  notBlank: (nickname) => !isStringBlank(nickname) || t("player-settings.input-field.error.empty"),
                  notChanged: (nickname) => !isStringSame(nickname.trim(), player.name.trim()) || t("player-settings.input-field.error.not-changed"),
                  tooLong: (nickname) => nickname.trim().length <= 15 || t("player-settings.input-field.error.too-long"),
                },
              })}
              formState={formState}
              showError
            />
            <Button type="submit">{t("player-settings.button.update-nickname")}</Button>
          </form>
        </div>
        <div className={styles["section"]}>
          <Button onClick={onLeave} enableApiLock={true} style={{ width: "10vw" }}>
            {t("player-settings.button.leave")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
