import type { UploadProps } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton, Upload as AntdUpload,
  UploadDragger as AntdUploadDragger, Modal as AntdModal } from 'ant-design-vue'
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { PageWrapper } from '@/components/Page'
import { UPLOAD_COMPO_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')

    const dragImgs = ref<UploadProps['fileList']>([
      { uid: '-1', name: 'beautiful-girl.jpg' },
      { uid: '-2', name: 'beautiful-sunshine.jpg' }
    ])

    const listImgs = ref<UploadProps['fileList']>([
      {
        uid: '-1',
        name: 'beautiful-girl.jpg',
        status: 'done',
        url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img04.jpg',
        thumbUrl: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img04.jpg'
      },
      {
        uid: '-2',
        name: 'beautiful-sunshine.jpg',
        status: 'done',
        url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img03.jpg',
        thumbUrl: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img03.jpg'
      }
    ])
    
    function openGithub() {
      openWindow(UPLOAD_COMPO_URL)
    }

    async function handlePreview(file: any) {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }

    function getBase64(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    function handleCancle() {
      previewVisible.value = false
      previewTitle.value = ''
    }

    return () => (
      <PageWrapper name='图片上传组件'>
        {{
          header: () => <>
            <p>ant-design-upload: 使用 ant-design 的 upload 组件, 并具有多种列表展示方式。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={8}>
                <AntdCard title='拖拽上传' bordered={false} bodyStyle={{height: '300px'}}>
                  <AntdUploadDragger
                    v-model:fileList={dragImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    multiple
                    class='muti-upload'
                  >
                    <p class="ant-upload-drag-icon" style='margin-bottom: 0;'>
                      <CloudUploadOutlined />
                    </p>
                    <p>将图片拖到此处, 或<span style='color: #1890ff;'>点击上传</span></p>
                    <p class="ant-upload-hint">只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
                  </AntdUploadDragger>
                </AntdCard>
              </AntdCol>
              <AntdCol span={8}>
                <AntdCard title='列表样式' bordered={false} bodyStyle={{height: '300px'}}>
                  <AntdUpload
                    v-model:fileList={listImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture'
                    class='list-upload'
                  >
                    <AntdButton type='primary'>
                      <CloudUploadOutlined />
                      <span>点击上传</span>
                    </AntdButton>
                    <p class="ant-upload-hint">只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
                  </AntdUpload>
                </AntdCard>
              </AntdCol>
              <AntdCol span={8}>
                <AntdCard title='照片墙' bordered={false} bodyStyle={{height: '300px'}}>
                  <AntdUpload
                    v-model:fileList={listImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture-card'
                    class='list-upload'
                    onPreview={handlePreview}
                  >
                    <div>
                      <PlusOutlined />
                      <div style="margin-top: 8px">点击上传</div>
                    </div>
                  </AntdUpload>
                </AntdCard>
                <AntdModal
                  visible={previewVisible.value}
                  title={previewTitle.value}
                  footer={null}
                  onCancel={handleCancle}
                >
                  <img src={previewImage.value} style='width: 100%' />
                </AntdModal>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})