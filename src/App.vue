<!-- eslint-disable no-unused-vars -->
<script setup>
import { NSpace, NButton } from 'naive-ui'
import { MaintenanceOrder } from './interface/maintenance-order.interface'
import service from './assets/data/maintenance-order.data'
import { lightTheme } from 'naive-ui'
import Table from './components/Table.vue'
import { ref } from 'vue';

service.init()

let maintenanceOrders = ref([])
let maintenanceOrder = new MaintenanceOrder()

const getOrder = () => {
  maintenanceOrders.value = [...service.find()]
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
  <n-config-provider :theme="lightTheme">
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
        <Table :data="maintenanceOrders" />
      </n-space>
    </div>
  </n-config-provider>
</template>
