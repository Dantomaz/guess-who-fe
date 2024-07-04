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
  return Object.values(room.players).find((player) => player.id === playerId);
};

export const findHost = (room) => {
  return Object.values(room.players).find((player) => player.host);
};

export const isBlankString = (string) => {
  if (typeof string !== "string") {
    return;
  }
  return string.trim().length === 0;
};

export const isUUID = (string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(string);
};
