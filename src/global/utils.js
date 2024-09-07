export const parsePossibleJSONFromString = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return string;
  }
};

export const insertVariables = (string, ...variables) => {
  if (typeof string != "string") {
    return string;
  }

  variables.forEach((variable) => {
    string = string.replace(/({[^}]+})/, variable);
  });

  return string;
};

export const findHost = (players) => {
  return Object.values(players).find((player) => player.host);
};

export const isStringBlank = (string) => {
  if (typeof string !== "string") {
    return true;
  }
  return string.trim().length === 0;
};

export const isStringSame = (string1, string2) => {
  if (typeof string1 !== "string") {
    return false;
  }
  if (typeof string2 !== "string") {
    return false;
  }
  return string1 === string2;
};

export const isUUID = (string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(string);
};

export const extractAxiosErrorResponseDetail = (error) => {
  const detail = error?.response?.data?.detail;
  if (!detail) {
    return error;
  }
  return trimDetailVariables(detail);
};

export const trimDetailVariables = (detail) => {
  return detail.replace(/\([^)]*\)/, "").trim();
};

export const createJsonPatch = (...jsonPointers) => {
  return jsonPointers.map((jsonPointer) => ({ op: jsonPointer[0], path: jsonPointer[1], value: jsonPointer[2] }));
};

export const listVotersByCardNumbers = (players, votes) => {
  const resultMap = new Map();

  new Map(Object.entries(votes)).forEach((cardNr, playerId) => {
    // If the card number is not already in the map, initialize it with an empty array
    if (!resultMap.has(cardNr)) {
      resultMap.set(cardNr, []);
    }
    resultMap.get(cardNr).push(players[playerId]);
  });

  // example resultMap: {
  //   cardNr1: [player1, player2],
  //   cardNr2: [player3],
  //   ...
  // }
  return resultMap;
};

export const areBothTeamsPresent = (players) => {
  const playersList = Object.values(players);
  const bluePresent = playersList.find((player) => player.team === "BLUE");
  const redPresent = playersList.find((player) => player.team === "RED");
  return bluePresent && redPresent;
};
