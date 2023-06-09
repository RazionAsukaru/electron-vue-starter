<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { toRefs } from 'vue';
import { NButton, NSpace, NTable, NIcon } from 'naive-ui';
// import service from '../assets/data/maintenance-report.data'
import EditDialog from './EditDialog.vue';
import { TrashBinOutline } from '@vicons/ionicons5';
import { remove } from '../firebase/maintenance-report.firebase';
import { MaintenanceReport } from '../interface/maintenance-report.interface';

const props = defineProps(['items']);
const emit = defineEmits(['updated']);

const convertItem = (item: MaintenanceReport) => {
    return item;
};

const { items } = toRefs(props);
const deleteItem = (id: string) => {
    remove(id);
    emit('updated', true);
};

const formatDate = (val: string) => {
    const date = new Date(val);
    return date.getFullYear() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getDate();
};
</script>

<template>
    <div style="max-height: 70vh; overflow: auto; width: 100%; margin: 20px auto">
        <n-table :single-line="true" :striped="true" style="background-color: white">
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
                    <th style="width: 200px; text-align: right">Action</th>
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
                    <td>{{ !!item.woCreated ? formatDate(item.woCreated) : '-' }}</td>
                    <td>{{ !!item.woClosed ? formatDate(item.woClosed) : '-' }}</td>
                    <td>{{ item.maintenanceCategory || '-' }}</td>
                    <td>
                        <n-space :justify="'end'">
                            <EditDialog :reportItem="{ ...convertItem(item) }" @updated="emit('updated', true)" />
                            <n-button title="Delete" secondary circle type="error" @click="deleteItem(item.id)">
                                <n-icon size="22" style="font-weight: bold;">
                                    <TrashBinOutline />
                                </n-icon>
                            </n-button>
                        </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<style scoped>
tr > th {
    min-width: 100px;
    background-color: transparent;
}
</style>
