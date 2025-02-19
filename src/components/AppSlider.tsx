import { GameResType } from "@/app/Home/schema/game";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const AppSlider = ({
  onChange,
  games,
}: {
  onChange?: (from: number, to: number) => void;
  games?: GameResType[];
}) => {
  return (
    <Slide
      autoplay={false}
      canSwipe
      transitionDuration={500}
      onChange={(from, to) => {
        onChange?.(from, to);
      }}
      onStartChange={function noRefCheck() {}}
      arrows
    >
      {games ? (
        games.map((e) => (
          <div key={e.id} className="each-slide-effect">
            <div className="w-fit h-fit flex flex-row items-center ml-10">
              <div className="w-40 h-w-40 rounded-lg mr-3">
                <img
                  className="w-full h-full rounded-lg"
                  src={e.imageUrl}
                  alt=""
                />
              </div>
              <div>
                <p className="text-white">{e.genres.toString()}</p>
                <p className="text-white text-xl font-medium">{e.name}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </Slide>
  );
};

export default AppSlider;
