import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import {
  ContainerMicrophone,
  ContainerVideo,
  ContainerVideoMenu,
} from "./style";

interface VideoMenuProps {
  handleChangeMicrophoneStatus?: () => void;
  handleChangeVideoStatus?: () => void;
  microphoneStatus?: boolean
  videoStatus?: boolean
}

export const VideoMenu: React.FC<VideoMenuProps> = ({
  handleChangeMicrophoneStatus,
  handleChangeVideoStatus,
  microphoneStatus, videoStatus
}) => {


  return (
    <ContainerVideoMenu>
      <ContainerMicrophone onClick={handleChangeMicrophoneStatus}>
          {microphoneStatus ? <MicIcon /> : <MicOffOutlinedIcon />}
      </ContainerMicrophone>
      <ContainerVideo onClick={handleChangeVideoStatus}>
        {videoStatus ? <VideoCallIcon /> : <VideocamOffOutlinedIcon />}
      </ContainerVideo>
    </ContainerVideoMenu>
  );
};

export default VideoMenu;
