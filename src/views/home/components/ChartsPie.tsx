import type { Ref, PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { Card } from 'ant-design-vue'
import { useECharts } from '@/hooks/web/useECharts'

export default defineComponent({
  name: 'ChartsPie',
  props: {
    loading: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

    watch(
      () => props.loading,
      () => {
        if (props.loading) return

        setOptions({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 0,
            left: 'center'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '70%',
              center: ['50%', '45%'],
              color: ['#1890ff', '#fa541c', '#faad14', '#13c2c2', '#722ed1'],
              data: [
                { value: 1620, name: '直接访问' },
                { value: 1169, name: '邮件营销' },
                { value: 986, name: '联盟广告' },
                { value: 624, name: '视频广告' },
                { value: 857, name: '搜索引擎' }
              ],
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 400
              }
            }
          ]
        })
      },
      {
        immediate: true
      }
    )

    return () => (
      <Card
        loading={props.loading}
        bordered={false}
      >
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: '300px'
          }}
        />
      </Card>
    )
  }
})