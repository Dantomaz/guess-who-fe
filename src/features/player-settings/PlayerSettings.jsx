import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import { isStringBlank, isStringSame } from "../../global/utils";
import styles from "./PlayerSettings.module.scss";
import TeamSelect from "./team-select/TeamSelect";
import usePlayerSettings from "./usePlayerSettings";

const PlayerSettings = ({ hidePanel }) => {
  const player = useSelector((state) => state.playerManager.player);
  const { register, reset, handleSubmit, formState } = useForm({ defaultValues: { nickname: player?.name } });
  const { changeNickname, onLeave } = usePlayerSettings({ hidePanel });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <div className={styles["team-select"]}>
        <TeamSelect />
      </div>
      <div className={styles["settings"]}>
        <div className={styles["section"]}>
          <form onSubmit={handleSubmit(changeNickname)}>
            <Input
              id="nickname"
              type="text"
              label="Nickname"
              register={register("nickname", {
                required: "There's nothing there...",
                validate: {
                  notBlank: (nickname) => !isStringBlank(nickname) || "Still nothing...",
                  notChanged: (nickname) => !isStringSame(nickname.trim(), player.name.trim()) || "It's already your nickname",
                  tooLong: (nickname) => nickname.trim().length <= 15 || "It's too long",
                },
              })}
              formState={formState}
              showError
            />
            <Button type="submit">Update nickname</Button>
          </form>
        </div>
        <div className={styles["section"]}>
          <Button onClick={onLeave} enableApiLock={true} style={{ width: "10vw" }}>
            Leave the room
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlayerSettings;
