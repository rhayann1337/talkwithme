import axios from "axios";
import { useEffect, useState } from "react";

interface useGetTokenArgs {
  roomName: string;
  username: string;
}

type UseGetToken = (args: useGetTokenArgs) => {
  token?: string;
};

export const useGetToken: UseGetToken = ({ roomName, username }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { token },
      } = await axios.get("http://localhost:8081/token", {
        params: {
          identity: username,
          room: roomName,
        },
      });
      setToken(token);
    };
    loadData();
  }, [roomName, token, username]);

  return { token };
};
