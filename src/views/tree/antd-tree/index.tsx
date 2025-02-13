import type { AntTreeNodeDropEvent, TreeProps } from 'ant-design-vue/es/tree'
import { defineComponent, ref } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton, Tree as AntdTree } from 'ant-design-vue'
import { TREE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'
import { treeData } from './data'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  name: 'AntdTree',
  setup() {
    const checkedKeys = ref<string[]>(['2-1', '3-2-2'])
    const expandedKeys = ref<string[]>([])
    const selectedKeys = ref<string[]>([])

    const dragTreeData = ref(cloneDeep(treeData))
    const lazyTreeData = ref([
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true }
    ])

    function openGithub() {
      openWindow(TREE_PLUGIN_URL)
    }

    function handleLoadData(treeNode) {
      return new Promise<void>(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` }
          ]
          lazyTreeData.value = [...lazyTreeData.value]
          resolve()
        }, 1000)
      })
    }

    function handleDrop(info: AntTreeNodeDropEvent) {
      const dropKey = info.node.key
      const dragKey = info.dragNode.key
      const dropPos = info.node.pos?.split('-')!
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data: TreeProps['treeData'] = [], key: string | number, callback: any) => {
        data.forEach((item, index) => {
          if (item.key === key) {
            return callback(item, index, data)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      };
      const data = [...dragTreeData.value]

      // Find dragObject
      let dragObj: any
      loop(data, dragKey, (item: any, index: number, arr: TreeProps['treeData'] = []) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item: any) => {
          item.children = item.children || []
          /// where to insert
          item.children.unshift(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item: any) => {
          item.children = item.children || []
          // where to insert
          item.children.unshift(dragObj)
        })
      } else {
        let ar: TreeProps['treeData'] = []
        let i = 0
        loop(data, dropKey, (_item: any, index: number, arr: TreeProps['treeData']) => {
          ar = arr
          i = index
        })
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      dragTreeData.value = data
    }

    return () => (
      <PageWrapper name='Tree树形控件'>
        {{
          header: () => <>
            <p>ant-design-tree: 基于Ant-Design的Tree组件, 可以完整展现其中的层级关系, 并具有展开收起选择等交互功能。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={8}>
                <AntdCard title='可选择节点' bordered={false} bodyStyle={{height: '420px'}}>
                  <AntdTree
                    v-model:checkedKeys={checkedKeys.value}
                    treeData={treeData}
                    checkable
                    defaultExpandAll
                  />
                </AntdCard>
              </AntdCol>
              <AntdCol span={8}>
                <AntdCard title='懒加载节点' bordered={false} bodyStyle={{height: '420px'}}>
                  <AntdTree
                    v-model:expandedKeys={expandedKeys.value}
                    v-model:selectedKeys={selectedKeys.value}
                    checkable
                    treeData={lazyTreeData.value}
                    loadData={handleLoadData}
                  />
                </AntdCard>
              </AntdCol>
              <AntdCol span={8}>
                <AntdCard title='可拖拽节点' bordered={false} bodyStyle={{height: '420px'}}>
                  <AntdTree
                    treeData={dragTreeData.value}
                    draggable
                    blockNode
                    defaultExpandAll
                    onDrop={handleDrop}
                  />
                </AntdCard>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})