<template>
  <div class="compo_iframe">
    <AntdSpin :spinning="isLoading" size="large">
      <iframe
        ref="iframeRef"
        :src="iframeSrc"
        @load="hideLoading"
      />
    </AntdSpin>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Spin as AntdSpin } from 'ant-design-vue'
  import { propTypes } from '@/utils/propTypes'

  defineProps({
    iframeSrc: propTypes.string.def('')
  })

  const isLoading = ref(true)

  function hideLoading() {
    isLoading.value = false
  }
</script>

<style lang="less" scoped>
  .compo_iframe {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }
  }
</style>