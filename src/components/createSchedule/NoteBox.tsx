import React, { useRef } from "react";
import styles from "./Inputs.module.scss";

interface props {
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
}

const NoteBox: React.FC<props> = ({ memo, setMemo }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeHeight = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const style = getComputedStyle(textarea);
    const lineHeight = parseInt(style.lineHeight || "20", 10);
    const maxLines = 12;
    const paddingVertical =
      parseInt(style.paddingTop || "0", 10) + parseInt(style.paddingBottom || "0", 10);
    const maxHeight = lineHeight * maxLines + paddingVertical;

    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
    resizeHeight();
  };

  return (
    <textarea
      className={styles.TextArea}
      ref={textareaRef}
      onChange={handleChange}
      placeholder="노트"
      value={memo}
    ></textarea>
  );
};

export default NoteBox;
