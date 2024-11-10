import type { Meta, StoryFn } from "@storybook/vue3";
import VaAnimQueue from "./VaAnimQueue.vue";
import { LoremIpsum } from "lorem-ipsum";

type typeOfComponent = typeof VaAnimQueue;
// const body = new LoremIpsum().generateSentences(15);
// const title = new LoremIpsum().generateWords(5);

const meta: Meta<typeOfComponent> = {
  title: "Vue Atlas/VaAnimQueue",
  component: VaAnimQueue,
  argTypes: {
    delay: {
      control: { type: "number" }
    },
    interval: {
      control: { type: "number" }
    },
    duration: {
      control: { type: "number" }
    },
    leaveReverse: {
      control: { type: "boolean" }
    },
    show: {
      control: { type: "boolean" }
    },
    ease: {
      control: "object",
      description: `["easeOutSine", "easeInOutSine", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic",
        "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint",
        "easeOutQuint", "easeInOutQuint", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc",
        "easeOutCirc", "easeInOutCirc", "easeInBack", "easeOutBack", "easeInOutBack"]`
    },
    type: {
      control: "object",
      description: `["top", "right", "bottom", "left", "alpha", "scale", "scaleBig", "scaleX", "scaleY"]`
    },
    tag: {
      control: { type: "radio" },
      options: ["div", "form", "ul", "ol"]
    }
  },
  args: {
    show: false,
    delay: 90,
    duration: 650,
    interval: 100,
    leaveReverse: false,
    ease: ["easeOutSine", "easeInOutQuart"],
    type: ["right", "right"],
    // tag: "div"
  },
};
export default meta;

// const Template: StoryFn<typeOfComponent> = (args) => ({
//   components: { VaAlert },
//   setup() {
//     return { args };
//   },
//   template: `
//     <div>
//       <va-alert v-bind="args">{{ args.default }}</va-alert>
//     </div>
//   `,
// });
//
export const Default: StoryFn<typeOfComponent> = (args) => ({
  components: { VaAnimQueue },
  setup() {
    return { args };
  },
  template: `
    <div style="">
      <va-anim-queue v-bind="args">
        <div anim-key="a" style="visibility: hidden;">One</div>
        <div anim-key="b" style="visibility: hidden;">Two</div>
        <div anim-key="c" style="visibility: hidden;">Three</div>
        <div anim-key="d" style="visibility: hidden;">Four</div>
      </va-anim-queue>
    </div>
  `,
});

