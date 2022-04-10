import React, { FormEvent, useState } from "react";
import {
  ButtonLogin,
  Container,
  ContainerCenter,
  ContainerContent,
} from "./style";
import googleImg from "../../assets/google-icon.svg";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

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
            <ContainerContent>
              <span>Talk with me!</span>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  onChange={(event) => setRoomCode(event.target.value)}
                  value={roomCode}
                  placeholder="Digite o código da sala"
                />
                <Button type="submit">Entrar na sala</Button>
              </form>
            </ContainerContent>
          ) : (
            <ButtonLogin onClick={handleAuthUser}>
              <img src={googleImg} alt="Google" />
              Realize seu login com a sua conta Google.
            </ButtonLogin>
          )}
        </ContainerCenter>
      </Container>
    </>
  );
};

export default Home;
