<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { message } from 'ant-design-vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showMenuByIdApi, addMenuApi, updateMenuApi } from '@/api'
const router = useRouter()
const route = useRoute()
const fileList = ref([])
const myQuillEditor = ref()
const fileBtn = ref()
const imageUrl = ref('')
const loading = ref(false)
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

const product = ref({
  title: '',
  price: '',
  description: ''
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
  if (id !== undefined) {
    const { data: result } = await showMenuByIdApi(id)
    if (result.statusCode === undefined) {
      product.value = result
      imageUrl.value = product.value.photo
      toRaw(myQuillEditor.value).setHTML(product.value.description)
    }
  }
})

const uploadProduct = async () => {
  const regex = /<[^>]+>([\s\S]*?)<\/[^>]+>/g
  const matches = product.value.description.match(regex)
  if (matches == null) {
    message.error('请填写完整1')
    return
  }

  if (!product.value.title.trim() || !imageUrl.value || !product.value.price) {
    message.error('请填写完整')
    return
  }

  const { data: result } = await addMenuApi({ ...product.value, photo: imageUrl.value })
  if (result.statusCode === undefined) {
    message.success('上传成功')
    setTimeout(() => {
      router.push('/product/editproduct')
    }, 1000)
  } else {
    message.error('上传失败')
  }
}

async function editProduct() {
  const regex = /<[^>]+>([\s\S]*?)<\/[^>]+>/g
  const matches = product.value.description.match(regex)
  if (matches == null) {
    message.error('请填写完整1')
    return
  }

  if (!product.value.title.trim() || !imageUrl.value || !product.value.price) {
    message.error('请填写完整')
    return
  }

  const { data: result } = await updateMenuApi(product.value.id, { ...product.value, photo: imageUrl.value })
  if (result.statusCode === undefined) {
    message.success('修改成功')
    setTimeout(() => {
      router.push('/product/editproduct')
    }, 1000)
  } else {
    message.error('上传失败')
  }
}

const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
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
        <span>菜品名字：</span>
        <a-input
          v-model:value="product.title"
          placeholder="请输入标题"
          style="width: 300px"
        />
      </div>
      <div style="margin-bottom: 20px">
        <span>菜品单价：</span>
        <a-input-number
          addon-after="$"
          v-model:value="product.price"
          precision="2"
          :min="0"
        />
      </div>
      <a-form-item
        label="菜品图片"
        name="avator"
      >
        <a-upload
          v-model:file-list="fileList"
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
    </div>
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="uploadProduct"
      v-if="route.query.id === undefined"
      >上传菜品</a-button
    >
    <a-button
      type="primary"
      style="margin-right: 10px"
      @click="editProduct"
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
      v-model:content="product.description"
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
