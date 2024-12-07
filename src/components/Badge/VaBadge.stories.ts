import type { Meta, StoryFn } from "@storybook/vue3";
import VaBadge from "./VaBadge.vue";


type typeOfComponent = typeof VaBadge

const meta: Meta<typeOfComponent> = {
  title: "Skelet",
  component: VaBadge,
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
  components: { VaBadge },
  setup() {
    return { args };
  },
  template: `
    <div style="">

    </div>
  `,
});
