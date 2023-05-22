<!-- eslint-disable no-unused-vars -->
<script setup>
import { defineProps, toRefs, toValue } from 'vue'
import { NSpace, NDataTable } from 'naive-ui'

const props = defineProps(['items'])

const { items } = toRefs(props)

const idColumn = {
  title: 'ID',
  key: 'id'
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
  key: 'woCreated'
}
const WoClosedColumn = {
  title: 'WO Closed',
  key: 'woClosed'
}
const maintenanceCategoryColumn = {
  title: 'Maintenance Category',
  key: 'maintenanceCategory'
}

const columns = [
  idColumn,
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
  <div style="padding: 0 3rem; margin-top: 20px; max-height: 70vh">
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :loading="loadingRef"
      :data="items"
      :max-height="'65vh'"
      :scroll-x="1800"
      virtual-scroll
    />
  </div>
</template>
