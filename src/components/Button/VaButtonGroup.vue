<script setup lang="ts">
import { computed } from "vue";

interface VaButtonGroupProps {
  vertical?: boolean
}

const props = withDefaults(defineProps<VaButtonGroupProps>(), {
  vertical: false,
})

const classObj = computed(() => {
  const { vertical } = props;

  return {
    'va-btn-group': true,
    'va-btn-group-vertical': vertical
  }
})

</script>

<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<style lang="scss">
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
