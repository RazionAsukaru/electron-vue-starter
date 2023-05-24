<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import {
  NIcon,
  NButton,
  NModal,
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NSelect
} from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'
import service from './../assets/data/maintenance-report.data'
import technicianService from './../assets/data/technician.data'
import { MaintenanceReport } from './../interface/maintenance-report.interface'

technicianService.init()

const showModal = ref(false)

const item = ref(new MaintenanceReport())

const technicianNames = technicianService.find()

const close = () => {
  service.create(item)
}
const submit = () => {
  //   message.success('Submit')
}
</script>

<template>
  <div>
    <n-button type="info" @click="showModal = true">
      <n-icon size="18" style="margin-right: 5px">
        <AddOutline />
      </n-icon>
      Add
    </n-button>
    <n-modal
      v-model:show="showModal"
      style="margin-left: 40px; margin-right: 40px"
      preset="card"
      title="Add Report"
      :mask-closable="false"
      size="huge"
      aria-modal="true"
      show-icon="false"
    >
      <n-form :model="item">
        <n-form-item label="Technician Name">
          <n-select
            v-model:value="item.technicianName"
            filterable
            placeholder="Please Input Technician Name"
            :options="technicianNames"
          />
        </n-form-item>
        <n-form-item label="Unit Serial Number">
          <n-input
            v-model:value="item.unitSerialNumber"
            placeholder="Please Input Unit Serial Number"
          />
        </n-form-item>
      </n-form>
      <pre> {{ JSON.stringify(item, null, 2) }} </pre>
      <template #footer>
        <n-space justify="end">
          <n-button @click="close"> Close </n-button>
          <n-button @click="submit"> Submit </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
