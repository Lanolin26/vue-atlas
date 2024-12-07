import { type App } from "vue";
import VaButton from "./VaButton.vue";

export default (app: App<Element>) => {
  app.component("VaButton", VaButton);
}
