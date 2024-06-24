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
    <div className={`${styles["container"]} ${styles["grid-container"]}`}>
      <section className={`${styles.title} flex`}>GUESS</section>
      <section className="flex">
        <form onSubmit={handleSubmit(onSubmit)} className={styles["flex-vertical"]}>
          <Input
            id="playerName"
            type="text"
            label="Player name"
            register={register("playerName", { required: "Player name is required" })}
            formState={formState}
          />
          <Button type="submit">PLAY</Button>
        </form>
      </section>
      <section className={`${styles.title} flex`}>WHO?</section>
    </div>
  );
}

export default TitlePage;
