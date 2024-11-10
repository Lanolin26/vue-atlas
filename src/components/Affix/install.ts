import VaAffix from "./VaAffix.vue";

import { type App } from "vue";

export default (app: App<Element>) => {
  app.component("VaAffix", VaAffix);
}

