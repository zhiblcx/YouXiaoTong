import { CheckOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { h } from 'vue'

export const seccessMessage = message => {
  notification.open({
    message,
    icon: () => h(CheckOutlined, { style: 'color: #90cb4c' }),
    style: { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', height: '60px' }
  })
}
