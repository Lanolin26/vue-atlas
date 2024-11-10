import VaAlert from "./VaAlert.vue";

import { type App } from "vue";

export default (app: App<Element>) => {
  app.component("VaAlert", VaAlert);
}
