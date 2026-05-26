import styles from "./Loader.module.scss";

const Loader = (props: any) => {
  return (
    <div className={styles.loader_bg}>
      <span
        className={styles.loader}
        style={{
          height: props?.height,
          width: props?.width,
        }}
      ></span>
    </div>
  );
};
export default Loader;
