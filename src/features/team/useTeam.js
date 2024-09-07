import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createJsonPatch } from "../../global/utils";
import { requestPlayerUpdate } from "../api/apiRequest";

const useTeam = () => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const teams = useMemo(() => {
    const playersDividedByTeam = {
      RED: [],
      BLUE: [],
      SPECTATORS: [],
    };

    Object.values(room.players).forEach((player) => playersDividedByTeam[player.team].push(player));
    return playersDividedByTeam;
  }, [room.players]);

  const onTeamSelect = (value) => {
    const playerPatch = createJsonPatch(["replace", "/team", value.toUpperCase()]);
    requestPlayerUpdate({ roomId: room.id, playerId: player.id, playerPatch }).catch(() => {});
  };

  return { onTeamSelect, teams };
};

export default useTeam;
