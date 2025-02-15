<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { message } from 'ant-design-vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addArticleApi } from '@/api'
import { showArticleByIdApi, updateArticleApi } from '../../api'
const router = useRouter()
const route = useRoute()
const fileList = ref([])
const myQuillEditor = ref()
const fileBtn = ref()
const imageUrl = ref('')
const loading = ref(false)
const articleData = ref({
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
  content: ''
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
    const { data: result } = await showArticleByIdApi(id)
    if (result.statusCode === undefined) {
      article.value = result
      imageUrl.value = article.value.photo
      toRaw(myQuillEditor.value).setHTML(article.value.content)
    }
  }
})

const uploadArticle = async () => {
  const regex = /<[^>]+>([\s\S]*?)<\/[^>]+>/g
  const matches = article.value.content.match(regex)
  if (matches == null) {
    message.error('请填写完整')
    return
  }

  if (!article.value.title.trim() || imageUrl.value === null) {
    message.error('请填写完整')
    return
  }

  const { data } = await addArticleApi({
    title: article.value.title,
    status: article.value.status,
    photo: imageUrl.value,
    content: article.value.content
  })
  if (data.statusCode === undefined) {
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
  const matches = article.value.content.match(regex)
  if (matches == null) {
    message.error('请填写完整')
    return
  }

  if (article.value.title.trim() == '' || imageUrl.value == null) {
    message.error('请填写完整')
    return
  }

  const { data: result } = await updateArticleApi(route.query.id, { ...article.value, photo: imageUrl.value })
  if (result.statusCode === undefined) {
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

const setValue = () => {
  // const text = toRaw(myQuillEditor.value).getHTML()
}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const handleChange = (info) => {
  getBase64(info.file.originFileObj, (base64Url) => {
    imageUrl.value = base64Url
    loading.value = false
  })
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传 JPG 和 PNG 类型的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图像不能超过2MB!')
  }
  return isJpgOrPng && isLt2M
}
</script>

<template>
  <div style="display: flex; align-items: end; justify-content: space-between; margin-bottom: 5px">
    <div>
      <div style="margin-bottom: 20px">
        <span>文章标题：</span>
        <a-input
          v-model:value="article.title"
          placeholder="请输入标题"
          style="width: 300px"
        />
      </div>
      <a-form-item
        label="文章图片"
        name="avator"
      >
        <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
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
      <div style="margin-bottom: 20px">
        <span>文章状态：</span>
        <a-switch v-model:checked="article.status" />
      </div>
    </div>
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="uploadArticle"
      v-if="route.query.id == undefined"
      >上传文章</a-button
    >
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="editArticle"
      v-else
      >修改文章</a-button
    >
  </div>
  <div>
    <div style="margin-bottom: 10px">文章详情：</div>
    <!-- 此处注意写法v-model:content -->
    <QuillEditor
      ref="myQuillEditor"
      theme="snow"
      v-model:content="article.content"
      :options="articleData.editorOption"
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
