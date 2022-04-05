import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  connect,
  createLocalTracks,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
  RemoteParticipant,
} from "twilio-video";
import Header from "../../components/Header";
import VideoMenu from "../../components/VideoMenu";
import { useAuth } from "../../hooks/useAuth";
import { useGetToken } from "../../hooks/useGetToken";
import { Container, ContainerLocal, ContainerRemote } from "./style";

export const Room: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const videoRemote = useRef<HTMLDivElement>(null);
  const [defaultUser, setDefaultUser] = useState("default");
  const { user } = useAuth();

  const [microphoneStatus, setMicrophoneStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);
  const [roomName, setRoomName] = useState("1234");
  const { token } = useGetToken({ roomName, username: defaultUser });
  console.log(user?.name);
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>();
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack>();
  const [nameRemoteParticipant, setNameRemoteParticipant] = useState("");

  const handleDisableMicrophone = () => {
    setMicrophoneStatus(!microphoneStatus);
  };

  const handleDisableCamera = () => {
    setCameraStatus(!cameraStatus);
  };

  const connectRoom = async () => {
    console.log("conectou");
    const dataTrack = new LocalDataTrack();

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

    setLocalAudioTrack(audioTrack);
    setLocalVideoTrack(videoTrack);

    try {
      if (!token) return;
      const room = await connect(token, {
        tracks,
      });

      if (!videoTrack) return;

      const localParticipant = room.localParticipant;
      console.log(
        `Connected to the Room as LocalParticipant "${localParticipant.identity}"`
      );

      audioTrack.attach();
      (videoTrack as any).attach(localVideoRef.current);

      const setupParticipant = (participant: RemoteParticipant) => {
        console.log(
          `Participant "${participant.identity}" is connected to the Room`
        );

        setNameRemoteParticipant(participant.identity);

        room.on("participantConnected", (participant) =>
          participant.on("trackSubscribed", (track) => {
            console.log(
              `Participant "${participant.identity}" added ${track.kind} Track ${track.sid}`
            );

            if (track.kind === "video") {
              videoRemote.current?.appendChild(track.attach());
            }

            if (track.kind === "audio") {
              track.attach();
            }
          })
        );
      };

      room.participants.forEach((participant) => {
        setupParticipant(participant);
        console.log("participant", participant);
      });

      room.on("participantConnected", (participant) =>
        setupParticipant(participant)
      );
    } catch (error: any) {
      console.error(`Unable to connect to Room: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!user) return;
    setDefaultUser(user.name);

    connectRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Header />
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
