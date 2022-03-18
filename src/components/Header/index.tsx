import React from "react";
import {
  ContainerButtons,
  ContainerContent,
  ContainerHeader,
  ContainerImage,
  TitleHeader,
} from "./style";
import Image from "../../assets/icon.png";
import PhoneImage from "../../assets/phone-icon.svg";

const Header: React.FC = () => {
  return (
    <ContainerHeader>
      <ContainerContent>
        <ContainerImage>
          <img src={Image} alt="TalkWithMe!" />
        </ContainerImage>
        <TitleHeader>Talk with me!</TitleHeader>
        <ContainerButtons>
          <img src={PhoneImage} alt="TalkWithMe!" />
        </ContainerButtons>
      </ContainerContent>
    </ContainerHeader>
  );
};

export default Header;
