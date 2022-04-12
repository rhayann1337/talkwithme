import styled from "styled-components";
import background from "../../assets/wallpaper.jpg";

export const Container = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: url(${background});
  background-size: 100%;
`;

export const ContainerCenter = styled.div`
  border: 1px solid #dfdfdf;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;

  span {
    font: 400 16px "Roboto", sans-serif;
  }
`;

export const ContainerContent = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;

  input[type="number"] {
    border: none;
    border-bottom: 1px solid gray;
    margin: 16px;
    height: 30px;
    appearance: textfield;
    -moz-appearance: textfield;
    text-align: center;
    display: flex;
    align-items: center;
  }

  span {
    margin: 16px;
  }
`;

export const ButtonLogin = styled.button`
  margin-top: 64px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #ea4335;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;
