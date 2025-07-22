import obtenerGrupos from "./backend/grupos.js";
import obtenerllaves from "./backend/llaves.js";
import { obtenerPartidos, actualizarPartido } from "./backend/partidos.js";
import { resetearFixture } from "./backend/resetear.js";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

subscribeGETEvent("grupos", () => obtenerGrupos());
subscribeGETEvent("partidos", () => obtenerPartidos());
subscribePOSTEvent("actualizarPartido", (data) => actualizarPartido(data));
subscribeGETEvent("resetear", () => resetearFixture());
subscribeGETEvent("llaves", () => obtenerllaves());

startServer();
