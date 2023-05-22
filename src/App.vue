<!-- eslint-disable no-unused-vars -->
<script setup>
import { NSpace, NButton, NIcon } from 'naive-ui'
import { MaintenanceReport } from './interface/maintenance-report.interface'
import service from './assets/data/maintenance-report.data'
import Table from './components/Table.vue'
import { ref } from 'vue'
import { DocumentOutline, AddOutline } from '@vicons/ionicons5'

service.init()

let items = ref([])
let item = new MaintenanceReport()

const getOrder = () => {
  items.value = [...service.find()]
}
const createOrder = item => {
  service.create(item)
}
const updateOrder = item => {
  service.update(item)
}
const deleteOrder = () => {
  console.log('Add Order')
}
const findOrder = () => {
  service.findOne()
}

getOrder()
</script>

<template>
  <h1 style="padding: 0 3rem">Maintenance Report</h1>
  <n-space :justify="'end'" style="padding: 0 3rem">
    <n-button type="primary">
      <n-icon size="18">
        <DocumentOutline />
      </n-icon>
      <span style="margin-left: 10px">Export to Excel</span>
    </n-button>
    <n-button type="info">
      <n-icon size="18">
        <AddOutline />
      </n-icon>
      <span style="margin-left: 10px"> Tambah </span>
    </n-button>
  </n-space>
  <Table :items="items" />
</template>
