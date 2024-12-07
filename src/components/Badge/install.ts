import { type App } from "vue";
import VaBadge from "./VaBadge.vue";

export default (app: App<Element>) => {
  app.component("VaBadge", VaBadge);
}
