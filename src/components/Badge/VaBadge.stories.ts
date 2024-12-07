import type { Meta, StoryFn } from "@storybook/vue3";
import VaBadge from "./VaBadge.vue";

type typeOfComponent = typeof VaBadge;

const body: string = "Body content"

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaBadge",
  component: VaBadge,
  argTypes: {
    margin: {
      type: "string",
      control: { type: "text" },
      description: "Поле, которое будет нанесено на внешнюю сторону элемента бейджа",
    },
    type: {
      type: "string",
      control: { type: "select" },
      description: "Стиль значка для визуализации",
      options: ["default", "primary", "success", "info", "warning", "danger"],
    },
  },
  args: {
    type: "default",
    margin: "0px",
    default: body,
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
      <va-badge v-bind="args">{{ args.default }}</va-badge>
    </div>
  `,
});

export const AllTypes: StoryFn<typeOfComponent> = () => ({
  components: { VaBadge },
  setup() {
    const types = ["default", "primary", "success", "info", "warning", "danger"];
    return {types};
  },
  template: `
    <div>
      <va-badge v-for="t in types" :type="t" margin="1px">
        {{ t }}
      </va-badge>
    </div>
  `
})
