import type { Meta, StoryFn } from "@storybook/vue3";
import VaAffix from './VaAffix.vue'
import { LoremIpsum } from "lorem-ipsum";
import { ref } from "vue";

type typeOfComponent = typeof VaAffix;
const title = new LoremIpsum().generateWords(5);

export default {
  title: "Vue Atlas/VaAffix",
  component: VaAffix,
  argTypes: {
    offset: {
      control: { type: "number" },
      description: 'Расстояние вертикального смещения, к которому необходимо прикрепить',
    }
  },
  args: {
    offset: 15,
    default: title
  }
} as Meta<typeOfComponent>;

export const Default: StoryFn<typeOfComponent> = args => ({
  components: { VaAffix },
  setup() {
    const lorem = new LoremIpsum();
    const text = ref(lorem.generateSentences(5));
    const outer = ref(lorem.generateSentences(150));
    return { args, inText: text, outText: outer }
  },
  template: `
    <div>
      <va-affix v-bind="args">{{ args.default }}</va-affix>
      <p>{{ outText }}</p>
    </div>
  `
})
