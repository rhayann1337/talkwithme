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
import { TextField, Typography, Button } from "@mui/material";

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

  const handleRedirectToRoomList = () => {
    navigate("/rooms");
  };

  return (
    <>
      <Header />
      <Container>
        <ContainerCenter>
          {autenticated ? (
            <ContainerCenterAutenticated>
              <ContainerContent>
                <Typography>Put room code to join or create room</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    required
                    onChange={(event) => setRoomCode(event.target.value)}
                    value={roomCode}
                  />
                </form>
                <Typography sx={{ marginTop: "16px", marginBottom: "16px" }}>
                  If you prefer, you can see room list already created.
                </Typography>
                <Button variant="contained" onClick={handleRedirectToRoomList}>
                  Room list
                </Button>
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
