import { type App } from "vue";
import VaAnimQueue from "./VaAnimQueue.vue";

export default (app: App<Element>) => {
  app.component("VaAnimQueue", VaAnimQueue);
}
