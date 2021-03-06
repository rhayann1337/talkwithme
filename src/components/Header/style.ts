import styled from "styled-components";

export const ContainerHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font: 400 16px "Roboto", sans-serif;
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 30px;
    width: 30px;
    cursor: pointer;
    border-radius: 16px;
    margin-left: 4px;
    margin-right: 8px;
  }
`;

export const ContainerImage = styled.div`
  img {
    margin-left: 150px;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
`;

export const TitleHeader = styled.h3`
  margin: 0;
`;
