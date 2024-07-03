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

export const extractPlayerFromRoom = (room, playerId) => {
  return room.players.find((p) => p.id === playerId);
};
