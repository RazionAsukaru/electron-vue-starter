<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import { NIcon, NButton, NModal, NSpace, NForm, NFormItem, NInput, NDatePicker } from 'naive-ui';
import { AddOutline } from '@vicons/ionicons5';
import { MaintenanceReport } from './../interface/maintenance-report.interface';
import { create } from '../firebase/maintenance-report.firebase';
import { computed } from '@vue/reactivity';

const showModal = ref(false);

let item = ref(new MaintenanceReport());

const disableSave = computed(
    () =>
        !!!item.value.technicianName ||
        !!!item.value.unitSerialNumber ||
        !!!item.value.unitModel ||
        !!!item.value.manufacturerSerialNumber ||
        !!!item.value.smuComponent ||
        !!!item.value.maintenanceDescription ||
        !!!item.value.woCreated ||
        !!!item.value.woClosed ||
        !!!item.value.maintenanceCategory
);

const submit = () => {
    const payload = {
        ...item.value,
    };
    if (typeof payload.woCreated === 'number') {
        payload.woCreated = new Date(payload.woCreated);
    }
    if (typeof payload.woClosed === 'number') {
        payload.woClosed = new Date(payload.woClosed);
    }
    payload.woCreated = JSON.stringify(payload.woCreated).replace(/\\|\"/g, '');
    payload.woClosed = JSON.stringify(payload.woClosed).replace(/\\|\"/g, '');
    create(payload);
    showModal.value = false;
    item = ref(new MaintenanceReport());
};
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
            :show-icon="false"
        >
            <n-form :model="item">
                <n-form-item label="Technician Name">
                    <n-input v-model:value="item.technicianName" placeholder="Please Input Technician Name" />
                </n-form-item>

                <n-form-item label="Unit Serial Number">
                    <n-input v-model:value="item.unitSerialNumber" placeholder="Please Input Unit Serial Number" />
                </n-form-item>

                <n-form-item label="Unit Model">
                    <n-input v-model:value="item.unitModel" placeholder="Please Input Unit Model" />
                </n-form-item>

                <n-form-item label="Manufacturer Serial Number">
                    <n-input
                        v-model:value="item.manufacturerSerialNumber"
                        placeholder="Please Input Manufacturer Serial Number"
                    />
                </n-form-item>

                <n-form-item label="SMU Component">
                    <n-input v-model:value="item.smuComponent" placeholder="Please Input SMU Component" />
                </n-form-item>

                <n-form-item label="Description">
                    <n-input v-model:value="item.maintenanceDescription" placeholder="Please Input Description" />
                </n-form-item>

                <n-form-item label="WO Created">
                    <n-date-picker v-model:value="item.woCreated" type="date" style="width: 100%" clearable />
                </n-form-item>

                <n-form-item label="WO Closed">
                    <n-date-picker v-model:value="item.woClosed" type="date" style="width: 100%" clearable />
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
                    <n-button type="info" :disabled="disableSave" @click="submit"> Add </n-button>
                </n-space>
            </template>
        </n-modal>
    </div>
</template>
