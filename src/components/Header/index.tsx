import React, { useEffect, useState } from "react";
import {
  ContainerButtons,
  ContainerContent,
  ContainerHeader,
  ContainerImage,
  TitleHeader,
} from "./style";
import Image from "../../assets/icon.png";
import PhoneImage from "../../assets/phone-icon.svg";

interface HeaderProps {
  roomCode?: string;
}

const Header: React.FC<HeaderProps> = (roomCode) => {
  const [code, setCode] = useState<string>();

  // useEffect(() => {
  //   if (roomCode) setCode(roomCode);
  // }, [roomCode]);

  return (
    <ContainerHeader>
      <ContainerContent>
        <ContainerImage>
          <img src={Image} alt="TalkWithMe!" />
        </ContainerImage>
        {code ? (
          <TitleHeader>Talk with me! - Sala ${code} </TitleHeader>
        ) : (
          <TitleHeader>Talk with me!</TitleHeader>
        )}

        <ContainerButtons>
          <img src={PhoneImage} alt="TalkWithMe!" />
        </ContainerButtons>
      </ContainerContent>
    </ContainerHeader>
  );
};

export default Header;
