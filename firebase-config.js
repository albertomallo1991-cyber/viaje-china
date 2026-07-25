// ============================================================
// Configuración de Firebase — rellenar UNA vez y listo.
//
// 1. Ve a https://console.firebase.google.com/ e inicia sesión con
//    cualquier cuenta de Google (no hace falta que sea la del grupo).
// 2. "Crear un proyecto" → nómbralo, por ejemplo, "viaje-china-2026".
//    Puedes desactivar Google Analytics, no hace falta para esto.
// 3. En el menú de la izquierda: Compilación → Realtime Database →
//    "Crear base de datos". Elige una región (p. ej. europe-west1) y
//    arranca en "modo de prueba" (reglas abiertas de lectura/escritura).
// 4. Ve a ⚙️ Configuración del proyecto → General → baja hasta
//    "Tus apps" → pulsa el icono </> (Web) → dale un nombre → "Registrar app".
// 5. Firebase te muestra un objeto `firebaseConfig`. Copia esos valores
//    y pégalos aquí abajo, sustituyendo los de ejemplo.
// 6. Guarda este archivo, haz commit y push. Listo: los 4 compartiréis
//    los mismos datos en tiempo real.
//
// Nota: estas claves NO son secretas (son públicas por diseño en apps
// web de Firebase); lo que protege los datos son las reglas de la base
// de datos, no ocultar esta configuración. Aun así, conviene restringir
// las reglas más adelante (ver README.md).
// ============================================================

export const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxxxxxxxx",
};

// Ruta dentro de la base de datos donde vive toda la info del viaje.
// No hace falta tocarla salvo que quieras reutilizar la misma base de
// datos de Firebase para más de un viaje.
export const TRIP_PATH = "trips/china2026";
