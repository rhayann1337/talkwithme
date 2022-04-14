import React, { FormEvent, useState } from "react";
import {
  ButtonLogin,
  Container,
  ContainerCenter,
  ContainerCenterAutenticated,
  ContainerContent,
} from "./style";
import googleImg from "../../assets/google-icon.svg";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Home: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const [autenticated, setAutenticated] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleAuthUser = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    setAutenticated(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    navigate("/room", { state: { roomCode: roomCode } });
  };

  return (
    <>
      <Header />
      <Container>
        <ContainerCenter>
          {autenticated ? (
            <ContainerCenterAutenticated>
              <ContainerContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="standard-basic"
                    label="Put room code"
                    variant="standard"
                    required
                    onChange={(event) => setRoomCode(event.target.value)}
                    value={roomCode}
                  />
                </form>
              </ContainerContent>
            </ContainerCenterAutenticated>
          ) : (
            <>
              <ButtonLogin onClick={handleAuthUser}>
                <img src={googleImg} alt="Google" />
                Clique para realizar seu login com a sua conta Google.
              </ButtonLogin>
            </>
          )}
        </ContainerCenter>
      </Container>
    </>
  );
};

export default Home;
