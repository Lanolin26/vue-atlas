<script setup lang="ts">
import velocity from "velocity-animate";
import {
  Animations,
  BackEase,
  type Transition,
  type TransitionModification,
  type TypeOfAnimation,
  type TypeOfEase,
} from "./index";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

function transformArguments<T>(arg: T | Array<T>): Array<T> {
  if (Array.isArray(arg) && arg.length === 2) {
    return arg;
  } else if (!Array.isArray(arg)) {
    return [arg, arg];
  }
  return [];
}

type VaAnimQueueElements = { key: string; el: HTMLElement };

interface Props {
  show?: boolean;
  tag?: "div" | "form" | "ul" | "ol"; //['div', 'form', 'ul', 'ol']
  interval?: number | Array<number>;
  duration?: number | Array<number>;
  delay?: number | Array<number>;
  type?: TypeOfAnimation | Array<TypeOfAnimation>;
  animConfig?: [Transition, Transition];
  ease?: TypeOfEase | Array<TypeOfEase>;
  watchValue?: string | Array<string>;
  leaveReverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  tag: "div",
  interval: 100,
  duration: 500,
  delay: 0,
  type: "right",
  ease: "easeOutQuart",
  leaveReverse: false,
});

defineSlots<{
  default(): void;
}>();

const el = ref<HTMLDivElement>();
const animatingClassName = ref<Array<string>>([]);
const originChildren = ref<Array<VaAnimQueueElements>>([]);
const children = ref<Array<VaAnimQueueElements>>([]);
const isActHideAnimate = ref<boolean>(false);
const keysAnimating = ref<Array<string>>([]);

// const emits = defineEmits<{
//   (e: 'VaAnimQueueHidden'): void
// }>();

// const usedSlot = computed(() => {
//   const { tag } = props;
//   switch (tag) {
//     case "div":
//       return this.$slots.divslot;
//     case "ul":
//       return this.$slots.ulslot;
//     case "ol":
//       return this.$slots.olslot;
//     case "form":
//       return this.$slots.formslot;
//     default:
//       return false;
//   }
// });

const VaAnimQueueHidden = () => {
  _hiddenVelocityNode();
  return true;
};

onMounted(() => {
  animatingClassName.value = ["va-anim-queue-entering", "va-anim-queue-leaving"];

  // nextTick(() => {
  keysAnimating.value = [];
  const freeChild = _getFreeKeysAndChild();
  keysAnimating.value = Object.keys(freeChild);
  children.value = freeChild;
  originChildren.value = freeChild;

  if (props.show) {
    _animateEnter();
  }
  // })
});

onBeforeUnmount(() => {
  if (originChildren.value && originChildren.value.length > 0) {
    originChildren.value.forEach((child) => velocity(child, "stop"));
  }
});

watch(
  () => props.show,
  (value) => {
    if (value) {
      isActHideAnimate.value = true;

      nextTick(() => {
        nextTick(() => VaAnimQueueHidden());
        setTimeout(() => {
          _animateEnter();
          isActHideAnimate.value = false;
        }, 50);
      });
    } else {
      _animateLeave(() => {
        if (!isActHideAnimate.value) {
          nextTick(() => VaAnimQueueHidden());
        }
      });
    }
  },
);

function fShouldLeaveChild(newChild: Array<VaAnimQueueElements>) {
  const shouldLeaveChild = [];
  for (let i = 0; i < children.value.length; i++) {
    const curChild = children.value[i];
    let hasRemove = true;

    for (let j = 0; j < newChild.length; j++) {
      if (curChild.key === newChild[j].key) {
        hasRemove = false;
      }
    }
    if (hasRemove) {
      shouldLeaveChild.push(curChild);
    }
  }
  return shouldLeaveChild;
}

function fShouldEnterChild(newChild: Array<VaAnimQueueElements>) {
  const shouldEnterChild = [];
  for (let i = 0; i < newChild.length; i++) {
    const curChild = newChild[i];
    let hasAdd = true;

    for (let j = 0; j < children.value.length; j++) {
      if (curChild.key === children.value[j].key) {
        hasAdd = false;
      }
    }
    if (hasAdd) {
      shouldEnterChild.push(curChild);
    }
  }
  return shouldEnterChild;
}

watch(
  () => props.watchValue,
  () => {
    nextTick(() => {
      const newChild = _getKeysChild();

      const shouldLeaveChild = fShouldLeaveChild(newChild);
      const shouldEnterChild = fShouldEnterChild(newChild);

      shouldEnterChild.forEach(_performEnter);
      shouldLeaveChild.forEach((value, index) => _performLeave(value, index));

      children.value = newChild;
    });
  },
);

const _getKeysChild = () => {
  const ret: VaAnimQueueElements[] = [];
  const keyNodes = Array.prototype.slice.call(el.value?.querySelectorAll("[anim-key]"));

  keyNodes.forEach((child) => {
    if (!child) {
      return;
    }
    child.setAttribute("__scope_key__", 1);
    const key = child.getAttribute("anim-key");
    if (!key) {
      return;
    }

    ret.push({ key: key, el: child });
  });

  return ret;
};

const _getFreeKeysAndChild = () => {
  const ret: VaAnimQueueElements[] = [];
  const keyNodes = Array.prototype.slice.call(
    el.value?.querySelectorAll("[anim-key]:not([__scope_key__])"),
  );

  keyNodes.forEach((child) => {
    if (!child) {
      return;
    }

    child.setAttribute("__scope_key__", 1);
    const key = child.getAttribute("anim-key");
    if (!key) {
      return;
    }

    ret.push({ key: key, el: child });
  });

  return ret;
};

const _getVelocityConfig = (index: number) => {
  if (props.animConfig) {
    return transformArguments(props.animConfig)[index];
  }
  return Animations[transformArguments(props.type)[index]];
};

const _getVelocityEnterConfig = () => {
  return _getVelocityConfig(0);
};

const _getVelocityLeaveConfig = () => {
  const config = _getVelocityConfig(1);
  const ret: Transition = {};

  Object.keys(config).forEach((key) => {
    const keyE = key as TransitionModification;
    let configElement = config[keyE];
    if (configElement) {
      ret[keyE] = Array.prototype.slice.call(configElement).reverse();
    }
  });
  return ret;
};

const _getVelocityEasing = () => {
  return transformArguments(props.ease).map((easeName) => {
    return BackEase[easeName] || easeName;
  });
};

const _hiddenVelocityNode = () => {
  children.value.forEach((item) => {
    const node = item.el;
    if (!node) {
      return;
    }
    node.style.visibility = "hidden";
    velocity(node, "stop");
  });
};

const _animateEnter = () => {
  children.value.forEach(_performEnter);
};

const _performEnter = (item: VaAnimQueueElements, i: number) => {
  const node = item.el;
  const key = item.key;

  if (!node) {
    return;
  }

  const interval = transformArguments(props.interval)[0];
  const delay = transformArguments(props.delay)[0];
  const duration = transformArguments(props.duration)[0];
  node.style.visibility = "hidden";
  velocity(node, "stop");
  velocity(node, _getVelocityEnterConfig(), {
    delay: (interval * i * delay) / 100,
    duration: duration,
    easing: _getVelocityEasing()[0],
    visibility: "visible",
    begin: (elements: Array<HTMLElement>) => {
      _enterBegin(key, elements);
      if ("__vue__" in node) {
        let element = node["__vue__"];

        // @ts-ignore
        const _enterFn = element._animateEnter;
        _enterFn && _enterFn();

        // @ts-ignore
        const children = element.$children;
        // @ts-ignore
        children.forEach((item) => {
          item._animateEnter && item._animateEnter();
        });
      }
    },
    complete: _enterComplete.bind(this, key),
  });
};

const _animateLeave = (done: () => void) => {
  children.value.forEach((item, i) => {
    _performLeave(item, i, done);
  });
};

const _performLeave = (item: VaAnimQueueElements, i: number, done?: () => void) => {
  const node = item.el;
  const key = item.key;
  if (!node) {
    return;
  }
  const interval = transformArguments(props.interval)[1];
  const delay = transformArguments(props.delay)[1];
  const duration = transformArguments(props.duration)[1];
  const order = props.leaveReverse ? children.value.length - i - 1 : i;

  velocity(node, "stop");
  velocity(node, _getVelocityLeaveConfig(), {
    delay: interval * order + delay,
    duration: duration,
    easing: _getVelocityEasing()[1],
    begin: _leaveBegin.bind(this),
    complete: (elements: Array<HTMLElement>) => {
      _leaveComplete(key, elements);
      const len = children.value.length;
      if (i === len - 1) {
        done && done();
      }
    },
  });
};

const _enterBegin = (key: string, elements: Array<HTMLElement>) => {
  if (keysAnimating.value.indexOf(key) >= 0) {
    keysAnimating.value.splice(keysAnimating.value.indexOf(key), 1);
  }
  elements.forEach((elem) => {
    elem.className = elem.className.replace(animatingClassName.value[1], "").trim();
    elem.className += " " + animatingClassName.value[0];
  });
};

const _enterComplete = (key: string, elements: Array<HTMLElement>) => {
  if (keysAnimating.value.indexOf(key) >= 0) {
    keysAnimating.value.splice(keysAnimating.value.indexOf(key), 1);
  }
  elements.forEach((elem) => {
    elem.className = elem.className.replace(animatingClassName.value[0], "").trim();
  });
};

const _leaveBegin = (elements: Array<HTMLElement>) => {
  elements.forEach((elem) => {
    elem.className = elem.className.replace(animatingClassName.value[0], "").trim();
    elem.className += " " + animatingClassName.value[1];
  });
};

const _leaveComplete = (key: string, elements: Array<HTMLElement>) => {
  if (keysAnimating.value.indexOf(key) < 0) {
    return;
  }
  keysAnimating.value.splice(keysAnimating.value.indexOf(key), 1);
  elements.forEach((elem) => {
    elem.className = elem.className.replace(animatingClassName.value[1], "").trim();
  });
};
</script>

<template>
  <div ref="el">
    <div v-if="tag === 'div'">
      <slot />
    </div>
    <ul v-if="tag === 'ul'">
      <slot />
    </ul>
    <ol v-if="tag === 'ol'">
      <slot />
    </ol>
    <form v-if="tag === 'form'">
      <slot />
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
