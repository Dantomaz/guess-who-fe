import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import { isStringBlank, isUUID } from "../../global/utils";
import LanguageSelect from "../player-settings/language-select/LanguageSelect";
import styles from "./RoomJoiningPage.module.scss";
import useRoomJoiningPage from "./useRoomJoiningPage";

const RoomJoiningPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();
  const { onCreate, onJoin, errorOnJoin } = useRoomJoiningPage();

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["dashboard"]}>
        <LanguageSelect />
      </div>
      <div></div>
      <section className={`${styles["card"]} ${styles["card-join"]}`}>
        <form onSubmit={handleSubmit(onJoin)}>
          <span className={styles.text}>{t("joining-page.card-join.title")}</span>
          <Input
            id="roomId"
            type="text"
            label={t("joining-page.card-join.input-field.placeholder")}
            register={register("roomId", {
              required: t("joining-page.card-join.input-field.error.required"),
              validate: {
                notBlank: (nickname) => !isStringBlank(nickname) || t("joining-page.card-join.input-field.error.empty"),
                isUUID: (roomId) => isUUID(roomId) || t("joining-page.card-join.input-field.error.wrong-format"),
              },
            })}
            formState={formState}
            formError={errorOnJoin}
            showError
          />
          <Button type="submit" enableApiLock={true} style={{ width: "11vw" }}>
            {t("joining-page.card-join.button")}
          </Button>
        </form>
      </section>
      <section className={`${styles["card"]} ${styles["card-create"]}`}>
        <div className={styles["form-create"]}>
          <span className={styles.text}>{t("joining-page.card-create.title")}</span>
          <Button type="submit" enableApiLock={true} onClick={onCreate} style={{ width: "11vw" }}>
            {t("joining-page.card-create.button")}
          </Button>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default RoomJoiningPage;
