<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { message } from 'ant-design-vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import { uploadArticleApi, updateArticleApi, showPointArticle } from '../../api'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
const router = useRouter()
const route = useRoute()
const fileList = ref([])
const myQuillEditor = ref()
const fileBtn = ref()
const imageUrl = ref('')
const loading = ref(false)
const price = ref()
const data = ref({
  content: '',
  editorOption: {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: 1 }, { header: 2 }],
        [{ direction: 'rtl' }],
        [{ color: [] }, { background: [] }]
      ]
    },
    placeholder: '请输入内容...'
  }
})

const article = ref({
  title: '',
  detail: '',
  picture: ''
})

watch(
  () => (val) => {
    toRaw(myQuillEditor.value).setHTML(val)
  },
  { deep: true }
)

// 初始化编辑器
onMounted(async () => {
  const quill = toRaw(myQuillEditor.value).getQuill()
  if (myQuillEditor.value) {
    quill.getModule('toolbar').addHandler('image', imgHandler)
  }
  const { id } = route.query
  if (id != undefined) {
    const result = await showPointArticle(id)
    if (result.data.code == 200) {
      article.value = result.data.data
      imageUrl.value = 'http://127.0.0.1:3000/' + article.value.picture
      toRaw(myQuillEditor.value).setHTML(article.value.detail)
    }
  }
})

const uploadArticle = async () => {
  const regex = /<[^>]+>([\s\S]*?)<\/[^>]+>/g
  const matches = article.value.detail.match(regex)
  if (matches == null) {
    message.error('请填写完整')
    return
  }
  article.value.type = type.value.value
  if (article.value.title.trim() == '' || article.value.picture == null) {
    message.error('请填写完整')
    return
  }

  article.value.edit_timer = dayjs().format('YYYY/MM/DD HH:mm')

  const result = await uploadArticleApi({ ...article.value })
  if (result.data.code == 200) {
    message.success('上传成功')
    setTimeout(() => {
      router.push('/article/editarticle')
    }, 1000)
  } else {
    message.error('上传失败')
  }
}

async function editArticle() {
  // 提取标签内的内容
  const regex = /<[^>]+>([\s\S]*?)<\/[^>]+>/g
  const matches = article.value.detail.match(regex)
  if (matches == null) {
    message.error('请填写完整')
    return
  }
  article.value.type = type.value.value
  if (article.value.title.trim() == '' || article.value.picture == null) {
    message.error('请填写完整')
    return
  }

  const result = await updateArticleApi({ ...article.value })
  if (result.data.code == 200) {
    message.success('修改成功')
    setTimeout(() => {
      router.push('/article/editarticle')
    }, 1000)
  } else {
    message.error('修改失败')
  }
}

const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const handleChange = (info) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    getBase64(info.file.originFileObj, (base64Url) => {
      imageUrl.value = base64Url
      loading.value = false
    })
    if (info.file.response.code == 200) {
      article.value.picture = info.file.response.data
    }
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
</script>

<template>
  <div style="display: flex; align-items: end; justify-content: space-between; margin-bottom: 5px">
    <div>
      <div style="margin-bottom: 20px">
        <span>菜品名字：</span>
        <a-input
          v-model:value="article.title"
          placeholder="请输入标题"
          style="width: 300px"
        />
      </div>
      <div style="margin-bottom: 20px">
        <span>菜品单价：</span>
        <a-input-number
          v-model:value="price"
          precision="2"
          :min="1"
          :max="10"
        />
      </div>
      <a-form-item
        label="菜品图片"
        name="avator"
      >
        <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="/api/users/updatepicture?address=article"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="avatar"
            style="width: 100px"
          />
          <div v-else>
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </div>
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="uploadArticle"
      v-if="article.edit_timer == undefined"
      >上传菜品</a-button
    >
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="editArticle"
      v-else
      >修改菜品</a-button
    >
  </div>
  <div>
    <div style="margin-bottom: 10px">菜品详情：</div>
    <!-- 此处注意写法v-model:content -->
    <QuillEditor
      ref="myQuillEditor"
      theme="snow"
      v-model:content="article.detail"
      :options="data.editorOption"
      contentType="html"
      @update:content="setValue()"
    />
  </div>
</template>

<style scoped lang="scss">
// 调整样式
:deep(.ql-editor) {
  min-height: 400px;
}
:deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}
</style>
