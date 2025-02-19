import React, { ChangeEvent, useState } from "react";
import UplpoadFile from "../ui/uplpoad-file";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "../ui/button";
interface PreviewImage {
  src: string;
  name: string;
}
const UploadImgMutiple = ({
  ImageChange,
  currentImgs,
}: {
  ImageChange?: (files: FileList) => void;
  currentImgs?: string[];
}) => {
  const [preview, setPreview] = useState<string[]>(currentImgs || []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      ImageChange?.(e.target.files);
      setPreview(previews);
    }
  };

  const defaultPreview = () => (
    <Carousel width={"90%"}>
      <div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172224/1.png"
          alt="image1"
        />
        <p className="legend">Image 1</p>
      </div>
      <div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172225/2.png"
          alt="image2"
        />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172226/3.png"
          alt="image3"
        />
        <p className="legend">Image 3</p>
      </div>
      <div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172227/4.png"
          alt="image4"
        />
        <p className="legend">Image 4</p>
      </div>
      <div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172229/5.png"
          alt="image5"
        />
        <p className="legend">Image 5</p>
      </div>
    </Carousel>
  );

  const renderPreviewImages = () => (
    <Carousel swipeable className="w-96 h-80">
      {preview.map((e) => {
        return (
          <div key={e}>
            <img src={e} alt="image1" />
            <p className="legend">{e}</p>
          </div>
        );
      })}
    </Carousel>
  );

  return (
    <div className="">
      <p className="text-white font-medium mb-2">Upload Images</p>
      <div className="flex justify-between">
        <div className="flex-1">
          {preview.length !== 0 || currentImgs
            ? renderPreviewImages()
            : defaultPreview()}
        </div>
        <UplpoadFile
          multiple={true}
          onChange={handleImageChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default UploadImgMutiple;
