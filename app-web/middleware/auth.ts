export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { isAuthenticated, userRole } = storeToRefs(authStore);

  // Rutas que requieren autenticación
  const authRoutes = ["/cliente", "/farmacia", "/admin"];

  // Rutas que solo pueden acceder usuarios no autenticados
  const guestRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];

  // Verificar si la ruta requiere autenticación
  const requiresAuth = authRoutes.some((route) => to.path.startsWith(route));
  const requiresGuest = guestRoutes.some((route) => to.path.startsWith(route));

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requiresAuth && !isAuthenticated.value) {
    return navigateTo("/auth/login");
  }

  // Si la ruta es solo para invitados y el usuario está autenticado
  if (requiresGuest && isAuthenticated.value) {
    return navigateTo("/");
  }

  // Verificar roles específicos
  if (to.path.startsWith("/admin") && userRole.value !== "admin") {
    return navigateTo("/");
  }

  if (to.path.startsWith("/farmacia") && userRole.value !== "pharmacy") {
    return navigateTo("/");
  }

  if (to.path.startsWith("/cliente") && userRole.value !== "client") {
    return navigateTo("/");
  }
});
