<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { NSpace, NButton, NIcon, NCard } from 'naive-ui';
import Table from './components/Table.vue';
import AddDialog from './components/AddDialog.vue';
import { DocumentOutline } from '@vicons/ionicons5';
import { utils, writeFile } from 'xlsx';
import { find } from './firebase/maintenance-report.firebase';

const items = find();
const downloadXslx = () => {
    const itemValues = items.value.map((d: any) => {
        delete d.id;
        return d;
    });
    const data = utils.json_to_sheet(itemValues);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, data, 'data');

    const date = new Date();
    const filename = `MaintenanceReport-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}.xlsx`;
    writeFile(wb, filename);
};

// getOrder();
</script>

<template>
    <div style="padding: 5rem; background: grey">
        <n-card style="height: 100vh; max-height: 900px">
            <n-space :justify="'space-between'" :align="'center'">
                <h1>Maintenance Report</h1>
                <n-space :justify="'end'">
                    <n-button type="primary" @click="downloadXslx" :disabled="!items.length">
                        <n-icon size="18">
                            <DocumentOutline />
                        </n-icon>
                        <span style="margin-left: 10px">Export to Excel</span>
                    </n-button>
                    <AddDialog />
                </n-space>
            </n-space>
            <Table :items="items" />
        </n-card>
    </div>
</template>
