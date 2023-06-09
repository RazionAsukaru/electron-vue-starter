<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { ref, toRef } from 'vue'
import {
  NIcon,
  NButton,
  NModal,
  NSpace,
  NForm,
  NFormItem,
  NInput
} from 'naive-ui'
import { PencilOutline } from '@vicons/ionicons5'
// import service from '../assets/data/maintenance-report.data'
// import technicianService from '../assets/data/technician.data'

// technicianService.init()

const showModal = ref(false)

const prop = defineProps(['reportItem'])
const emit = defineEmits(['updated'])

const item = toRef(prop.reportItem)

// const technicianNames = technicianService.find()

const submit = () => {
//   service.update(item.value)
  showModal.value = false
  emit('updated', true)
}
</script>

<template>
  <div>
    <n-button type="success" @click="showModal = true">
      <n-icon size="18" style="margin-right: 5px">
        <PencilOutline />
      </n-icon>
      Edit
    </n-button>
    <n-modal
      v-model:show="showModal"
      style="margin-left: 40px; margin-right: 40px"
      preset="card"
      title="Edit Report"
      :mask-closable="false"
      size="huge"
      aria-modal="true"
      :show-icon="false"
    >
      <n-form :model="item">
        <n-form-item label="Technician Name">
          <n-input
            v-model:value="item.technicianName"
            placeholder="Please Input Technician Name"
          />
        </n-form-item>

        <n-form-item label="Unit Serial Number">
          <n-input
            v-model:value="item.unitSerialNumber"
            placeholder="Please Input Unit Serial Number"
          />
        </n-form-item>

        <n-form-item label="Unit Model">
          <n-input
            v-model:value="item.unitModel"
            placeholder="Please Input Unit Model"
          />
        </n-form-item>

        <n-form-item label="Manufacturer Serial Number">
          <n-input
            v-model:value="item.manufacturerSerialNumber"
            placeholder="Please Input Manufacturer Serial Number"
          />
        </n-form-item>

        <n-form-item label="SMU Component">
          <n-input
            v-model:value="item.smuComponent"
            placeholder="Please Input SMU Component"
          />
        </n-form-item>

        <n-form-item label="Description">
          <n-input
            v-model:value="item.maintenanceDescription"
            placeholder="Please Input Description"
          />
        </n-form-item>

        <n-form-item label="WO Created">
          <n-input
            v-model:value="item.woCreated"
            placeholder="Please Input WO Created"
          />
        </n-form-item>

        <n-form-item label="WO Closed">
          <n-input
            v-model:value="item.woClosed"
            placeholder="Please Input WO Closed"
          />
        </n-form-item>

        <n-form-item label="Maintenance Category">
          <n-input
            v-model:value="item.maintenanceCategory"
            placeholder="Please Input Maintenance Category"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false"> Close </n-button>
          <n-button
            type="info"
            :disabled="
              !!!item.technicianName
            "
            @click="submit"
          >
            Edit
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
