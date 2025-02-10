import { CloseOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { h } from 'vue'

export const errorMessage = message => {
  notification.open({
    message,
    icon: () => h(CloseOutlined, { style: 'color: #c71522' }),
    style: { backgroundColor: '#fff2f0', border: '1px solid #ffccc7', height: '60px' }
  })
}
