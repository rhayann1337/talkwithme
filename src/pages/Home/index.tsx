import React from "react";
import { ButtonLogin, Container, ContainerCenter } from "./style";
import googleImg from "../../assets/google-icon.svg";

const Home: React.FC = () => {
  return (
    <Container>
      <ContainerCenter>
        <span>Talk with me!</span>
        <ButtonLogin>
          <img src={googleImg} alt="Google" />
          Realize seu login com a sua conta Google.
        </ButtonLogin>
      </ContainerCenter>
    </Container>
  );
};

export default Home;
