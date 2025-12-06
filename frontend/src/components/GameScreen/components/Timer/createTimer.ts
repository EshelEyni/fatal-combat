export function createTimer({
   seconds,
   onTick,
   onDone,
}: {
   seconds: number;
   onTick: (s: number) => void;
   onDone: () => void;
}) {
   let current = seconds;
   let id: number | null = null;

   const tick = () => {
      if (current > 0) {
         id = window.setTimeout(tick, 1000);
         current -= 1;
         onTick(current);
         if (current === 0) onDone();
      }
   };

   return {
      start() {
         if (id != null) return;
         onTick(current);
         id = window.setTimeout(tick, 1000);
      },
      stop() {
         if (id != null) clearTimeout(id);
         id = null;
      },
      get value() {
         return current;
      },
   };
}

export function determineWinner(
   p1: number,
   p2: number,
   timeLeft: number,
): "player_1" | "player_2" | "tie" | null {
   if (p1 <= 0) return "player_2";
   if (p2 <= 0) return "player_1";

   if (timeLeft > 0) return null;

   if (p1 === p2) return "tie";
   return p1 > p2 ? "player_1" : "player_2";
}
