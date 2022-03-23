import { Typography } from "@mui/material"
import { useRef } from "react";
import Header from "../../components/Header"
import { Container, ContainerLocal, ContainerRemote } from "./style"

export const Room: React.FC = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);


    return (
        <>
        <Header />
        <Container>
            <ContainerLocal>
                <Typography variant="h6">
                    Local Video
                </Typography>
                <video ref={localVideoRef}></video>
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