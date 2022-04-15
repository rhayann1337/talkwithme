import styled from "styled-components";

export const ContainerList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  height: 100%;
  flex-direction: column;
  padding: 8px 40px 0px;

  img {
    border-radius: 32px;
    width: 32px;
    height: 32px;
  }
`;

export const ContainerEmptyPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;
