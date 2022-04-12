import { toast } from "react-toastify";

export const useNotifications = () => {
  const handleShowConnectionSucess = () => {
    toast.success("Successfully connected!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowParticipantConnected = (name: string) => {
    toast.success(`${name} successfully connected!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowParticipantDisabledAudio = (name: string) => {
    toast.error(`${name} disabled microphone!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowParticipantEnabledAudio = (name: string) => {
    toast.success(`${name} enabled microphone!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowParticipantDisabledVideo = (name: string) => {
    toast.error(`${name} disabled video!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowParticipantEnabledVideo = (name: string) => {
    toast.success(`${name} enabled video!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowMicrophoneDisabled = () => {
    toast.error("Microphone disabled", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowMicrophoneEnabled = () => {
    toast.success("Microphone enabled", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowCameraDisabled = () => {
    toast.error("Video disabled", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShowCameraEnabled = () => {
    toast.success("Video enabled", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
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
  };
};
