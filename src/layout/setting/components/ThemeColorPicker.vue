<template>
  <div class="compo_theme-color-picker">
    <template v-for="item in colorList || []" :key="item.color">
      <AntdTooltip :title="item.name" placement="top">
        <span
          :class="['theme-color-picker__item', { 'theme-color-picker__item--active': def === item.color }]"
          :style="{ background: item.color }"
          @click="handleClick(item.color)"
        >
          <AntdCheckOutlined />
        </span>
      </AntdTooltip>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { CheckOutlined as AntdCheckOutlined } from '@ant-design/icons-vue'

  import { ColorItem } from '../enum'
  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { AntdTooltip, AntdCheckOutlined },
    props: {
      colorList: {
        type: Array as PropType<ColorItem[]>,
        default: []
      },
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      def: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      function handleClick(color: string) {
        props.event && baseHandler(props.event, color)
      }

      return {
        handleClick
      }
    }
  })
</script>

<style lang="less" scoped>
  .compo_theme-color-picker {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 16px 0;

    .theme-color-picker__item {
      width: 22px;
      height: 22px;
      cursor: pointer;
      border-radius: 2px;

      &:deep(svg) {
        display: none;
      }

      &--active {

        &:deep(svg) {
          display: inline-block;
          margin-bottom: 5px;
          margin-left: 5px;
          font-size: 12px;
          fill: #fff !important;
        }
      }
    }
  }
</style>
