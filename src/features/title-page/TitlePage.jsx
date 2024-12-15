import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import "../../global/styles/classes.scss";
import { isStringBlank } from "../../global/utils";
import LanguageSelect from "../player-settings/language-select/LanguageSelect";
import styles from "./TitlePage.module.scss";
import useTitlePage from "./useTitlePage";

const TitlePage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();
  const { onSubmit } = useTitlePage();

  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["dashboard"]}>
        <LanguageSelect />
      </div>
      <div className={styles["card"]}>
        <div className="text-center">
          <p className={styles.text}>{t("title-page.title.welcome")}</p>
          <p className={styles.title}>{t("title-page.title.name")}</p>
          <p className={styles.text} style={{ marginTop: "3vh" }}>
            {t("title-page.nickname-prompt")}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="nickname"
            type="text"
            label={t("title-page.input-field.placeholder")}
            register={register("nickname", {
              required: t("title-page.input-field.error.required"),
              validate: {
                notBlank: (nickname) => !isStringBlank(nickname) || t("title-page.input-field.error.empty"),
                tooLong: (nickname) => nickname.trim().length <= 15 || t("player-settings.input-field.error.too-long"),
              },
            })}
            maxLength="15"
            formState={formState}
            showError
            style={{ width: "10vw" }}
          />
          <Button type="submit" enableApiLock={true} style={{ width: "10vw" }}>
            {t("title-page.button.play")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TitlePage;
