<script lang="ts" setup>
import { NodeService } from '@/service/NodeService';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useReceiveStore } from '@/stores/receive';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const router = useRouter();
const receiveStore = useReceiveStore();
const loading = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    receiveNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    receiveDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    invoiceNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    vendorCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    vendorName: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

function handleRowClick(receiveNumber: string) {
    // ตัวอย่าง: ไปหน้า /receive-detail/:receiveNumber
    router.push({ name: 'Receive_Detail', params: { receiveNumber } });
}
const treeValue = ref<any[]>([]);

const allReceiveList = ref<any[]>([]);

const searchQuery = ref('');

// ใช้ค่าจาก store แทน
const startDate = computed({
    get: () => receiveStore.startDate,
    set: (value) => { receiveStore.startDate = value }
});

const endDate = computed({
    get: () => receiveStore.endDate,
    set: (value) => { receiveStore.endDate = value }
});

// กรองข้อมูลตาม searchQuery
const filteredReceiveList = computed(() => {
    let list = allReceiveList.value;
    // filter by searchQuery
    if (searchQuery.value) {
        const q = searchQuery.value.trim().toLowerCase();
        list = list.filter((item) => {
            const receive = item.receiveNumber.toLowerCase();
            const invoice = item.invoiceNumber.toLowerCase();
            // ค้นหาทั้งแบบ contains และ startsWith
            return receive.includes(q) || invoice.includes(q) || receive.startsWith(q) || invoice.startsWith(q);
        });
    }
    // filter by date range
    if (startDate.value) {
        list = list.filter((item) => item.receiveDate >= startDate.value.replace(/-/g, ''));
    }
    if (endDate.value) {
        list = list.filter((item) => item.receiveDate <= endDate.value.replace(/-/g, ''));
    }
    return list;
});


function onDateSearch() {
    // เพิ่ม logic การค้นหาตามวันที่ที่นี่
}

function clearFilter() {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        receiveNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        receiveDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
        invoiceNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        vendorCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        vendorName: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
}

function formatDate(dateString: string) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
}

onMounted(() => {
    treeValue.value = NodeService.getTreeNodesData();
    // mock data สำหรับตาราง (แต่ละ receive มี items ของตัวเอง)
    allReceiveList.value = [
        {
            receiveNumber: 'M250258E',
            receiveDate: '20250901',
            invoiceNumber: 'INV-20250901-001',
            vendorCode: 'ABC123',
            vendorName: 'ABC Supply Co.',
            items: [
                { no: 1, itemNo: 'ITEM-001', desc: 'Paracetamol 500mg', unit: 'Box', lotExpireDate: '2026-01-31', invoiceNumber: 'INV-20250901-001', lotSplitStatus: 'Not Specified', lotStatus: 'N/A', activeStatus: 'Active', iqaStatus: 'N/A' },
                { no: 2, itemNo: 'ITEM-002', desc: 'Amoxicillin 250mg', unit: 'Bottle', lotExpireDate: '2026-03-15', invoiceNumber: 'INV-20250901-001', lotSplitStatus: 'Not Specified', lotStatus: 'N/A', activeStatus: 'Not Active', iqaStatus: 'N/A' }
            ]
        },
        {
            receiveNumber: 'RT25080001',
            receiveDate: '20250902',
            invoiceNumber: 'INV-20250902-002',
            vendorCode: 'XYZ123',
            vendorName: 'XYZ Trading',
            items: [{ no: 1, itemNo: 'ITEM-003', desc: 'Ibuprofen 200mg', unit: 'Box', lotExpireDate: '2026-05-10', invoiceNumber: 'INV-20250902-002', lotSplitStatus: 'Lot Required', lotStatus: 'N/A', activeStatus: 'Active', iqaStatus: 'N/A' }]
        },
        {
            receiveNumber: 'RC25080001',
            receiveDate: '20250903',
            invoiceNumber: 'INV-20250904-003',
            vendorCode: 'XYZ14',
            vendorName: 'XYZ Trading',
            items: [
                { no: 1, itemNo: 'ITEM-004', desc: 'Cefalexin 500mg', unit: 'Box', lotExpireDate: '2027-01-01', invoiceNumber: 'INV-20250904-003', lotSplitStatus: 'No Lot Required', lotStatus: 'N/A', activeStatus: 'Active', iqaStatus: 'N/A' },
                { no: 2, itemNo: 'ITEM-005', desc: 'Vitamin C 1000mg', unit: 'Bottle', lotExpireDate: '2027-02-01', invoiceNumber: 'INV-20250904-003', lotSplitStatus: 'Not Specified', lotStatus: 'N/A', activeStatus: 'Not Active', iqaStatus: 'N/A' }
            ]
        }
    ];
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Receive Material</div>
        <form class="mb-4 flex flex-col gap-4">
            <div class="flex flex-col md:flex-row md:items-end gap-4">
                <div class="flex gap-4">
                    <input id="startDate" v-model="startDate" type="date" class="p-2 border rounded md:w-40" />
                    <input id="endDate" v-model="endDate" type="date" class="p-2 border rounded md:w-40" />
                    <button type="button" class="px-4 py-2 bg-green-500 text-white rounded h-fit md:mb-0 mt-0" @click="onDateSearch">Sync Date</button>
                </div>
            </div>
        </form>
    </div>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Receive Material List</div>
        <DataTable
            :value="filteredReceiveList"
            v-model:filters="filters"
            paginator
            :rows="10"
            dataKey="receiveNumber"
            filterDisplay="menu"
            :loading="loading"
            showGridlines
            rowHover
            @rowClick="(e) => handleRowClick(e.data.receiveNumber)"
            :globalFilterFields="['receiveNumber', 'receiveDate', 'invoiceNumber', 'vendorCode', 'vendorName']"
            class="mb-6"
        >
            <template #header>
                <div class="flex justify-between">
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Clear"
                        variant="outlined"
                        @click="clearFilter()"
                    />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            v-model="filters['global'].value"
                            placeholder="Keyword Search"
                        />
                    </IconField>
                </div>
            </template>

            <template #empty>No data found.</template>
            <template #loading>Loading data. Please wait.</template>

            <Column field="receiveNumber" header="Receive Number" sortable>
                <template #filter="{ filterModel }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        class="p-column-filter"
                        placeholder="Search by receive number"
                    />
                </template>
            </Column>

            <Column field="receiveDate" header="Receive Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.receiveDate) }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker
                        v-model="filterModel.value"
                        dateFormat="yy-mm-dd"
                        placeholder="yyyy-mm-dd"
                    />
                </template>
            </Column>

            <Column field="invoiceNumber" header="Invoice Number" sortable>
                <template #filter="{ filterModel }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        class="p-column-filter"
                        placeholder="Search by invoice"
                    />
                </template>
            </Column>

            <Column field="vendorCode" header="Vendor Code" sortable>
                <template #filter="{ filterModel }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        class="p-column-filter"
                        placeholder="Search by vendor code"
                    />
                </template>
            </Column>

            <Column field="vendorName" header="Vendor Name" sortable>
                <template #filter="{ filterModel }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        class="p-column-filter"
                        placeholder="Search by vendor name"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
