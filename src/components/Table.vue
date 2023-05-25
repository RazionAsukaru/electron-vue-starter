<!-- eslint-disable no-unused-vars -->
<script setup>
import { defineProps, toRefs, defineEmits } from 'vue'
import { NButton, NSpace, NTable, NIcon } from 'naive-ui'
import service from '../assets/data/maintenance-report.data'
import EditDialog from './EditDialog.vue'
import { TrashBinOutline } from '@vicons/ionicons5'

const props = defineProps(['items'])
const emit = defineEmits(['updated'])

const { items } = toRefs(props)
const deleteItem = id => {
  service.remove(id)
  emit('updated', true)
}
</script>

<template>
  <div style="max-height: 70vh; overflow: auto; width: 90vw; margin: 20px auto">
    <n-table :single-line="false" :striped="true">
      <thead>
        <tr>
          <th>Technician Name</th>
          <th>Unit Serial Number</th>
          <th>Unit Model</th>
          <th>Manufacturer Serial Number</th>
          <th>SMU Component</th>
          <th>Maintenance Description</th>
          <th>WO Created</th>
          <th>WO Closed</th>
          <th>Maintenance Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.technicianName || '-' }}</td>
          <td>{{ item.unitSerialNumber || '-' }}</td>
          <td>{{ item.unitModel || '-' }}</td>
          <td>{{ item.manufacturerSerialNumber || '-' }}</td>
          <td>{{ item.smuComponent || '-' }}</td>
          <td>{{ item.maintenanceDescription || '-' }}</td>
          <td>{{ item.woCreated || '-' }}</td>
          <td>{{ item.woClosed || '-' }}</td>
          <td>{{ item.maintenanceCategory || '-' }}</td>
          <td>
            <n-space :justify="'end'">
              <EditDialog
                :reportItem="{ ...item }"
                @updated="emit('updated', true)"
              />
              <n-button type="error" @click="deleteItem(item.id)">
                <n-icon size="18" style="margin-right: 5px">
                  <TrashBinOutline />
                </n-icon>
                Delete
              </n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
