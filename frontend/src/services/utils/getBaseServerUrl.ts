export const getBaseServerUrl = (type: "api" | "websocket"): string => {
   switch (type) {
      case "websocket":
         return import.meta.env.PROD
            ? `wss://${window.location.host}/ws/`
            : "ws://localhost:8000/ws/";
      case "api":
      default:
         return import.meta.env.PROD ? "/api/" : "http://localhost:8000/api/";
   }
};
