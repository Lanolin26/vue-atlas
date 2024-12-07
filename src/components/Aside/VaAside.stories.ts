import type { Meta, StoryFn } from "@storybook/vue3";
import VaAside from "./VaAside.vue";
import { action } from "@storybook/addon-actions";
import { withActions } from '@storybook/addon-actions/decorator';

type typeOfComponent = typeof VaAside

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaAside",
  component: VaAside,
  decorators: [withActions],
  argTypes: {
    placement: {
      control: "select",
      description: "С какой стороны окна появляться.",
      options: ["left", "right"]
    },
    header: {
      control: "boolean"
    },
    width: {
      control: "text",
      description: "Ширина бокового элемента"
    }
  },
  args: {
    onHide: action('hide'),
    onShow: action('show'),
    placement: "right",
    title: "This is Title",
    default: "This is body",
    header: false,
    width: "304px"
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
      <button @click="$refs.aside.open()">Open</button>
      <va-aside ref="aside" v-bind="args">
        <template #title>
          {{ args.title }}
        </template>
        <template #default>
          <div style="padding:20px;">{{ args.default }}</div>
        </template>
      </va-aside>
    </div>
  `,
});
