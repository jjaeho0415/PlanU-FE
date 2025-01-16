import React, { useRef } from "react";
import styles from "./Inputs.module.scss";

const NoteBox: React.FC = () => {
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

  return (
    <textarea
      className={styles.TextArea}
      ref={textareaRef}
      onInput={resizeHeight}
      onKeyDown={resizeHeight}
      placeholder="노트"
    ></textarea>
  );
};

export default NoteBox;
