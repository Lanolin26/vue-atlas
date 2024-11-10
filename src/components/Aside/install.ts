import { type App } from "vue";
import VaAside from "./VaAside.vue";

export default (app: App<Element>) => {
  app.component("VaAside", VaAside);
}
