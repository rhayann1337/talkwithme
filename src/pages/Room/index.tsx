import { Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  connect,
  Room as TwilioRoom,
  createLocalTracks,
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteParticipant,
} from "twilio-video";
import Header from "../../components/Header";
import VideoMenu from "../../components/VideoMenu";
import { useAuth } from "../../hooks/useAuth";
import { useGetToken } from "../../hooks/useGetToken";
import { Container, ContainerLocal, ContainerRemote } from "./style";

interface RoomState {
  roomCode: string;
}

export const Room: React.FC = () => {
  const location = useLocation();
  const state = location.state as RoomState;
  const { roomCode } = state;
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const videoRemote = useRef<HTMLDivElement>(null);
  const [defaultUser, setDefaultUser] = useState("");
  const { user } = useAuth();
  const [microphoneStatus, setMicrophoneStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);
  const { token } = useGetToken({ roomCode, username: defaultUser });

  const [nameRemoteParticipant, setNameRemoteParticipant] = useState("");
  const [mainRoom, setMainRoom] = useState<TwilioRoom>();

  const connectRoom = async (token: string) => {
    const tracks = await createLocalTracks({
      audio: true,
      video: true,
    });

    const audioTrack = tracks.find(
      (track) => track.kind === "audio"
    ) as LocalAudioTrack;
    const videoTrack = tracks.find(
      (track) => track.kind === "video"
    ) as LocalVideoTrack;

    try {
      if (!token) return window.alert("Erro de conexão, token inválido!");
      const room = await connect(token, {
        tracks,
      });
      console.log("conectou");

      setMainRoom(room);

      if (!videoTrack) return;

      audioTrack.attach();
      (videoTrack as any).attach(localVideoRef.current);

      const publishRemoteParticipantDevices = (
        participant: RemoteParticipant
      ) => {
        setNameRemoteParticipant(participant.identity);

        participant.on("trackSubscribed", (track) => {
          if (track.kind === "video") {
            videoRemote.current?.appendChild(track.attach());
            console.log("publicou video");
          }

          if (track.kind === "audio") {
            track.attach();
          }
        });
      };

      room.participants.forEach((participant) => {
        publishRemoteParticipantDevices(participant);
      });

      room.on("participantConnected", (participant) =>
        publishRemoteParticipantDevices(participant)
      );
    } catch (error: any) {
      console.error(`${error.message}`);
    }
  };

  const handleDisableMicrophone = useCallback(() => {
    mainRoom?.localParticipant.audioTracks.forEach((track) => {
      const audio = track.track;
      audio.enable(!microphoneStatus);
      setMicrophoneStatus(!microphoneStatus);
    });
  }, [microphoneStatus, mainRoom?.localParticipant.audioTracks]);

  const handleDisableCamera = useCallback(() => {
    mainRoom?.localParticipant.videoTracks.forEach((track) => {
      const video = track.track;
      video.enable(!cameraStatus);
      setCameraStatus(!cameraStatus);
    });
  }, [cameraStatus, mainRoom?.localParticipant.videoTracks]);

  useEffect(() => {
    if (!user) return;
    setDefaultUser(user.name);

    if (!token) return;
    connectRoom(token);
  }, [token, user]);

  return (
    <>
      <Header roomCode={roomCode} />
      <Container>
        <ContainerLocal>
          <Typography variant="h6" sx={{ alignItems: "flex-start" }}>
            {user?.name}
          </Typography>
          <video ref={localVideoRef}></video>
          <VideoMenu
            handleChangeMicrophoneStatus={handleDisableMicrophone}
            handleChangeVideoStatus={handleDisableCamera}
            microphoneStatus={microphoneStatus}
            videoStatus={cameraStatus}
          />
        </ContainerLocal>
        <ContainerRemote>
          <Typography variant="h6">{nameRemoteParticipant}</Typography>
          <div ref={videoRemote} />
        </ContainerRemote>
      </Container>
    </>
  );
};

export default Room;
