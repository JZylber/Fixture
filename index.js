import obtenerGrupos from "./backend/grupos.js";
import obtenerllaves from "./backend/llaves.js";
import { obtenerPartidos, actualizarPartido } from "./backend/partidos.js";
import { resetearFixture } from "./backend/resetear.js";
import { onEvent, startServer } from "soquetic";

onEvent("grupos", () => obtenerGrupos());
onEvent("partidos", () => obtenerPartidos());
onEvent("actualizarPartido", (data) => actualizarPartido(data));
onEvent("resetear", () => resetearFixture());
onEvent("llaves", () => obtenerllaves());

startServer();
