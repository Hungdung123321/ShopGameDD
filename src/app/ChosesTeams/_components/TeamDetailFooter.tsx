import { useAppContext } from "@/app/context-provider";
import { Button } from "@headlessui/react";
import React, { useEffect, useState, useTransition } from "react";

enum RqState {
  INTEAM,
  WATING,
  TOTEAM,
}

interface StateMessage {
  userRqState: RqState;
  message: string;
}

const TeamDetailFooter = ({ teamid }: { teamid: string }) => {
  const { user } = useAppContext();
  const [message, setMessage] = useState<StateMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user) {
      console.log(user);
      const checkExsit = async () => {
        const res = await fetch(
          `http://localhost:5041/api/DAP/CheckUserRequestToTeam/CheckUserRequestToTeam/${user.id}/${teamid}`
        );
        const rs = await res.json();
        setMessage({ message: rs?.message, userRqState: rs?.userRqState });
      };

      checkExsit();
    }
  }, []);

  const onApply = async () => {
    startTransition(async () => {
      const res = await fetch(`http://localhost:5041/api/DAP/AddUserRequest`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          dapid: teamid,
        }),
      });
      setMessage({ message: "Wating...", userRqState: RqState.WATING });
    });
  };

  const renderButton = () => {
    switch (message?.userRqState) {
      case RqState.INTEAM:
        return (
          <Button
            className={"w-full  mr-4 p-2 bg-green-600 text-white rounded-lg"}
            // onClick={onApply}
          >
            {message.message}
          </Button>
        );
      case RqState.TOTEAM:
        return (
          <Button
            className={"w-full  mr-4 p-2 bg-green-600 text-white rounded-lg"}
            onClick={onApply}
          >
            {isPending ? "Appling...." : message.message}
          </Button>
        );
      case RqState.WATING:
        return (
          <Button
            className={"w-full  mr-4 p-2 bg-foreground text-white rounded-lg"}
          >
            {message.message}
          </Button>
        );
      default:
        break;
    }
  };

  return <div>{message ? renderButton() : <div></div>}</div>;
};

export default TeamDetailFooter;
