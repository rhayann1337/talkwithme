import axios from "axios";
import { useEffect, useState } from "react";

interface useGetTokenArgs {
  roomCode: string;
  username: string;
}

type UseGetToken = (args: useGetTokenArgs) => {
  token?: string;
};

export const useGetToken: UseGetToken = ({ roomCode, username }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { token },
      } = await axios.get("http://localhost:8081/token", {
        params: {
          identity: username,
          room: roomCode,
        },
      });
      setToken(token);
    };
    loadData();
  }, [roomCode, token, username]);

  return { token };
};
