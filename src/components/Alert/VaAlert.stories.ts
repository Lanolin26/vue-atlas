import type { Meta, StoryFn } from "@storybook/vue3";
import VaAlert from "./VaAlert.vue";
import { LoremIpsum } from "lorem-ipsum";

type typeOfComponent = typeof VaAlert;
const body = new LoremIpsum().generateSentences(15);
const title = new LoremIpsum().generateWords(5);

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaAlert",
  component: VaAlert,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "info", "warning", "danger", "help"],
      description: "Тип предупреждения для отображения",
      type: "string",
    },
  },
  args: {
    type: "warning",
    title: title,
    default: body,
  },
};
export default meta;

const Template: StoryFn<typeOfComponent> = (args) => ({
  components: { VaAlert },
  setup() {
    return { args };
  },
  template: `
    <div>
      <va-alert v-bind="args">{{ args.default }}</va-alert>
    </div>
  `,
});

export const Default: StoryFn<typeOfComponent> = (args) => ({
  components: { VaAlert },
  setup() {
    return { args };
  },
  template: `
    <div>
      <va-alert :title="args.title">{{ args.default }}</va-alert>
    </div>
  `,
});

export const Warning: StoryFn<typeOfComponent> = Template.bind({});
Warning.args = { type: "warning", title: "This is warning" };

export const Info: StoryFn<typeOfComponent> = Template.bind({});
Info.args = { type: "info", title: "This is info" };

export const Success: StoryFn<typeOfComponent> = Template.bind({});
Success.args = { type: "success", title: "This is success" };

export const Danger: StoryFn<typeOfComponent> = Template.bind({});
Danger.args = { type: "danger", title: "This is danger" };

export const Help: StoryFn<typeOfComponent> = Template.bind({});
Help.args = { type: "help", title: "This is help" };
