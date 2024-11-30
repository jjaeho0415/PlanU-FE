import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default {
  title: "Components/ImageUploader",
  component: ImageUploader,
  args: {
    iconType: "edit",
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
