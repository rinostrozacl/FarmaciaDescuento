import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";
import type { Messaging } from "firebase/messaging";

// Variables para mantener referencias a los servicios
let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firestoreDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;
let firebaseAnalytics: Analytics | null = null;
let firebaseMessaging: Messaging | null = null;

// Interfaz para los servicios de Firebase
export interface FirebaseServices {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  analytics: Analytics | null;
  messaging: Messaging | null;
}

export default defineNuxtPlugin({
  name: "firebase",
  enforce: "pre",
  async setup(nuxtApp) {
    const config = useRuntimeConfig();

    // Verificar que tenemos la configuración de Firebase
    if (!config.public.firebase.apiKey) {
      console.error(
        "Firebase configuration is missing. Please check your .env file."
      );
      return;
    }

    const firebaseConfig = {
      apiKey: config.public.firebase.apiKey,
      authDomain: config.public.firebase.authDomain,
      projectId: config.public.firebase.projectId,
      storageBucket: config.public.firebase.storageBucket,
      messagingSenderId: config.public.firebase.messagingSenderId,
      appId: config.public.firebase.appId,
      measurementId: config.public.firebase.measurementId,
    };

    // Initialize Firebase (solo una vez)
    if (!firebaseApp) {
      firebaseApp = initializeApp(firebaseConfig);
      firebaseAuth = getAuth(firebaseApp);
      firestoreDb = getFirestore(firebaseApp);
      firebaseStorage = getStorage(firebaseApp);

      // Inicializar Analytics solo en el cliente y si es compatible
      if (process.client) {
        try {
          const analyticsSupported = await isSupported();
          if (analyticsSupported) {
            firebaseAnalytics = getAnalytics(firebaseApp);
          }
        } catch (error) {
          console.error("Firebase Analytics error:", error);
        }
      }

      // Inicializar Messaging solo en el cliente
      if (process.client) {
        try {
          firebaseMessaging = getMessaging(firebaseApp);
        } catch (error) {
          console.error("Firebase Messaging error:", error);
        }
      }

      // Configurar idioma para autenticación
      if (firebaseAuth && process.client) {
        firebaseAuth.languageCode = "es";
      }
    }

    return {
      provide: {
        firebase: {
          app: firebaseApp,
          auth: firebaseAuth,
          db: firestoreDb,
          storage: firebaseStorage,
          analytics: firebaseAnalytics,
          messaging: firebaseMessaging,
        } as FirebaseServices,
      },
    };
  },
});

// Función auxiliar para obtener los servicios de Firebase
// Esto debe usarse solo después de que el plugin se ha inicializado
export function useFirebaseServices(): FirebaseServices {
  if (!firebaseApp) {
    throw new Error(
      "Firebase no ha sido inicializado aún. Debe usarse dentro de componentes o páginas, no en archivos de configuración."
    );
  }

  return {
    app: firebaseApp,
    auth: firebaseAuth,
    db: firestoreDb,
    storage: firebaseStorage,
    analytics: firebaseAnalytics,
    messaging: firebaseMessaging,
  };
}
