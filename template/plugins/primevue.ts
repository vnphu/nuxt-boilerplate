import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Calendar from 'primevue/calendar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Calendar", Calendar);
});
