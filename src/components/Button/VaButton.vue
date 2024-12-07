<script setup lang="ts">
import type { VaButtonSize, VaButtonType } from "@/components/Button/index";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import EventListener, { type ListenReturnFunction } from "@/utils/EventListener";

interface VaButtonProps {
  type?: VaButtonType;
  size?: VaButtonSize;
  active?: boolean;
  disabled?: boolean;
  block?: boolean;
  loading?: boolean;
  round?: boolean;
  focused?: boolean;
  tall?: boolean;
  // iconBefore?: string;
  // iconAfter?: string;
}

const props = withDefaults(defineProps<VaButtonProps>(), {
  type: "default",
  size: "md",
});

const slots = defineSlots<{
  default(): any;
  before(): any;
  after(): any;
}>();

const $emit = defineEmits(["click"]);

const loadingSpinner = ref(props.loading);
const isFocused = ref(props.focused);
const componentWasMounted = ref(false);
const _clickEvent = ref<ListenReturnFunction>();
const btn = ref<HTMLButtonElement>();
const root = ref<HTMLDivElement>();

const spinColor = computed(() => {
  const { type, active } = props;
  const white = "#FFFFFF";
  const darker = "#45526B";

  if (active) {
    return darker;
  }

  const typeToColor: Record<VaButtonType, string> = {
    default: darker,
    primary: white,
    "primary-light": white,
    "primary-dark": white,
    success: white,
    info: white,
    warning: darker,
    subtle: darker,
    link: darker,
    "subtle-link": darker,
    danger: white,
    dark: white,
    darker: white,
    active: white,
    paleblue: white,
    help: white,
    "help-light": white,
    "help-dark": white,
    black: white,
  };

  return typeToColor[type];
});

const classObj = computed(() => {
  const { type, size, block, active, disabled, round } = props;
  const classes: Record<string, boolean> = {};

  classes["va-btn"] = true;
  classes["va-btn-block"] = block;
  classes["va-btn-active"] = active;
  classes["va-btn-disabled"] = disabled;
  size ? (classes["va-btn-" + size] = true) : "";
  type ? (classes["va-btn-" + type] = true) : "";
  classes["va-btn-round"] = round;

  classes["va-btn-" + type + "-focused"] = isFocused.value;

  return classes;
});

const innerClassObj = computed(() => {
  const classes: Record<string, boolean> = {};

  classes["va-btn-text-fade"] = true;
  loadingSpinner.value ? (classes["va-btn-text-fade-out"] = true) : "";

  return classes;
});

const innerStyleObj = computed(() => {
  const style: Record<string, string> = {};

  if (componentWasMounted.value) {
    const l = !!slots.before;
    const r = !!slots.after;

    if (root.value?.style.width !== "100%") {
      if (l) {
        style["padding-left"] = "26px";
      }
      if (r) {
        style["padding-right"] = "26px";
      }
    }
  }

  return style;
});

const styleObj = computed(() => {
  const { tall } = props;

  if (tall) {
    return {
      height: "100%",
      "border-radius": "0px",
    };
  }

  return {};
});

const iconBeforeStyleObj = computed(() => {
  const style: Record<string, string> = {
    position: "absolute",
    left: "3px",
  };
  return style;
});

const iconAfterStyleObj = computed(() => {
  const style: Record<string, string> = {
    position: "absolute",
    right: "3px",
  };
  return style;
});

watch(
  () => props.loading,
  (value) => {
    if (root.value) {
      if (value) {
        const rect = root.value.getBoundingClientRect();

        root.value.style.width = rect.width + "px";
        root.value.style.height = rect.height + "px";

        loadingSpinner.value = true;
      } else {
        root.value.style.width = "auto";
        root.value.style.height = "auto";
        nextTick(() => {
          loadingSpinner.value = false;
        });
      }
    }
  },
);

const triggerMouseEvent = (node: HTMLElement | undefined, eventType: string) => {
  const clickEvent = new Event(eventType, { bubbles: true, cancelable: true });
  if (node) node.dispatchEvent(clickEvent);
};

const enterKeyDown = () => {
  triggerMouseEvent(btn.value, "mouseover");
  triggerMouseEvent(btn.value, "mousedown");
};

const enterKeyUp = () => {
  if (props.disabled) {
    return;
  }
  triggerMouseEvent(btn.value, "mouseup");
  triggerMouseEvent(btn.value, "click");
};

// const focus = () => {
//   btn.value?.focus();
// };

const onClick = (event: Event) => {
  if (props.disabled) {
    event.stopPropagation();
    return;
  }
  $emit("click", event);
};

onMounted(() => {
  nextTick(() => {
    const el = root.value;

    componentWasMounted.value = true;

    _clickEvent.value = EventListener.listen(window, "click", (e: Event) => {
      if (el && !el.contains(e.target as Element)) {
        isFocused.value = false;
      }
    });
  });
});

onBeforeUnmount(() => {
  if (_clickEvent.value) _clickEvent.value.remove();
});
</script>

<template>
  <div ref="root">
    <button
      :class="classObj"
      :style="styleObj"
      @click="onClick"
      @keydown.enter="enterKeyDown"
      @keyup.enter="enterKeyUp"
      ref="btn"
    >
      <span :class="innerClassObj" :style="innerStyleObj">
        <span v-if="!!$slots.before" :style="iconBeforeStyleObj">
          <slot name="before" />
        </span>
        <slot />
        <span v-if="!!$slots.after" :style="iconAfterStyleObj">
          <slot name="after" />
        </span>
      </span>

      <!--      <div :class="innerClassObj" :style="innerStyleObj">-->
      <!--        <va-icon v-if="iconBefore !== undefined" :type="iconBefore" :style="iconBeforeStyleObj" />-->
      <!--        <slot />-->
      <!--        <va-icon v-if="iconAfter !== undefined" :type="iconAfter" :style="iconAfterStyleObj" />-->
      <!--      </div>-->
<!--      <va-loading :color="spinColor" :size="size" v-if="loadingSpinner" />-->
    </button>
  </div>
</template>

<style lang="scss" src="@/style/_reset.scss" scoped></style>
<style lang="scss">
@import "@/style/variables";

@mixin btn-type-mixin($bgCol, $fontCol, $bgColHover, $fontColHover, $bgColActive, $fontColActive) {
  background-color: $bgCol;
  color: $fontCol;

  &:hover:not(.va-btn-disabled) {
    background-color: $bgColHover;
    color: $fontColHover;
  }

  &:active:not(.va-btn-disabled) {
    background-color: $bgColActive;
    color: $fontColActive;
  }
}

@mixin button-focus-mixin($backgroundColor) {
  &:focus:not(:active):not(.va-select-btn-open):not(.va-btn-disabled),
  &-focused:not(:active):not(.va-select-btn-open):not(.va-btn-disabled) {
    background-color: $backgroundColor;
  }
}

/*
@mixin button-focus-mixin($boxShadowColor, $boxShadowOpacity: 0.6) {
  &:focus:not(:active):not(.va-select-btn-open):not(.va-btn-disabled),
  &-focused:not(:active):not(.va-select-btn-open):not(.va-btn-disabled) {
    box-shadow: inset $boxShadowColor 0px 0px 0px 2px;
    box-shadow: inset rgba($boxShadowColor, $boxShadowOpacity) 0px 0px 0px 2px;
    outline: none;
  }
}
*/

@mixin button-outline-mixin($outlineColor, $outlineWidth, $activeOutlineColor) {
  box-shadow: inset $outlineColor 0 0 0 $outlineWidth;
  outline: none;

  &:active {
    box-shadow: inset $activeOutlineColor 0 0 0 $outlineWidth;
  }
}

.va-btn {
  &-default {
    @include btn-type-mixin(
      $bgCol: $N20,
      $fontCol: $N400,
      $bgColHover: rgba(9, 30, 66, 0.08),
      $fontColHover: $N400,
      $bgColActive: rgba(179, 212, 255, 0.6),
      $fontColActive: $B400
    );
    @include button-focus-mixin($N30);
  }

  &-primary {
    @include btn-type-mixin(
      $bgCol: $B400,
      $fontCol: $N0,
      $bgColHover: $B300,
      $fontColHover: $N0,
      $bgColActive: $B500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B300);
    font-weight: 500;
  }

  &-primary-light {
    @include btn-type-mixin(
      $bgCol: $B300,
      $fontCol: $N0,
      $bgColHover: $B200,
      $fontColHover: $N0,
      $bgColActive: $B400,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B200);
    font-weight: 500;
  }

  &-primary-dark {
    @include btn-type-mixin(
      $bgCol: $B500,
      $fontCol: $N0,
      $bgColHover: $B300,
      $fontColHover: $N0,
      $bgColActive: $B400,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B300);
  }

  &-help {
    @include btn-type-mixin(
      $bgCol: $P500,
      $fontCol: $N0,
      $bgColHover: $P400,
      $fontColHover: $N0,
      $bgColActive: $P600,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P400);
    font-weight: 500;
  }

  &-help-light {
    @include btn-type-mixin(
      $bgCol: $P400,
      $fontCol: $N0,
      $bgColHover: $P300,
      $fontColHover: $N0,
      $bgColActive: $P300,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P300);
    font-weight: 500;
  }

  &-help-dark {
    @include btn-type-mixin(
      $bgCol: darken($P600, 5%),
      $fontCol: $N0,
      $bgColHover: $P400,
      $fontColHover: $N0,
      $bgColActive: $P600,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P400);
    font-weight: 500;
  }

  &-paleblue {
    @include btn-type-mixin(
      $bgCol: $PB300,
      $fontCol: $N0,
      $bgColHover: $PB200,
      $bgColActive: $PB400,
      $fontColHover: $N0,
      $fontColActive: $N0
    );
    @include button-focus-mixin($PB200);
    font-weight: 500;
  }

  &-success {
    @include btn-type-mixin(
      $bgCol: $G400,
      $fontCol: $N0,
      $bgColHover: $G300,
      $fontColHover: $N0,
      $bgColActive: $G500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($G300);
    font-weight: 500;
  }

  &-info {
    @include btn-type-mixin(
      $bgCol: $T400,
      $fontCol: $N0,
      $bgColHover: $T300,
      $fontColHover: $N0,
      $bgColActive: $T500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($T300);
    font-weight: 500;
  }

  &-warning {
    @include btn-type-mixin(
      $bgCol: $Y400,
      $fontCol: $N900,
      $bgColHover: $Y300,
      $fontColHover: $N900,
      $bgColActive: $Y500,
      $fontColActive: $N900
    );
    @include button-focus-mixin($Y300);
    font-weight: 500;
  }

  &-danger {
    @include btn-type-mixin(
      $bgCol: $R400,
      $fontCol: $N0,
      $bgColHover: $R300,
      $fontColHover: $N0,
      $bgColActive: $R500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($R300);
    font-weight: 500;
  }

  &-subtle {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $N400,
      $bgColHover: $N30,
      $fontColHover: $N400,
      $bgColActive: rgba(179, 212, 255, 0.6),
      $fontColActive: $B400
    );
    @include button-focus-mixin($N30);
  }

  &-link {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $B400,
      $bgColHover: transparent,
      $fontColHover: $B300,
      $bgColActive: transparent,
      $fontColActive: $B500
    );

    &:hover {
      text-decoration: underline !important;
    }

    &:active,
    &:focus {
      text-decoration: underline !important;
    }

    @include button-focus-mixin($N30);
  }

  &-subtle-link {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $N100,
      $bgColHover: transparent,
      $fontColHover: $N80,
      $bgColActive: transparent,
      $fontColActive: $N400
    );

    &:hover {
      text-decoration: underline !important;
    }

    &:active,
    &:focus {
      text-decoration: underline !important;
    }

    @include button-focus-mixin($N30);
  }

  &-dark {
    @include btn-type-mixin(
      $bgCol: $N700,
      $fontCol: $N50,
      $bgColHover: $N500,
      $fontColHover: $N40,
      $bgColActive: $N800,
      $fontColActive: $N200
    );
    @include button-focus-mixin($N500);
    font-weight: 500;
  }

  &-darker {
    @include btn-type-mixin(
      $bgCol: $N800,
      $fontCol: $N50,
      $bgColHover: $N500,
      $fontColHover: $N40,
      $bgColActive: $N700,
      $fontColActive: $N200
    );
    @include button-focus-mixin($N500);
    font-weight: 500;
  }

  &-active {
    @include btn-type-mixin(
      $bgCol: rgba(179, 212, 255, 0.6),
      $fontCol: $B400,
      $bgColHover: rgba(179, 212, 255, 0.6),
      $fontColHover: $B400,
      $bgColActive: rgba(179, 212, 255, 0.6),
      $fontColActive: $B400
    );
    @include button-focus-mixin($B50);
    font-weight: 500;
  }

  &-black {
    @include btn-type-mixin(
      $bgCol: #18171b,
      $fontCol: $N200,
      $bgColHover: #18171b,
      $fontColHover: $N80,
      $bgColActive: #18171b,
      $fontColActive: $N400
    );
    @include button-focus-mixin(#18171b);
    font-weight: 500;
  }
}

@mixin xs-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 4px 8px,
    $fontSize: 12px,
    $lineHeight: 1.5em,
    $borderRadius: 3px
  );
  > div {
    min-width: 13px;
  }
  min-height: 26px;
}

@mixin sm-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 1px 8px,
    $fontSize: 13px,
    $lineHeight: 2.2em,
    $borderRadius: 3px
  );
  > div {
    min-width: 15px;
  }
  min-height: 30px;
}

@mixin md-button-size-mixin() {
  @include btn-size-mixin($padding: 0 9px, $fontSize: 14px, $lineHeight: 2.3em, $borderRadius: 3px);
  > div {
    min-width: 17px;
  }
  min-height: 34px;
}

@mixin lg-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 2px 15px,
    $fontSize: 17px,
    $lineHeight: 2.5em,
    $borderRadius: 3px
  );
  > div {
    min-width: 23px;
  }
  min-height: 45px;
}

@mixin btn-size-mixin($padding, $fontSize, $lineHeight, $borderRadius) {
  padding: $padding;
  font-size: $fontSize;
  line-height: $lineHeight;
  border-radius: $borderRadius;
}

.va-btn {
  border: none;
  outline: 0;
  margin: 0;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition:
    background 0.1s ease-out,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:hover {
    text-decoration: none;
  }

  &:focus,
  &:active:focus,
  &-active:focus {
    outline: 0;
  }

  &:active {
    -webkit-transition-property: none;
    -moz-transition-property: none;
    -ms-transition-property: none;
    transition-property: none;
  }

  &-disabled {
    color: $N50 !important;
    cursor: not-allowed;
  }

  > div {
    > a {
      cursor: default;

      &:hover {
        text-decoration: none !important;
      }
    }
  }

  &-round {
    border-radius: 50% !important;
  }

  &-block {
    display: flex;
    width: 100%;
  }

  &-text-fade {
    position: relative;
    display: flex;
    align-items: center;
    transition: opacity 0.15s;
    opacity: 1;
    width: 100%;
    justify-content: space-around;

    &-out {
      opacity: 0;
    }
  }

  &-xs {
    @include xs-button-size-mixin();
  }

  &-sm {
    @include sm-button-size-mixin();
  }

  &-md {
    @include md-button-size-mixin();
  }

  &-lg {
    @include lg-button-size-mixin();
  }

  /**
  Styles applied to the loading spinner inside of the button element.
  All sizes defined here.
  */
  .va-page-loading-con {
    position: absolute;
  }

  &-xs {
    .va-page-loading-con {
      margin-top: 1px;

      svg {
        width: 16px !important;
      }
    }
  }

  &-sm {
    .va-page-loading-con {
      margin-top: 3px;

      svg {
        width: 18px !important;
      }
    }
  }

  &-md {
    .va-page-loading-con {
      margin-top: 4px;

      svg {
        width: 20px !important;
      }
    }
  }

  &-lg {
    .va-page-loading-con {
      margin-top: 6px;

      svg {
        width: 25px !important;
      }
    }
  }
}
/**
Styles applied to buttons that are wrapped in a <va-button-group>
are defined here.

Ready to be confused?
*/
.va-btn-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.va-btn-group > div > .va-btn,
.va-btn-group > div > .va-dropdown-con {
  position: relative;
  float: left;
}

.va-btn-group > div {
  > .va-btn:not(:first-child):not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:not(:first-child):not(:last-child):not(.va-dropdown-toggle) {
    border-radius: 0;
    margin-right: 1px;
  }

  > .va-btn:first-child {
    margin-left: 0;
  }

  > .va-btn:first-child:not(:last-child) {
    margin-right: 1px;
  }

  > .va-btn:first-child:not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:first-child:not(:last-child):not(.va-dropdown-toggle) > span > div > div > .va-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: 1px;
  }

  > .va-dropdown-con:not(:first-child):not(:last-child) > span > div > div > .va-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn:last-child:not(:first-child),
  > .va-dropdown-toggle:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > .va-dropdown-con:not(:first-child) {
    > span > div > div > .va-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  > .va-btn-group {
    float: left;
  }

  > .va-btn-group:not(:first-child):not(:last-child) > div > .va-btn {
    border-radius: 0;
  }

  > .va-btn-group:first-child:not(:last-child) > div > .va-btn:last-child,
  > .va-btn-group:first-child:not(:last-child) > .va-dropdown-toggle {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn-group:last-child:not(:first-child) > div > .va-btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

/**
And, of course, when the button group is a vertical button group arrangement.
*/

.va-btn-group-vertical {
  position: relative;
  display: inline-flex !important;
  // display: flex;
  flex-direction: column;
  vertical-align: middle;
}

.va-btn-group-vertical > div > .va-btn {
  position: relative;
  float: left;
  width: 100%;
  display: flex;
}

.va-btn-group-vertical > div > .va-btn {
  width: 100%;
}

.va-btn-group-vertical > div {
  > .va-btn:not(:first-child):not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:not(:first-child):not(:last-child):not(.va-dropdown-toggle) {
    border-radius: 0;
    margin-bottom: 1px;
    margin-right: 0;
  }

  > .va-btn:first-child {
    margin-top: 0;
  }

  > .va-btn:first-child:not(:last-child) {
    margin-bottom: 1px;
  }

  > .va-btn:first-child:not(:last-child):not(.va-dropdown-toggle) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  > .va-btn:last-child:not(:first-child),
  > .va-dropdown-toggle:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  > .va-btn-group-vertical {
    float: left;
  }

  > .va-btn-group-vertical:not(:first-child):not(:last-child) > div > .va-btn {
    border-radius: 0;
  }

  > .va-btn-group-vertical:first-child:not(:last-child) > div > .va-btn:last-child,
  > .va-btn-group-vertical:first-child:not(:last-child) > .va-dropdown-toggle {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn-group-vertical:last-child:not(:first-child) > div > .va-btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
