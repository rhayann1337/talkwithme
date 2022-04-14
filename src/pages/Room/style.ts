import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 67px);
  max-height: calc(100vh - 67px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-flow: row;
`;

export const ContainerLocal = styled.div`
  width: 50%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  border-right: solid 1px #dfdfdf;
  flex-direction: column;

  video {
    margin-bottom: 16px;
  }
`;

export const ContainerLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

interface ContainerRemoteProps {
  isActiveVideo?: boolean;
}

export const ContainerRemote = styled.div<ContainerRemoteProps>`
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  border-right: solid 1px #dfdfdf;

  ${({ isActiveVideo }) => {
    if (!isActiveVideo) {
      return css`
        video {
          display: none;
        }

        img {
          display: inline;
        }
      `;
    }
  }}

  img {
    width: 640px;
    height: 480px;
  }
`;
