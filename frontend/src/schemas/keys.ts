import z from "zod";

const player1Keys = ["KeyA", "KeyD", "KeyW", "KeyS", "Space"] as const;

const player2Keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"] as const;

export const Player1KeySchema = z.enum(player1Keys);
export const Player2KeySchema = z.enum(player2Keys);

export const AllowedKeySchema = z.enum([...Player1KeySchema.options, ...Player2KeySchema.options]);

type AllowedKey = z.infer<typeof AllowedKeySchema>;

export const isAllowedKey = (code: string): code is AllowedKey => {
   return AllowedKeySchema.safeParse(code).success;
};
