import React, { useState } from "react";
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

const Home: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const [autenticated, setAutenticated] = useState(false);

  const handleAuthUser = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    setAutenticated(true);
  };

  return (
    <>
      <Header />
      <Container>
        <ContainerCenter>
          {autenticated ? (
            <ContainerContent>
              <span>Talk with me!</span>
              <input type="number" placeholder="Digite o código da sala" />
              <Button type="submit">Entrar na sala</Button>
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
