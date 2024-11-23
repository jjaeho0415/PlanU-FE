import { useState } from "react";

interface LikeIconProps {
  bookmark: boolean;
  id: number;
}

const StarIcon: React.FC<LikeIconProps> = ({ bookmark }) => {
  const [isClicked, setIsClicked] = useState<boolean>(bookmark);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setIsClicked((prev) => !prev);
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <path
        d="M6.79581 25.6667L8.69165 17.4708L2.33331 11.9583L10.7333 11.2292L14 3.5L17.2666 11.2292L25.6666 11.9583L19.3083 17.4708L21.2041 25.6667L14 21.3208L6.79581 25.6667Z"
        fill={isClicked ? "#FFB800" : "none"}
        stroke={isClicked ? "#FFB800" : "none"}
      />
    </svg>
  );
};

export default StarIcon;
