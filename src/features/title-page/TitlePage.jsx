import { useForm } from "react-hook-form";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import "../../global/styles/classes.scss";
import { isStringBlank } from "../../global/utils";
import styles from "./TitlePage.module.scss";
import useTitlePage from "./useTitlePage";

const TitlePage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { onSubmit } = useTitlePage();

  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["card"]}>
        <div className="text-center">
          <p className={styles.text}>Welcome to</p>
          <p className={styles.title}>Guess Who?</p>
          <p className={styles.text} style={{ marginTop: "3vh" }}>
            Please, choose a nickname:
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="nickname"
            type="text"
            label="Nickname"
            register={register("nickname", {
              required: "There's nothing there...",
              validate: {
                notBlank: (nickname) => !isStringBlank(nickname) || "Still nothing...",
              },
            })}
            formState={formState}
            showError
            style={{ width: "10vw" }}
          />
          <Button type="submit" enableApiLock={true} style={{ width: "10vw" }}>
            PLAY
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TitlePage;
