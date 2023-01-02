import axios from "axios";
import { useEffect, useState } from "react";
import { Participant, Room } from "twilio-video";

type roomType = {
  participants: Participant[];
  uniqueName: string;
};

export const useGetRooms = () => {
  const [roomList, setRoomList] = useState<roomType[]>();

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await axios.get(
        "http://localhost:8081/list"
      );
      setRoomList(data);
    };
    getRooms();
  }, []);

  return { roomList };
};
