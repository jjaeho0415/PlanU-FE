import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default {
  title: "Components/ImageUploader",
  component: ImageUploader,
  args: {
    iconType: "edit", // 기본값을 "edit"으로 설정
  },
};

export const Default = (args: any) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <div>
      <ImageUploader {...args} image={image} setImage={setImage} />
    </div>
  );
};
