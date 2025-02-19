import React, { useState, useTransition } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import GameDetail from "./_components/game-detail";
import GameDescription from "./_components/game-description";
import UploadImgMutiple from "../uploads/upload-img-mutiple";
import {
  CreateGameDetail,
  CreateGameValidation,
} from "@/lib/validations/Teams";
import { array, z } from "zod";
import { useAppContext } from "@/app/context-provider";
import Upload_Img from "../uploads/upload-img";
import { Rss } from "lucide-react";

enum GamePage {
  GAMEDETAIL,
  GAMEDESCR,
  GAMEIMAGES,
}

const AddGameTab = ({
  setOpen,
  onCreateGameHandler,
  onUpdateGameHandler,
  currentGameData,
}: {
  setOpen?: (value: boolean) => void;
  onCreateGameHandler?: () => void;
  onUpdateGameHandler?: () => void;
  currentGameData?: CreateGameDetail;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    GamePage.GAMEDETAIL
  );
  const [data, setData] = useState<z.infer<typeof CreateGameValidation> | null>(
    currentGameData || null
  );
  const [image, setimage] = useState<any | null>(null);
  const [images, setimages] = useState<FileList | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);
  const [Sysr, setSysr] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { user } = useAppContext();
  const onSubmitGameDetail = async (values: CreateGameDetail) => {
    setData(values);
    setSelectedIndex(GamePage.GAMEDESCR);
  };
  const onClickGameDesc = (
    d: string | null,
    a: string | null,
    s: string | null
  ) => {
    if (d && a && s) {
      setDesc(d);
      setAbout(a);
      setSysr(s);
      setSelectedIndex(GamePage.GAMEIMAGES);
    }
  };

  const ImageChange = (files: FileList) => {
    setimages(files);
  };

  const createGame = async () => {
    if (image && images) {
      const formdata = new FormData();

      formdata.append("Files", image);

      Array.from(images).forEach((e) => {
        formdata.append("Files", e);
      });

      const resImagesUrl = await fetch(
        `http://localhost:5041/api/Files/UploadMutipleFile/upload-more?Namefolder=${data?.name}`,
        {
          method: "POST",
          redirect: "follow",
          body: formdata,
        }
      );
      if (resImagesUrl.ok) {
        const imgsrs = await resImagesUrl.json();
        const imageUrls = imgsrs?.imagesUrl as string[];
        const imageUrl = imageUrls[0];
        imageUrls.shift();
        const moreImgs = imageUrls;
        const res = await fetch("http://localhost:5041/api/Game/CreateGame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data?.name,
            developer: user?.teamId,
            serie: null,
            version: Number(data?.version),
            genres: data?.genres,
            features: data?.features,
            description: desc,
            about: about,
            systemRequirement: Sysr,
            releasedDate: data?.releasedDate,
            price: data?.price,
            imageUrl: imageUrl,
            imageUrls: moreImgs,
          }),
        });
      }
      setOpen?.(false);
    }
  };

  const onCreateGame = async () => {
    startTransition(async () => {
      await createGame();
      onCreateGameHandler?.();
    });
  };

  const uploadImage = async () => {
    if (image) {
      const formdata = new FormData();
      formdata.append("Files", image);

      const resImagesUrl = await fetch(
        `http://localhost:5041/api/Files/UploadMutipleFile/upload-more?Namefolder=${data?.name}`,
        {
          method: "POST",
          redirect: "follow",
          body: formdata,
        }
      );
      if (resImagesUrl.ok) {
        const res = await resImagesUrl.json();
        return res?.imagesUrl[0];
      }
    }
    return null;
  };

  const uploadImages = async () => {
    if (images) {
      const formdata = new FormData();

      Array.from(images || []).forEach((e) => {
        formdata.append("Files", e);
      });

      const resImagesUrl = await fetch(
        `http://localhost:5041/api/Files/UploadMutipleFile/upload-more?Namefolder=${data?.name}`,
        {
          method: "POST",
          redirect: "follow",
          body: formdata,
        }
      );
      if (resImagesUrl.ok) {
        const res = await resImagesUrl.json();
        return res?.imagesUrl;
      }
    }
    return null;
  };

  const updateGame = async () => {
    const imgurl = await uploadImage();
    const imgurls = (await uploadImages()) as string[];
    const res = await fetch("http://localhost:5041/api/Game/UpdateGame", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentGameData?.id,
        developerId: currentGameData?.developerId,
        name: data?.name,
        serie: null,
        version: Number(data?.version),
        genres: data?.genres,
        features: data?.features,
        price: data?.price,
        releasedDate: data?.releasedDate,
        description: desc || currentGameData?.description,
        about: about || currentGameData?.about,
        systemRequirement: Sysr || currentGameData?.systemRequirement,
        imageUrl: imgurl || currentGameData?.imageUrl,
        moreImageUrls: imgurls || currentGameData?.moreImageUrls,
      }),
    });
  };

  const onUpdateGame = async () => {
    startTransition(async () => {
      await updateGame();
      onUpdateGameHandler?.();
    });
  };

  const renderButtonActions = () => {
    if (selectedIndex === GamePage.GAMEIMAGES && !currentGameData) {
      return (
        <Button
          type="submit"
          className="bg-blue-500 text-white text-center mr-2 py-4 px-10 rounded-md float-right"
          variant="default"
          onClick={onCreateGame}
        >
          {isPending ? "Publishing..." : "Publish"}
        </Button>
      );
    } else if (selectedIndex === GamePage.GAMEIMAGES && currentGameData) {
      return (
        <Button
          type="submit"
          className="bg-blue-500 text-white text-center mr-2 py-4 px-10 rounded-md float-right"
          variant="default"
          onClick={onUpdateGame}
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <TabGroup
      className={"!w-[1000px]"}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabList>
        <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Game Detail
        </Tab>
        <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Description
        </Tab>
        <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Upload Image
        </Tab>
      </TabList>
      <TabPanels className={"px-3 pt-6"}>
        <TabPanel>
          <GameDetail
            data={data || undefined}
            onSubmitGameDetail={onSubmitGameDetail}
          />
        </TabPanel>
        <TabPanel>
          <GameDescription
            a={currentGameData?.about}
            d={currentGameData?.description}
            s={currentGameData?.systemRequirement}
            onClick={onClickGameDesc}
          />
        </TabPanel>
        <TabPanel>
          <Upload_Img
            curentImg={currentGameData?.imageUrl}
            getFile={(e) => setimage(e)}
            width={260}
            heght={352}
          />
          <UploadImgMutiple
            currentImgs={currentGameData?.moreImageUrls}
            ImageChange={ImageChange}
          />
        </TabPanel>
      </TabPanels>
      <div className="flex flex-row justify-end items-center mt-4">
        <DialogClose asChild>
          <Button
            type="button"
            className="bg-foreground text-white text-center mr-2 py-4 px-10 rounded-md"
            variant="default"
          >
            Close
          </Button>
        </DialogClose>
        {renderButtonActions()}
      </div>
    </TabGroup>
  );
};

export default AddGameTab;
