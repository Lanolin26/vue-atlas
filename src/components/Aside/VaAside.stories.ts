import type { Meta, StoryFn } from "@storybook/vue3";
import VaAside from "./VaAside.vue";
import { LoremIpsum } from "lorem-ipsum";

type typeOfComponent = typeof VaAside

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaAside",
  component: VaAside,
  argTypes: {
/*
  placement?: string;
  title?: string;
  header?: boolean;
  width?: string;
 */
  },
  args: {
    /*
      placement?: string;
      title?: string;
      header?: boolean;
      width?: string;
     */
  },
};
export default meta;

export const Default: StoryFn<typeOfComponent> = (args) => ({
  components: { VaAside },
  setup() {
    return { args };
  },
  template: `
    <div style="">
      <va-aside v-bind="args">

      </va-aside>
    </div>
  `,
});
