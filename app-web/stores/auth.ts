import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  signInWithCredential,
  type User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  profilePicture: string | null;
  type: "client" | "pharmacy" | "admin";
  status: "active" | "suspended" | "pending" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  preferences: {
    notifications: boolean;
    emailAlerts: boolean;
    locationSharing: boolean;
  };
}

export interface AuthState {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isClient: (state) => state.user?.type === "client",
    isPharmacy: (state) => state.user?.type === "pharmacy",
    isAdmin: (state) => state.user?.type === "admin",
    userType: (state) => state.user?.type || null,
    userId: (state) => state.user?.id || null,
    userRole: (state) =>
      state.user?.type === "client"
        ? "client"
        : state.user?.type === "pharmacy"
          ? "pharmacy"
          : "guest",
    userProfile: (state) => state.user || null,
  },

  actions: {
    async initialize() {
      const { $auth, $db } = useNuxtApp();
      // Forzar los tipos correctos para evitar errores de tipo
      type Auth = import("firebase/auth").Auth;
      type Firestore = import("firebase/firestore").Firestore;
      const auth = $auth as Auth;
      const db = $db as Firestore;

      if (!$auth || !$db) {
        console.error("Firebase auth or db not initialized");
        this.loading = false;
        return;
      }

      return new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged($auth, async (firebaseUser) => {
          this.loading = true;

          if (firebaseUser) {
            this.firebaseUser = firebaseUser;

            try {
              // Obtener el perfil del usuario desde Firestore
              const userDoc = await getDoc(doc($db, "users", firebaseUser.uid));

              if (userDoc.exists()) {
                const userData = userDoc.data();
                this.user = {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || "",
                  displayName: firebaseUser.displayName || "",
                  phoneNumber: firebaseUser.phoneNumber,
                  profilePicture: firebaseUser.photoURL,
                  type: userData.type,
                  status: userData.status,
                  createdAt: userData.createdAt?.toDate(),
                  updatedAt: userData.updatedAt?.toDate(),
                  lastLoginAt: userData.lastLoginAt?.toDate() || null,
                  preferences: userData.preferences || {
                    notifications: true,
                    emailAlerts: true,
                    locationSharing: false,
                  },
                };
              } else {
                // Si no existe el documento en Firestore, cerrar sesión
                await this.logout();
                this.error = "Usuario no encontrado en la base de datos";
              }
            } catch (error) {
              console.error("Error al obtener perfil de usuario:", error);
              this.error = "Error al cargar el perfil de usuario";
            }
          } else {
            this.user = null;
            this.firebaseUser = null;
          }

          this.loading = false;
          resolve();
          unsubscribe();
        });
      });
    },

    async loginWithEmail(email: string, password: string) {
      try {
        this.loading = true;
        const { $firebase } = useNuxtApp();
        const userCredential = await signInWithEmailAndPassword(
          $firebase.auth,
          email,
          password
        );
        await this.fetchUserProfile(userCredential.user.uid);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async loginWithGoogle() {
      try {
        this.loading = true;
        const { $firebase } = useNuxtApp();
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup($firebase.auth, provider);
        await this.fetchUserProfile(userCredential.user.uid);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(email: string, password: string, profile: any) {
      try {
        this.loading = true;
        const { $firebase } = useNuxtApp();
        const userCredential = await createUserWithEmailAndPassword(
          $firebase.auth,
          email,
          password
        );

        // Update profile
        await updateProfile(userCredential.user, {
          displayName: profile.name,
        });

        // Create user document
        await setDoc(doc($firebase.db, "users", userCredential.user.uid), {
          email,
          name: profile.name,
          role: "client",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await this.fetchUserProfile(userCredential.user.uid);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        this.loading = true;
        const { $firebase } = useNuxtApp();
        await signOut($firebase.auth);
        this.user = null;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async resetPassword(email: string) {
      try {
        this.loading = true;
        const { $firebase } = useNuxtApp();
        await sendPasswordResetEmail($firebase.auth, email);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserProfile(uid: string) {
      try {
        const { $firebase } = useNuxtApp();
        const userDoc = await getDoc(doc($firebase.db, "users", uid));

        if (userDoc.exists()) {
          this.user = {
            ...userDoc.data(),
            uid,
          };
        }
      } catch (error: any) {
        this.error = error.message;
        throw error;
      }
    },

    setError(error: string | null) {
      this.error = error;
    },
  },
});
