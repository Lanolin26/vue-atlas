<script setup lang="ts">
import type { VaBadgeColor } from "./index";
import { computed } from "vue";

interface VaBadgeProps {
  type?: VaBadgeColor;
  margin?: string;
}

const props = withDefaults(defineProps<VaBadgeProps>(), {
  type: "default",
  margin: "0px",
});

const classObj = computed(() => {
  const { type } = props;
  const classes: Record<string, boolean> = {};
  classes["va-badge"] = true;
  classes["va-badge-" + type] = true;
  return classes;
});
</script>

<template>
  <span :class="classObj" :style="{ margin: margin }">
    <slot />
  </span>
</template>

<style lang="scss" src="@/style/_reset.scss" scoped></style>
<style scoped lang="scss">
@import "@/style/variables";

.va-badge {
  display: inline-block;
  text-align: center;
  font-weight: normal;
  min-width: 10px;
  padding: 3px 7px;
  border-radius: 32px;
  line-height: 1;
  font-size: 12px;

  &-default {
    background-color: $N30;
    color: $N800;
  }

  &-primary {
    background-color: $B200;
    color: $N0;
  }

  &-warning {
    background-color: $Y200;
    color: $N500;
  }

  &-danger {
    background-color: $R300;
    color: $N0;
  }

  &-success {
    background-color: $G300;
    color: $N0;
  }

  &-info {
    background-color: $T300;
    color: $N0;
  }
}
</style>
