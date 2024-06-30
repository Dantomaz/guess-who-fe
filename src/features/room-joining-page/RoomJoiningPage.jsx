import { useForm } from "react-hook-form";
import Button from "../../global/components/button/Button";
import Input from "../../global/components/input/Input";
import styles from "./RoomJoiningPage.module.scss";
import useRoomJoiningPage from "./useRoomJoiningPage";

const RoomJoiningPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { onCreate, onJoin } = useRoomJoiningPage();

  return (
    <div className={styles["grid-container"]}>
      <section className={`${styles["card"]} ${styles["card-join"]}`}>
        <form onSubmit={handleSubmit(onJoin)}>
          <span className={styles.text}>Join existing room</span>
          <Input id="roomId" type="text" label="Room ID" register={register("roomId", { required: "Room ID is required" })} formState={formState} />
          <Button type="submit" style={{ width: "200px" }}>
            JOIN
          </Button>
        </form>
      </section>
      <section className={`${styles["card"]} ${styles["card-create"]}`}>
        <div className={styles["form-create"]}>
          <span className={styles.text}>or create your own!</span>
          <Button type="submit" onClick={onCreate} style={{ width: "200px" }}>
            CREATE
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RoomJoiningPage;
