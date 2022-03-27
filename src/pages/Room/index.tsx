import { Typography } from "@mui/material"
import { useRef, useState } from "react";
import Header from "../../components/Header"
import VideoMenu from "../../components/VideoMenu";
import { useAuth } from "../../hooks/useAuth";
import { Container, ContainerLocal, ContainerRemote } from "./style"

export const Room: React.FC = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const { user } = useAuth()
    const [microphoneStatus, setMicrophoneStatus] = useState(true)
    const [cameraStatus, setCameraStatus] = useState(true)

    const handleDisableMicrophone = () => {
        setMicrophoneStatus(!microphoneStatus)
    }

    const handleDisableCamera = () => {
        setCameraStatus(!cameraStatus)
    }

    return (
        <>
        <Header />
        <Container>
            <ContainerLocal>
                <Typography variant="h6" sx={{ alignItems: 'flex-start'}}>
                    {user?.name}
                </Typography>
                <video ref={localVideoRef}></video>
                <VideoMenu handleChangeMicrophoneStatus={handleDisableMicrophone} handleChangeVideoStatus={handleDisableCamera} microphoneStatus={microphoneStatus} videoStatus={cameraStatus} />
            </ContainerLocal>
            <ContainerRemote>
            <Typography variant="h6">
                    Remote Video
                </Typography>
            </ContainerRemote>
        </Container>
        </>
    )
}

export default Room 