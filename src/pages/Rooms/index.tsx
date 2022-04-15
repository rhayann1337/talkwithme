import {
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Spinner } from "theme-ui";
import Header from "../../components/Header";
import { useGetRooms } from "../../hooks/useGetRooms";
import { ContainerLoading } from "../Room/style";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useAuth } from "../../hooks/useAuth";
import { ContainerEmptyPage, ContainerList } from "./style";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Rooms: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [roomCode, setRoomCode] = useState<string>();
  const { roomList } = useGetRooms();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(
    (roomCode: string) => {
      navigate("/room", { state: { roomCode: roomCode } });
    },
    [navigate]
  );

  const handleCreateRoom = (event: FormEvent) => {
    event.preventDefault();

    if (!roomCode || roomCode.trim() === "") return;

    navigate("/room", { state: { roomCode: roomCode } });
  };

  const verifyUserAuth = useCallback(() => {
    if (!user) return navigate("/");

    return;
  }, [navigate, user]);

  useEffect(() => {
    if (!roomList) return;

    setIsLoading(false);
    if (selectedRoom) {
      handleJoinRoom(selectedRoom);
    }
    verifyUserAuth();
  }, [handleJoinRoom, roomList, selectedRoom, verifyUserAuth]);

  if (isLoading || !roomList)
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
      <Header />
      <ContainerList>
        {roomList ? (
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Icon</StyledTableCell>
                <StyledTableCell align="center">Room name</StyledTableCell>
                <StyledTableCell align="center">Host</StyledTableCell>
                <StyledTableCell align="center">
                  Qty Participants
                </StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomList.map((room) => (
                <StyledTableRow
                  key={room.uniqueName}
                  onClick={() => setSelectedRoom(room.uniqueName)}
                  sx={{ cursor: "pointer" }}
                >
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={`https://ui-avatars.com/api/?name=${room.participants[0].identity}`}
                      alt="Avatar"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {room.uniqueName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {room.participants[0].identity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {room.participants.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton edge="end" aria-label="Join">
                      <ArrowCircleRightIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <ContainerEmptyPage>
            <Typography>
              Not found already created rooms, put room code if you wanna create
            </Typography>
            <form onSubmit={handleCreateRoom}>
              <TextField
                id="standard-basic"
                variant="standard"
                required
                onChange={(event) => setRoomCode(event.target.value)}
                value={roomCode}
              />
            </form>
          </ContainerEmptyPage>
        )}
      </ContainerList>
    </>
  );
};

export default Rooms;
