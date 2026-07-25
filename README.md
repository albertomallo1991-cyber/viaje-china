# 四人游中国 · Viaje a China 2026

Panel/itinerario interactivo del viaje de **Mallo, Lichu, Albertito y Nacho** (18–31 de agosto de 2026: Pekín → Xi'an → Hangzhou → Suzhou → Shanghái).

Incluye pestañas de **Resumen**, **Vuelos**, **Itinerario día a día**, **Hoteles** y **Presupuesto**. Cada actividad, hotel y trayecto tiene una fila editable (quién se encarga, coste, si ya está reservado y una nota). Cualquiera de los 4 puede editar desde su móvil u ordenador, y los cambios se ven en tiempo real en los dispositivos de los demás.

## 1. Configurar el backend compartido (Firebase, una vez)

Los datos compartidos (quién reserva qué, costes, notas, actividades añadidas) se guardan en **Firebase Realtime Database**, gratis. Sin este paso, la app funciona pero cada uno solo ve sus propios cambios en su dispositivo.

1. Ve a [console.firebase.google.com](https://console.firebase.google.com/) e inicia sesión con cualquier cuenta de Google.
2. **Crear un proyecto** → dale un nombre, p. ej. `viaje-china-2026`. Puedes desactivar Google Analytics.
3. En el menú lateral: **Compilación → Realtime Database → Crear base de datos**. Elige una región (p. ej. `europe-west1`) y arranca en **modo de prueba**.
4. Ve a ⚙️ **Configuración del proyecto → General**, baja hasta "Tus apps", pulsa el icono `</>` (Web), dale un nombre y pulsa "Registrar app".
5. Firebase te muestra un objeto `firebaseConfig`. Copia esos valores en [`firebase-config.js`](./firebase-config.js), sustituyendo los de ejemplo.
6. Haz commit y push de `firebase-config.js` (las claves de Firebase para apps web no son secretas — la protección real está en las reglas de la base de datos, ver más abajo).

### Reglas recomendadas de la base de datos

En Firebase console → Realtime Database → Reglas, puedes dejar el modo de prueba (abierto) mientras solo lo uséis los 4, o restringirlo un poco a la ruta del viaje:

```json
{
  "rules": {
    "trips": {
      "china2026": {
        ".read": true,
        ".write": true
      }
    },
    "$other": {
      ".read": false,
      ".write": false
    }
  }
}
```

El modo de prueba de Firebase caduca solo (normalmente a los 30 días); si eso pasa, vuelve a Reglas y pega el JSON de arriba para que la app siga funcionando indefinidamente.

## 2. Publicar en GitHub Pages

1. En GitHub, entra en este repositorio → **Settings → Pages**.
2. En "Build and deployment", elige **Deploy from a branch**.
3. Selecciona la rama `main` (una vez esta rama esté fusionada) y la carpeta `/ (root)`.
4. Guarda. GitHub te dará una URL tipo `https://albertomallo1991-cyber.github.io/viaje-china/` — compártela con los 4.

Cada vez que alguien haga push a `main`, GitHub Pages se actualiza solo en 1–2 minutos.

## 3. Uso diario

- Al abrir la app, cada uno pulsa su nombre en "¿Quién eres?" (se recuerda en ese dispositivo).
- Cualquier cambio (asignar quién reserva, coste, marcar como reservado, nota, añadir/quitar actividad) se guarda solo y lo ven los demás sin recargar.
- El indicador junto a los datos de la cabecera muestra si estás sincronizado con el grupo.
- Si Firebase se queda sin conexión un momento, los cambios se guardan en cuanto vuelve la conexión (comportamiento propio de Firebase).

## Estructura del proyecto

```
index.html          Estructura de la página
style.css            Estilos (estética "billete de tren / sello chino")
app.js               Datos del viaje + lógica de la app + sincronización con Firebase
firebase-config.js   Tus claves de Firebase (edítalo tú, ver paso 1)
```

Para cambiar datos del viaje (vuelos, hoteles, actividades planificadas de partida), edita las constantes `FLIGHTS` y `DAYS` al principio de `app.js`. Los cambios que hagáis en vivo desde la app (quién reserva, costes, notas, actividades añadidas) no tocan ese archivo — viven en Firebase.
