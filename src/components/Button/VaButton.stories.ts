import type { Meta, StoryFn } from "@storybook/vue3";
import VaButton from "./VaButton.vue";
import { action } from "@storybook/addon-actions";

type typeOfComponent = typeof VaButton;

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaButton",
  component: VaButton,
  argTypes: {
    type: {
      controls: "select",
      options: [
        "default",
        "primary",
        "primary-light",
        "primary-dark",
        "paleblue",
        "success",
        "info",
        "warning",
        "danger",
        "subtle",
        "link",
        "subtle-link",
        "active",
        "dark",
        "darker",
        "help",
        "help-light",
        "help-dark",
        "black",
      ],
      description: "The style of button to render",
    },
    size: {
      controls: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "The size of button to render",
    },
    active: {
      controls: { type: "boolean" },
      description: "If true, applies an active class to show that the button is active.",
    },
    disabled: {
      controls: { type: "boolean" },
      description: "If true, the button becomes disabled.",
    },
    block: {
      controls: { type: "boolean" },
      description: "If true, applies display: block.",
    },
    loading: {
      controls: { type: "boolean" },
      description: "If true, hides text and shows a loading spinner.",
    },
    round: {
      controls: { type: "boolean" },
      description:
        "Simply sets the border-radius to 50%. Works nicely with buttons that are simply icons.",
    },
    focused: {
      controls: { type: "boolean" },
      description: "Focuses the element until the user clicks outside the element.",
    },
    tall: {
      controls: { type: "boolean" },
      description: "",
    },
  },
  args: {
    onClick: action("clicked"),
    type: "default",
    size: "md",
    default: "Button",
    after: "A",
    before: "B",
    active: false,
    disabled: false,
    block: false,
    loading: false,
    round: false,
    focused: false,
    tall: false,
  },
};
export default meta;

export const Default: StoryFn<typeOfComponent> = (args) => ({
  components: { VaButton },
  setup() {
    const types = [
      "default",
      "primary",
      "primary-light",
      "primary-dark",
      "paleblue",
      "success",
      "info",
      "warning",
      "danger",
      "subtle",
      "link",
      "subtle-link",
      "active",
      "dark",
      "darker",
      "help",
      "help-light",
      "help-dark",
      "black",
    ];
    return { args, types };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px; flex-wrap: wrap">
      <p v-for="t in types">
        <va-button :type="t" @click="args.onClick">{{ args.default }}</va-button>
      </p>
    </div>
  `,
});

export const SizeButton: StoryFn<typeOfComponent> = (args) => ({
  components: { VaButton },
  setup() {
    const sizes = ["xs", "sm", "md", "lg"];
    return { args, sizes };
  },
  template: `
    <div style="display: flex; gap: 12px; ">
      <p v-for="s in sizes">
        <va-button :size="s" type="primary" @click="args.onClick">{{ args.default }}</va-button>
      </p>
    </div>
  `,
});

export const Button: StoryFn<typeOfComponent> = (args) => ({
  components: { VaButton },
  setup() {
    return { args };
  },
  template: '<va-button v-bind="args" @click="args.onClick">{{ args.default }}</va-button>',
});

export const WithIcons: StoryFn<typeOfComponent> = (args) => ({
  components: { VaButton },
  setup() {
    return { args };
  },
  template: `
    <va-button v-bind="args" @click="args.onClick">
      <template #before>
        {{ args.before }}
      </template>
      <template #default>
        {{ args.default }}
      </template>
      <template #after>
        {{ args.after }}
      </template>
    </va-button>`,
});
