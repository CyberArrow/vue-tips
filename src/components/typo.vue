<template>
  <div v-if="skeleton" :class="['skeleton', `skeleton__${skeletonWidth}`]" />
  <span v-else :class="[font, `w${weight}`, `s${size}`, `text-${color}`, `align-${align}`]" @click="handler"><slot /></span>
</template>

<script>
export default {
  name: 'Typo',
  props: {
    font: {
      type: String,
      default: 'source'
    },
    weight: {
      type: Number,
      default: 400
    },
    size: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: 'dark-900'
    },
    skeleton: {
      type: Boolean,
      default: false
    },
    skeletonWidth:
    {
      type: Number,
      default: 30
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    handler (e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/scss/variables";
  span {
    line-height: 1rem;
    @each $fontName, $fontFamily in $fonts {
      &.#{$fontName} {
        font-family: $fontFamily;
        color: map_get($pallete, black)
      }
    }
    @each $fontSize in $fontSizes {
      &.s#{$fontSize} {
        font-size: #{$fontSize}px;
        line-height: #{$fontSize + 5}px;
        &.no-line-height {
          line-height: #{$fontSize}px;
        }
      }
    }
    @each $colorName, $color in $pallete {
      &.text-#{$colorName} {
        color: $color;
      }
    }

    &.w{
      &100{font-weight: 100}
      &300{font-weight: 300}
      &400{font-weight: 400}
      &500{font-weight: 500}
      &600{font-weight: 600}
      &700{font-weight: 700}
      &900{font-weight: 900}
    }

    &.text-center{
      text-align: center;
    }

    &.dont-break {
      white-space: nowrap;
    }

    &.ellipsis {
      padding: 1px 0;
      overflow: hidden;
      min-width: 0;
      text-overflow: ellipsis;
      max-width: 100%;
      white-space: nowrap;
    }

    &.align {
      &-left {}
      &-right {
        text-align: right;
      }
      &-center {
        text-align: center;
      }
    }
  }

  div {
    &.skeleton {
      animation : shimmer 2s infinite linear;
      background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
      background-size: 1000px 100%;
      height: 18px;
      &__ {
        &10 { width: 10% }
        &20 { width: 20% }
        &30 { width: 30% }
        &40 { width: 40% }
        &50 { width: 50% }
        &60 { width: 60% }
        &70 { width: 70% }
        &80 { width: 80% }
        &90 { width: 90% }
        &100{ width: 100% }
      }
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
</style>
