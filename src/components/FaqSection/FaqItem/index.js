import React from "react";
import openIcon from "../../../assets/images/arrowDown.svg";
import close from "../../../assets/images/arrowUp.svg";
import styles from "./faqitem.scss";

const FaqItem = ({ title, text, currentRow }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [currentRow]);

  return (
    <>
      <div className={styles.questionBlock}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
          src={close}
        >
          <p>{title}</p>
          {open ? (
            <img
              style={{ cursor: "pointer", marginRight: 10 }}
              onClick={() => setOpen(!open)}
              src={close}
            />
          ) : (
            <img
              style={{ cursor: "pointer", marginRight: 10 }}
              onClick={() => setOpen(!open)}
              src={openIcon}
            />
          )}
        </div>
      </div>
      {open && (
        <div className={styles.answerBlock}>
          <div dangerouslySetInnerHTML={{__html: text}}/>
        </div>
      )}
    </>
  );
};

export default FaqItem;
