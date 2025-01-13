import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./mySchedule.module.scss";

const MyScheduleDetailPage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title="2024.02.19 (화)"
        rightType="moreIcon"
        backgroundColor="purple"
        handleLeftClick={() => {
          return;
        }}
        handleRightClick={() => {
          return;
        }}
      />
    </div>
  );
};

export default MyScheduleDetailPage;
