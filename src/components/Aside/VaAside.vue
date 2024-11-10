<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import { onUnmounted } from "@vue/runtime-core";
import { createFocusTrap, type FocusTrap } from "focus-trap";
import EventListener, { type ListenReturnFunction } from "@/utils/EventListener";
import element from "@/utils/element";
import { TinyEmitter as Emitter } from "tiny-emitter";

interface VaAsideProps {
  placement?: string;
  title?: string;
  header?: boolean;
  width?: string;
}

const props = withDefaults(defineProps<VaAsideProps>(), {
  placement: "left",
  title: "",
  header: false,
  width: "304px",
});

const emit = defineEmits(["hide", "show"]);

const show = ref<boolean>(false);
const focusTrap = ref<FocusTrap>();
const _clickEvent = ref<ListenReturnFunction>();
const aside = ref<HTMLElement>();
const emitter = ref(new Emitter())

const classObj = computed(() => {
  const { placement } = props;
  return {
    "va-aside": true,
    "va-aside-left": placement === "left",
    "va-aside-right": placement === "right",
  };
});

const escapeHandler = (e: KeyboardEvent) => {
  if (e.key === "Escape" && show.value) {
    close();
  }
};

document.addEventListener("keydown", escapeHandler);

emitter.value.once('hook:destroyed', () => {
  document.removeEventListener('keydown', escapeHandler)
})

onMounted(() => {
  if (aside.value) {
    document.querySelector("body")?.appendChild(aside.value);
    emitter.value.once('hook:destroyed', () => {
      if (aside.value) document.querySelector("body")?.removeChild(aside.value);
    })

    focusTrap.value = createFocusTrap(aside.value, {
      clickOutsideDeactivates: true,
      returnFocusOnDeactivate: true,
      fallbackFocus: aside.value,
    });
  }
});

onUnmounted(() => {
  performClose();
  emitter.value.emit('hook:destroyed')
});


watch(
  () => show.value,
  (val) => {
    const backdrop = document.createElement("div");
    const body = document.body;
    backdrop.className = "va-aside-backdrop";

    if (val) {
      body.appendChild(backdrop);
      element.addClass(body, "va-modal-open");

      // This timeout is included to allow for opacity transition.
      setTimeout(() => {
        backdrop.className += " " + "va-aside-in";
        _clickEvent.value = EventListener.listen(backdrop, "click", close);
        emit("show");
      }, 20);

      focusTrap.value?.activate();
    } else {
      focusTrap.value?.deactivate();
      performClose();
    }
  },
);

const open = () => {
  show.value = true;
};
defineExpose({ open })

const close = () => {
  show.value = false;
};

const performClose = () => {
  if (_clickEvent.value) _clickEvent.value.remove();

  const body = document.body;
  const backdrop = document.querySelector("." + "va-aside-backdrop");

  if (backdrop) {
    backdrop.className = "va-aside-backdrop";
    setTimeout(() => {
      element.removeClass(body, "va-modal-open");
      body.removeChild(backdrop);
    }, 300);
    emit("hide");
  }
};
</script>

<template>
  <transition :name="placement === 'left' ? 'slideleft' : 'slideright'">
    <div :class="classObj" :style="{ width }" ref="aside" v-show="show">
      <div class="va-aside-dialog">
        <div class="va-aside-content">
          <div class="va-aside-header" v-if="header">
            <button class="va-close" @click="close" type="button">
              <span>&times;</span>
            </button>
            <div class="va-aside-title">{{ title }}</div>
          </div>
          <div class="va-aside-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="@/style/_reset.scss" scoped></style>
<style scoped lang="scss">
@import "@/style/variables";

.va-aside-open {
  transition: transform 0.15s;
}

.va-aside {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 10;
  overflow: auto;
  background: $N0;

  &-left {
    left: 0;
    right: auto;
  }

  &-right {
    right: 0;
    left: auto;
  }

  &:focus {
    outline: 0;
  }

  &-dialog {
    .va-aside-header {
      .va-close {
        font-size: 24px;
        color: $N300;
      }

      .va-aside-title {
        padding-top: 8px;
        font-size: 24px;
        color: $N300;
      }
    }
  }

  &-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    background: rgba(9, 30, 66, 0.54);
  }

  &-in {
    opacity: 1;
  }
}
</style>
