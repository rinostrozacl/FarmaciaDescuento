import NewsletterSubscribe from "~/components/newsletter/NewsletterSubscribe.vue";

export default defineNuxtPlugin((nuxtApp) => {
  // Importar componentes de layout
  const AppHeader = defineAsyncComponent(
    () => import("~/components/layout/AppHeader.vue")
  );
  const AppFooter = defineAsyncComponent(
    () => import("~/components/layout/AppFooter.vue")
  );
  const CartSidebar = defineAsyncComponent(
    () => import("~/components/cart/CartSidebar.vue")
  );
  const Toast = defineAsyncComponent(() => import("~/components/ui/Toast.vue"));

  // Registrar componentes globalmente
  nuxtApp.vueApp.component("AppHeader", AppHeader);
  nuxtApp.vueApp.component("AppFooter", AppFooter);
  nuxtApp.vueApp.component("CartSidebar", CartSidebar);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("NewsletterSubscribe", NewsletterSubscribe);
});
