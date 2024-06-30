import { useForm } from "react-hook-form";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import "../../global/styles/classes.scss";
import styles from "./TitlePage.module.scss";
import useTitlePage from "./useTitlePage";

const TitlePage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { onSubmit } = useTitlePage();

  return (
    <div className={`${styles["container"]}`}>
      <main className={styles["card"]}>
        <section className="text-center">
          <p className={styles.text}>Welcome to</p>
          <p className={styles.title}>Guess Who?</p>
          <p className={styles.text} style={{ marginTop: "30px" }}>
            Please, choose a nickname:
          </p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="nickname"
            type="text"
            label="Nickname"
            register={register("nickname", { required: "Required" })}
            formState={formState}
            style={{ width: "200px" }}
          />
          <Button type="submit" style={{ width: "200px" }}>
            PLAY
          </Button>
        </form>
      </main>
    </div>
  );
};

export default TitlePage;
