import type { Meta, StoryFn } from "@storybook/vue3";
import VaButtonGroup from "./VaButtonGroup.vue";
import VaButton from "./VaButton.vue";

type typeOfComponent = typeof VaButtonGroup;

const meta: Meta<typeOfComponent> = {
  title: 'Vue Atlas/VaButton/Group',
  component: VaButtonGroup,
};
export default meta;

export const ButtonGroupHorizontal: StoryFn<typeOfComponent> = args => ({
  components: { VaButtonGroup, VaButton },
  setup() {
    return { args };
  },
  template: `
     <va-button-group :vertical="false">
        <va-button type="primary">Primary 1</va-button>
        <va-button type="primary">Primary 2</va-button>
        <va-button type="primary">Primary 3</va-button>
        <va-button type="primary">Primary 4</va-button>
     </va-button-group>
  `
});

export const ButtonGroupVertical: StoryFn<typeOfComponent> = args => ({
  components: { VaButtonGroup, VaButton },
  setup() {
    return { args };
  },
  template: `
     <va-button-group :vertical="true">
        <va-button type="primary">Primary 1</va-button>
        <va-button type="primary">Primary 2</va-button>
        <va-button type="primary">Primary 3</va-button>
        <va-button type="primary">Primary 4</va-button>
     </va-button-group>
  `
});
