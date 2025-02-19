import React, { useEffect, useState } from "react";
import { GameResType } from "@/app/Home/schema/game";
import CardGame from "@/app/Home/_components/card-game";

// Basic CSS for the spinner
const spinnerStyles = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const ListGame = ({ parrams }: { parrams?: string }) => {
  const [games, setGames] = useState<GameResType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllGame = async () => {
    if (!parrams) {
      setError("No parameters provided");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5041/api/Game/GetGamesByFilter?${parrams}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      const rs = await res.json();
      setGames(rs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAllGame();
  }, [parrams]);

  const renderList = () => {
    if (error) {
      return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!games || games.length === 0) {
      return <div className="text-center">No games found.</div>;
    }

    return games.map((item) => (
      <CardGame
        id={item?.id}
        imgUrl={item?.imageUrl}
        key={item?.id}
        genres={Array.from(item?.genres).toString()}
        price={item?.price}
        title={item?.name}
        game={item}
      />
    ));
  };

  return (
    <div className="w-full h-full ">
      {loading ? (
        <div className="flex w-full h-screen  justify-center items-center">
          <div className="m-auto" style={spinnerStyles}></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-5 gap-x-4 gap-y-14">
          {renderList()}
        </div>
      )}
    </div>
  );
};

export default ListGame;
