import { Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import {
  Container,
  ContainerLoading,
  ContainerLocal,
  ContainerRemote,
} from "./style";
import "react-toastify/dist/ReactToastify.min.css";
import { useNotifications } from "../../hooks/useNotifications";
import Image from "../../assets/avatar_disabled.jpg";
import { Spinner } from "theme-ui";
interface RoomState {
  roomCode: string;
}

export const Room: React.FC = () => {
  const navigate = useNavigate();
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
  const [remoteVideoStatus, setRemoteVideoStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleShowCameraDisabled,
    handleShowCameraEnabled,
    handleShowConnectionSucess,
    handleShowMicrophoneDisabled,
    handleShowMicrophoneEnabled,
    handleShowParticipantConnected,
    handleShowParticipantDisabledAudio,
    handleShowParticipantDisabledVideo,
    handleShowParticipantEnabledAudio,
    handleShowParticipantEnabledVideo,
  } = useNotifications();

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

      setMainRoom(room);

      if (!videoTrack) return;

      audioTrack.attach();
      (videoTrack as any).attach(localVideoRef.current);
      setIsLoading(false);
      handleShowConnectionSucess();

      const publishRemoteParticipantDevices = (
        participant: RemoteParticipant
      ) => {
        setNameRemoteParticipant(participant.identity);
        handleShowParticipantConnected(participant.identity);

        participant.on("trackSubscribed", (track) => {
          if (track.kind === "video") {
            videoRemote.current?.appendChild(track.attach());
          }

          if (track.kind === "audio") {
            track.attach();
          }

          track.on("disabled", () => {
            if (track.kind === "video") {
              setRemoteVideoStatus(false);
              return handleShowParticipantDisabledVideo(participant.identity);
            }
            if (track.kind === "audio") {
              return handleShowParticipantDisabledAudio(participant.identity);
            }
          });

          track.on("enabled", () => {
            if (track.kind === "video") {
              setRemoteVideoStatus(true);
              return handleShowParticipantEnabledVideo(participant.identity);
            }
            if (track.kind === "audio") {
              return handleShowParticipantEnabledAudio(participant.identity);
            }
          });
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
      if (!microphoneStatus) {
        handleShowMicrophoneEnabled();
        return;
      }
      handleShowMicrophoneDisabled();
    });
  }, [
    mainRoom?.localParticipant.audioTracks,
    microphoneStatus,
    handleShowMicrophoneDisabled,
    handleShowMicrophoneEnabled,
  ]);

  const handleDisableCamera = useCallback(() => {
    mainRoom?.localParticipant.videoTracks.forEach((track) => {
      const video = track.track;
      video.enable(!cameraStatus);
      setCameraStatus(!cameraStatus);
      if (!cameraStatus) {
        handleShowCameraEnabled();
        return;
      }
      handleShowCameraDisabled();
    });
  }, [
    cameraStatus,
    handleShowCameraDisabled,
    handleShowCameraEnabled,
    mainRoom?.localParticipant.videoTracks,
  ]);

  useEffect(() => {
    if (!user) return navigate("/");
    setDefaultUser(user.name);

    if (!token) return;
    connectRoom(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  if (isLoading)
    return (
      <>
        <Header />
        <ContainerLoading>
          <Spinner />
        </ContainerLoading>
      </>
    );

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        <ContainerRemote isActiveVideo={remoteVideoStatus}>
          <Typography variant="h6">{nameRemoteParticipant}</Typography>
          {remoteVideoStatus ? (
            <div ref={videoRemote} />
          ) : (
            <div>
              <img src={Image} alt="Video disabled" />
            </div>
          )}
        </ContainerRemote>
      </Container>
    </>
  );
};

export default Room;
