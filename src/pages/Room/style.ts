import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 67px);
  display: flex;
  flex-direction: column;
  flex-flow: row;
`;

export const ContainerLocal = styled.div`
  width: 50%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-right: solid 1px #dfdfdf;
`;


export const ContainerRemote = styled.div`
width: 50%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-right: solid 1px #dfdfdf;
`;
