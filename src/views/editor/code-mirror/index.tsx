import { defineComponent, ref, reactive, shallowRef } from 'vue'
import { Button, Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { CODEMIRROR_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { Codemirror } from 'vue-codemirror'
import Toolbar from './components/Toolbar'
import CodeInfo from './components/CodeInfo'

export default defineComponent({
  name: 'CodeMirror',
  setup() {
    const codeRef = ref(`console.log('Hello, world!')`)
    const extensions = []

    const config = reactive({
      language: 'javascript',
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      height: '350px'
    })

    const state = reactive({
      lines: null as null | number,
      cursor: null as null | number,
      selected: null as null | number,
      length: null as null | number
    })

    // Codemirror EditorView instance ref
    const cmView = shallowRef()
    function handleReady({ view }: any) {
      cmView.value = view
    }

    function handleStateUpdate(viewUpdate: any) {
      const ranges = viewUpdate.state.selection.ranges
      state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
      state.cursor = ranges[0].anchor
      state.length = viewUpdate.state.doc.length
      state.lines = viewUpdate.state.doc.lines
    }
    
    function openGithub() {
      openWindow(CODEMIRROR_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='CodeMirror代码编辑器'>
        {{
          header: () => <>
            <p>VueCodeMirror: 是一款基于vue的代码编辑器, 可支持html、javascript、typescript等。</p>
            <p>组件地址:<Button type='link' onClick={openGithub}>立即访问</Button></p>
          </>,
          default: () => (
            <Card bordered={false}>
              <Toolbar config={config} />
              <Codemirror
                v-model={codeRef.value}
                style={{
                  height: config.height,
                  borderLeft: 'solid 1px #ddd',
                  borderRight: 'solid 1px #ddd'
                }}
                autofocus={config.autofocus}
                indentWithTab={config.indentWithTab}
                tabSize={config.tabSize}
                extensions={extensions}
                placeholder="Please enter the code..."
                onReady={handleReady}
                onUpdate={handleStateUpdate}
              />
              <CodeInfo config={config} state={state} />
            </Card>
          )
        }}
      </PageWrapper>
    )
  }
})