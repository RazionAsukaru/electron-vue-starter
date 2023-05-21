<!-- eslint-disable no-unused-vars -->
<script setup>
import { app } from '@electron/remote'
import { ref, reactive } from 'vue'
import { NSpace, NButton, NDataTable } from 'naive-ui'
import fs from 'fs'
import { MaintenanceOrder } from './interface/maintenance-order.interface.js'
import pathModule from 'path'

const basePath = ref(app.getAppPath())
const file = pathModule.join(basePath.value, 'maintenance-order.json')

let maintenanceOrders = []
let maintenanceOrder = new MaintenanceOrder()
if (!fs.existsSync(file)) {
  try {
    fs.writeFileSync(file, JSON.stringify(maintenanceOrders))
  } catch (e) {
    console.error('Failed to create json file')
  }
} else {
  const rawdata = fs.readFileSync(file)
  maintenanceOrders = JSON.parse(rawdata)
  fs.writeFileSync(file, JSON.stringify(maintenanceOrders))
}

const addOrder = () => {
    console.log('Add Order');
}
const getOrder = () => {
    console.log('Get Order');
}
const updateOrder = () => {}
const writeOrder = () => {
    fs.writeFileSync(file, JSON.stringify(maintenanceOrders))
}

const technicianNameColumn = {
  title: 'Technician Name',
  key: 'technicianName'
}
const unitSerialNumberColumn = {
  title: 'Unit Serial Number',
  key: 'unitSerialNumber'
}
const unitModelColumn = {
  title: 'Unit Model',
  key: 'unitModel'
}
const manufacturerSerialNumberColumn = {
  title: 'Manufacturer Serial Number',
  key: 'manufacturerSerialNumber'
}
const sMUComponentColumn = {
  title: 'SMU Component',
  key: 'smuComponent'
}
const maintenanceDescriptionColumn = {
  title: 'Maintenance Description',
  key: 'maintenanceDescription'
}
const woCreatedColumn = {
  title: 'WO Created',
  key: 'woCreated',
}
const WoClosedColumn = {
  title: 'WO Closed',
  key: 'woClosed',
}
const maintenanceCategoryColumn = {
  title: 'Maintenance Category',
  key: 'maintenanceCategory'
}

const columns = [
  technicianNameColumn,
  unitSerialNumberColumn,
  unitModelColumn,
  manufacturerSerialNumberColumn,
  sMUComponentColumn,
  maintenanceDescriptionColumn,
  woCreatedColumn,
  WoClosedColumn,
  maintenanceCategoryColumn
]
</script>

<template>
  <div class="container mt-2">
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary" @click="addOrder"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
    <n-space>
      <n-data-table
        :columns="columns"
        :loading="loadingRef"
        :data="maintenanceOrders"
        :max-height="500"
        :scroll-x="1800"
        virtual-scroll
      />
    </n-space>
  </div>
</template>
