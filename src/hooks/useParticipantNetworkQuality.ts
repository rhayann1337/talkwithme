import { useEffect, useState } from "react";
import { Participant } from "twilio-video";

export const useParticipantNetworkQualityLevel = (participant: Participant) => {
  const [networkQualityLevel, setNetworkQualityLevel] = useState(
    participant.networkQualityLevel
  );
  const [color, setColor] = useState<string>();

  useEffect(() => {
    const handleNewtorkQualityLevelChange = (newNetworkQualityLevel: number) =>
      setNetworkQualityLevel(newNetworkQualityLevel);

    setNetworkQualityLevel(participant.networkQualityLevel);
    participant.on(
      "networkQualityLevelChanged",
      handleNewtorkQualityLevelChange
    );

    switch (networkQualityLevel) {
      case 0:
        setColor("red");
        break;
      case 1:
        setColor("red");
        break;
      case 2:
        setColor("yellow");
        break;
      case 3:
        setColor("yellow");
        break;
      case 4:
        setColor("lawngreen");
        break;
      case 5:
        setColor("lawngreen");
        break;
      default:
        setColor("white");
        break;
    }

    return () => {
      participant.off(
        "networkQualityLevelChanged",
        handleNewtorkQualityLevelChange
      );
    };
  }, [networkQualityLevel, participant]);

  return { networkQualityLevel, color };
};
