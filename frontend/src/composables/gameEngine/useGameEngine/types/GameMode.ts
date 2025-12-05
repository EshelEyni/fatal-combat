export const GameMode = {
   LOCAL_MULTIPLAYER: "local-multiplayer",
   SINGLE_PLAYER: "single-player",
   ONLINE_MULTIPLAYER: "online-multiplayer",
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];
