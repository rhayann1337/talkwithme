import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Participant } from "twilio-video";
import { useParticipantNetworkQualityLevel } from "../../hooks/useParticipantNetworkQuality";

const useStyles = makeStyles({
  outerContainer: {
    width: "12px",
    height: "12px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "16px",
  },
  innerContainer: {
    display: "flex",
    alignItems: "flex-end",
    "& div": {
      width: "2px",
      marginRight: "1px",
      "&:not(:last-child)": {
        borderRight: "none",
      },
    },
  },
});

const STEP = 3;
const BARS_ARRAY = [0, 1, 2, 3, 4];

type NetworkQualityProps = {
  participant: Participant;
};

export const NetworkQualityLevel: React.FC<NetworkQualityProps> = ({
  participant,
}) => {
  const classes = useStyles();

  const { networkQualityLevel, color } =
    useParticipantNetworkQualityLevel(participant);

  if (!networkQualityLevel) return null;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        {BARS_ARRAY.map((level) => (
          <div
            key={level}
            style={{
              height: `${STEP * (level + 1)}px`,
              background:
                networkQualityLevel > level
                  ? color
                  : "rgba(255, 255, 255, 0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NetworkQualityLevel;
