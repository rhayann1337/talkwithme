import styled from "styled-components";

export const ContainerVideoMenu = styled.div`
  height: 48px;
  width: 100px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
`;

export const ContainerMicrophone = styled.div`
  height: 32px;
  width: 32px;
  border: 1px solid #dfdfdf;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  cursor: pointer;
`;
export const ContainerVideo = styled.div`
  height: 32px;
  width: 32px;
  border: 1px solid #dfdfdf;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  cursor: pointer;;

  &.hover {
      opacity: 0.7;
  }
`;
