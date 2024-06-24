import { useForm } from "react-hook-form";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import styles from "./RoomJoiningPage.module.scss";
import useRoomJoiningPage from "./useRoomJoiningPage";

const RoomJoiningPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { onCreate, onJoin } = useRoomJoiningPage();

  return (
    <main className={`${styles["container"]} ${styles["grid-container"]}`}>
      <section className={styles["flex-vertical"]}>
        <form onSubmit={handleSubmit(onJoin)} className={styles["form-create"]}>
          <span className={styles.text}>Join existing room</span>
          <Input id="roomId" type="text" label="Room ID" register={register("roomId", { required: "Room ID is required" })} formState={formState} />
          <Button type="submit">JOIN</Button>
        </form>
      </section>
      <section className={styles["flex-container"]}>
        <span className={styles.text}>OR</span>
      </section>
      <section className={styles["flex-vertical"]}>
        <div className={styles["form-join"]}>
          <span className={styles.text}>create your own!</span>
          <Button type="submit" onClick={onCreate}>
            CREATE
          </Button>
        </div>
      </section>
    </main>
  );
}

export default RoomJoiningPage;
