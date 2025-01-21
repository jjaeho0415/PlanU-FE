import React, { useRef } from "react";
import styles from "./Inputs.module.scss";

interface props {
  value?: string;
}

const NoteBox: React.FC<props> = ({ value = "" }) => {
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
      defaultValue={value ?? null}
    ></textarea>
  );
};

export default NoteBox;
