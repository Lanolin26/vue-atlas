<script setup lang="ts">
import { computed } from "vue";

interface VaAffixProps {
    offset?: number | string;
}

const props = withDefaults(defineProps<VaAffixProps>(), { offset: 0 });

defineSlots<{
  default(): any;
}>()

const affixStyle = computed(() => {
    const { offset } = props;
    return { top: `${offset}px` };
});
</script>

<template>
    <div class="va-affix" :style="affixStyle">
        <slot />
    </div>
</template>

<style lang="scss" src="@/style/_reset.scss" scoped />
<style scoped lang="scss">
.va-affix {
    position: sticky;
    z-index: 900;
}
</style>
