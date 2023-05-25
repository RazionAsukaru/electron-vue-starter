<!-- eslint-disable no-unused-vars -->
<script setup>
import { NSpace, NButton, NIcon } from 'naive-ui'
import service from './assets/data/maintenance-report.data'
import Table from './components/Table.vue'
import AddDialog from './components/AddDialog.vue'
import { ref } from 'vue'
import { DocumentOutline } from '@vicons/ionicons5'
import { utils, writeFile } from 'xlsx'

service.init()

let items = ref([])

const getOrder = () => {
  items.value = [...service.find()]
}

const downloadXslx = () => {
  const itemValues = items.value.map(d => {
    delete d.id
    return d
  })
  const data = utils.json_to_sheet(itemValues)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, data, 'data')

  const date = new Date()
  const filename = `MaintenanceReport-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}.xlsx`
  writeFile(wb, filename)
}

getOrder()
</script>

<template>
  <h1 style="padding: 0 3rem">Maintenance Report {{ showModal }}</h1>
  <n-space :justify="'end'" style="padding: 0 3rem">
    <n-button type="primary" @click="downloadXslx" :disabled="!items.length" >
      <n-icon size="18">
        <DocumentOutline />
      </n-icon>
      <span style="margin-left: 10px">Export to Excel</span>
    </n-button>
    <AddDialog @created="getOrder" />
  </n-space>
  <Table :items="items" @updated="getOrder" />
</template>
