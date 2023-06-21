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
    <div class="main-background">
        <n-card class="glass">
            <n-space :justify="'space-between'" :align="'center'">
                <h1>Maintenance Report</h1>
                <n-space :justify="'end'">
                    <n-button secondary type="primary" @click="downloadXslx" :disabled="!items.length">
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

<style scoped>
.main-background {
    padding: 5rem;
    background-image: url('assets/bg.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: calc(100vh - 10rem);
}
/* .main-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
} */

</style>
