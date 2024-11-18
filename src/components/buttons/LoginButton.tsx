import styles from "./loginBtn.module.scss";

interface ILoginBtn {
  onClick: () => void;
  text: string;
}

export default function LoginButton({ onClick, text }: ILoginBtn) {
  return (
    <div className={styles.Container} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
