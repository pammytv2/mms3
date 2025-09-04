<script setup lang="ts">
import { label } from '@primeuix/themes/aura/metergroup';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const toast = useToast();
const confirmPopup = useConfirm();

// คำนวณ Balance QTY = Receive QTY - Take Out QTY
function getBalanceQty(receiveQty: number | string, takeOutQty: number | string) {
    const r = parseFloat(receiveQty as string) || 0;
    const t = parseFloat(takeOutQty as string) || 0;
    return Math.max(r - t, 0);
}

function getReturnQty(receiveQty: number | string, returnQty: number | string) {
    const r = parseFloat(receiveQty as string) || 0;
    const t = parseFloat(returnQty as string) || 0;
    return Math.max(t + r, 0);
}

function colorBalanceQty(balanceQty: number) {
    if (balanceQty === 0) return 'font-semibold bg-green-100 text-green-600 px-3 py-1 rounded select-text';
    if (balanceQty > 0) return 'font-semibold bg-yellow-100 text-yellow-600 px-3 py-1 rounded select-text';
    return '';
}

function getIQAStatusClass(status: string) {
    if (status === 'Pending') return 'bg-yellow-200 text-yellow-700 font-semibold px-2 py-1 rounded';
    if (status === 'Passed') return 'bg-green-200 text-green-700 font-semibold px-2 py-1 rounded';
    if (status === 'Failed') return 'bg-red-200 text-red-700 font-semibold px-2 py-1 rounded';
    return 'px-2 py-1 rounded';
}
// สำหรับ v-model ของแต่ละ select ในตัวอย่าง
import { reactive, ref, toRefs, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};

// mock data สำหรับหัวข้อ (ควรดึงจาก API จริงในอนาคต)
const receiveNumber = 'RC25070359';
const receiveDate = '2025-07-03';
const invoiceNumber = 'IVLSD-250029';
const specialExpDate = '2025-09-01';

// mock data สำหรับแถวในตาราง (ควรย้ายไปใช้จริงจาก backend ในอนาคต)
const tableRows = reactive([
    {
        no: '1',
        itemNo: 'ITEM-001',
        description: 'Paracetamol 500mg',
        unit: 'Box',
        lotExpireDate: '2025-01-31',
        invoice: 'INV-20250901-001',
        lotSplitStatusIdx: 0,
        iqaStatus: 'Pending',
        receiveQty: '10000',
        takeOutQty: '',
        returnQty: '',
        balanceQty: ''
    },
    {
        no: '2',
        itemNo: 'ITEM-002',
        description: 'Amoxicillin 250mg',
        unit: 'Bottle',
        lotExpireDate: '2025-03-15',
        invoice: 'INV-20250902-002',
        lotSplitStatusIdx: 2,
        iqaStatus: 'Failed',
        receiveQty: '10000',
        takeOutQty: '',
        returnQty: '',
        balanceQty: ''
    },
    {
        no: '3',
        itemNo: 'ITEM-003',
        description: 'Amoxicillin 250mg',
        unit: 'Bottle',
        lotExpireDate: '2025-03-15',
        invoice: 'INV-20250902-002',
        lotSplitStatusIdx: 1,
        iqaStatus: 'Passed',
        receiveQty: '10000',
        takeOutQty: '',
        returnQty: '',
        balanceQty: ''
    }
]);

const filteredRows = computed(() => {
    if (!searchQuery.value) return tableRows;
    const q = searchQuery.value.toLowerCase();
    return tableRows.filter(
        (row) =>
            row.no.includes(q) ||
            row.itemNo.toLowerCase().includes(q) ||
            row.description.toLowerCase().includes(q) ||
            row.unit.toLowerCase().includes(q) ||
            row.lotExpireDate.includes(q) ||
            row.invoice.toLowerCase().includes(q) ||
            row.iqaStatus.toLowerCase().includes(q)
    );
});
// สำหรับ scroll กลับไปยังตาราง Detail
const detailTableRef = ref<HTMLElement | null>(null);

const lotSplitStatusList = reactive([{ value: 'Not Specified' }, { value: 'Not Specified' }, { value: 'Not Specified' }]);

function getLotSplitStatusClass(status: string) {
    if (status === 'Lot Required') return 'bg-green-100 text-green-700';
    if (status === 'No Lot Required') return 'bg-red-100 text-red-700';
    return 'bg-white text-gray-900';
}
import { useRoute } from 'vue-router';
const route = useRoute();

// const receiveNumber = route.params.receiveNumber;
const expireDate = ref('');

// Dialog state
const isDialogOpen = ref(false);
const dialogRowIndex = ref<number | null>(null);

// Lot rows state for dialog (แยกแต่ละแถว)
interface LotRow {
    no: string;
    lotNo: string;
    qty: string;
    unit: string;
    expireDate: string;
}

function expireDateEnd(date: string) {
    if (!date) return '';
    const today = new Date();
    const expire = new Date(date);
    const diffTime = expire.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
        return 'bg-red-200 text-red-700 font-semibold px-2 py-1 rounded'; // หมดอายุ
    } else if (diffDays <= 15) {
        return 'bg-yellow-200 text-yellow-700 font-semibold px-2 py-1 rounded'; // ใกล้หมดอายุ
    }
    return '';
}
// ข้อมูล lotRows mock ให้ครบ 3 แถว (ตาม tableRows)
interface LotRowEx extends LotRow {
    takeOutQty?: string;
    problem?: string;
    remark?: string;
}
const allLotRows = reactive<LotRowEx[][]>([
    [{ no: '1', lotNo: 'A001', qty: tableRows[0].receiveQty, unit: 'Box', expireDate: '2025-09-01', takeOutQty: '' }],
    [{ no: '1', lotNo: 'B002', qty: tableRows[0].receiveQty, unit: 'Bottle', expireDate: '2025-03-15', takeOutQty: '' }],
    [{ no: '1', lotNo: 'C003', qty: tableRows[0].receiveQty, unit: 'Bottle', expireDate: '2025-03-15', takeOutQty: '' }]
]);
const lotRows = ref<LotRowEx[]>([]); // ใช้สำหรับ dialog เท่านั้น

function openEditDialog(rowIndex: number) {
    dialogRowIndex.value = rowIndex;
    // clone ข้อมูลมาแก้ไข
    lotRows.value = allLotRows[rowIndex].map((row) => ({ ...row }));
    isDialogOpen.value = true;
}

function closeEditDialog(save = false) {
    if (save && dialogRowIndex.value !== null) {
        // เซฟกลับไปที่ allLotRows
        allLotRows[dialogRowIndex.value] = lotRows.value.map((row) => ({ ...row }));
    }
    isDialogOpen.value = false;
    dialogRowIndex.value = null;
    lotRows.value = [];
    // scroll กลับไปยังตาราง Detail
    nextTick(() => {
        if (detailTableRef.value) {
            detailTableRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

function addRow() {
    // ดึง unit จากแถวที่เลือกใน dialog
    let unit = '';
    if (dialogRowIndex.value !== null) {
        unit = tableRows[dialogRowIndex.value].unit;
    }
    lotRows.value.push({ no: '', lotNo: '', qty: '', unit, expireDate: '' });
}

function removeRow(index: number) {
    if (lotRows.value.length > 1) {
        lotRows.value.splice(index, 1);
    }
}

const searchQuery = ref('');
const checkboxValue = ref(false);
const loading = ref(false);
const selectedRows = ref([]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    itemNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    unit: { value: null, matchMode: FilterMatchMode.EQUALS },
    lotExpireDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    receiveQty: { value: null, matchMode: FilterMatchMode.EQUALS },
    invoice: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    iqaStatus: { value: null, matchMode: FilterMatchMode.EQUALS }
});

function onSearch() {
    // Implement your search logic here
    console.log('Searching for:', searchQuery.value);
}

function handleRowClick(receiveNumber: string) {
    // Implement your row click logic here
    console.log('Row clicked:', receiveNumber);
}
function confirm(event) {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            closeEditDialog(true);
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            closeEditDialog(true);
        }
    });
}

function Success() {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Submitted to IQA', life: 3000 });
}

function clearFilter() {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        itemNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
        unit: { value: null, matchMode: FilterMatchMode.EQUALS },
        lotExpireDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
        receiveQty: { value: null, matchMode: FilterMatchMode.EQUALS },
        invoice: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        iqaStatus: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
}
</script>

<template>
  
    <div class="card mb-6">
        <Button icon="pi pi-arrow-left" @click="goBack" severity="secondary" outlined />
        <div class="flex items-center gap-4 mb-4">
           
            <div class="text-2xl font-bold">Receive Material Detail</div>
        </div>
        <!-- card Detail -->
        <div class="flex space-x-4 flex-col sm:flex-row justify-center items-stretch gap-8 mt-2">
            <div class="grid grid-cols-2 gap-4">
                <div class="ml-1">
                    <span class="inline-block text-muted-color font-medium mr-2">Receive Number:</span>
                    <span class="inline-block font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">{{ receiveNumber }}</span>
                </div>
                <div>
                    <span class="inline-block text-muted-color font-medium mr-2">Receive Date:</span>
                    <span class="inline-block font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">{{ receiveDate }}</span>
                </div>

                <div class="ml-1">
                    <span class="inline-block text-muted-color font-medium mb-2 mr-2">Invoice Number:</span>
                    <span class="inline-block font-semibold mb-2 bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">{{ invoiceNumber }}</span>
                </div>
                <div class="ml-1">
                    <span class="inline-block text-muted-color font-medium mb-2 mr-2">Special Exp:</span>
                    <span class="inline-block font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">{{ specialExpDate }}</span>
                </div>
            </div>

            <div class="grid justify-items-end sm:justify-items-start sm:flex-1 sm:flex sm:justify-end gap-4">
                <div class="flex justify-center flex-1 sm:justify-start mt-2">
                    <div class="mb-1">
                        <span class="inline-block text-muted-color font-medium mb-1 mr-2">Vendor Details:</span>
                        <span class="inline-block font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">ABC Pharma Co., Ltd.</span>
                    </div>

                    <div class="ml-4">
                        <span class="inline-block text-muted-color font-medium mb-1 mr-2">Contact:</span>
                        <span class="inline-block font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer select-text">02-123-4567</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card mb-6">
        <div class="font-semibold text-xl mb-2">Receive Material List</div>
        <div class="flex flex-col md:flex-row md:items-end justify-end w-full mb-4 gap-4">
            <form class="flex flex-col md:flex-row md:items-end gap-2 md:w-auto">
                <input id="search" v-model="searchQuery" type="text" placeholder="Search" class="p-2 border rounded md:w-48" />
                <button type="button" class="px-4 py-2 bg-blue-500 text-white rounded" @click="onSearch">Search</button>
            </form>
        </div>
        <DataTable
            ref="detailTableRef"
            :value="filteredRows"
            v-model:filters="filters"
            v-model:selection="selectedRows"
            paginator
            :rows="10"
            dataKey="no"
            filterDisplay="menu"
            :loading="loading"
            showGridlines
            rowHover
            :globalFilterFields="['no', 'itemNo', 'description', 'unit', 'lotExpireDate', 'invoice', 'iqaStatus']"
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

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            
            <Column field="no" header="No" sortable>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by no" />
                </template>
            </Column>

            <Column field="itemNo" header="Item No" sortable>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by item no" />
                </template>
            </Column>

            <Column field="description" header="Description" sortable>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by description" />
                </template>
            </Column>

            <Column field="unit" header="Unit" sortable>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by unit" />
                </template>
            </Column>

            <Column field="lotExpireDate" header="Expire Date" sortable :style="{ minWidth: '200px' }">
                <template #body="{ data }">
                    <div :class="[expireDateEnd(data.lotExpireDate), 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'rounded']">
                        <Calendar 
                            v-model="data.lotExpireDate" 
                            dateFormat="yy-mm-dd" 
                            :showIcon="true" 
                            :showButtonBar="true"
                            class="w-full"
                            :baseZIndex="1000"
                        />
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <Calendar 
                        v-model="filterModel.value" 
                        dateFormat="yy-mm-dd" 
                        placeholder="Select Date"
                        :showButtonBar="true"
                        class="w-full"
                    />
                </template>
            </Column>

            <Column field="receiveQty" header="Receive QTY" sortable>
                <template #body="{ data }">
                    {{ getReturnQty(data.receiveQty, data.returnQty) }}
                </template>
            </Column>

            <Column field="takeOutQty" header="Take Out QTY">
                <template #body="{ data }">
                    <InputNumber v-model="data.takeOutQty" :min="0" mode="decimal" showButtons />
                </template>
            </Column>

            <Column field="returnQty" header="Return QTY" sortable>
                <template #body>0</template>
            </Column>

            <Column field="balanceQty" header="Balance QTY" sortable>
                <template #body="{ data }">
                    <span :class="colorBalanceQty(getBalanceQty(data.receiveQty, data.takeOutQty))">
                        {{ getBalanceQty(data.receiveQty, data.takeOutQty) }}
                    </span>
                </template>
            </Column>

            <Column field="invoice" header="Invoice Number" sortable>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by invoice" />
                </template>
            </Column>

            <Column field="lotSplitStatusIdx" header="Lot Split Status" sortable>
                <template #body="{ data }">
                    <Dropdown
                        v-model="lotSplitStatusList[data.lotSplitStatusIdx].value"
                        :options="['Not Specified', 'Lot Required', 'No Lot Required']"
                        :class="getLotSplitStatusClass(lotSplitStatusList[data.lotSplitStatusIdx].value)"
                    />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown
                        v-model="filterModel.value"
                        :options="['Not Specified', 'Lot Required', 'No Lot Required']"
                        placeholder="Select Status"
                    />
                </template>
            </Column>

            <Column field="iqaStatus" header="IQA Status" sortable>
                <template #body="{ data }">
                    <span :class="getIQAStatusClass(data.iqaStatus)">{{ data.iqaStatus }}</span>
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown
                        v-model="filterModel.value"
                        :options="['Pending', 'Passed', 'Failed']"
                        placeholder="Select Status"
                    />
                </template>
            </Column>

            <Column header="Action">
                <template #body="{ data, index }">
                    <Button icon="pi pi-pencil" @click="openEditDialog(index)" />
                </template>
            </Column>
        </DataTable>

        <div class="flex justify-end">
            <ConfirmPopup></ConfirmPopup>
            <Button ref="popup" @click="Success()" icon="pi pi-check" label="Submit to IQA" class="mr-2"></Button>
        </div>


        <div v-if="isDialogOpen" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-40">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div class="flex flex-col gap-4">
                        
                       
                        <div class="flex items-center gap-2">
                            <span class="text-muted-color font-medium">Item No:</span>
                            <span class="font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded select-text">
                                {{ dialogRowIndex !== null ? tableRows[dialogRowIndex].itemNo : '' }}
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-muted-color font-medium">Description:</span>
                            <span class="font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded select-text">
                                {{ dialogRowIndex !== null ? tableRows[dialogRowIndex].description : '' }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        
                        
                        <div class="flex items-center gap-2">
                            <span class="text-muted-color font-medium">Receive QTY:</span>
                            <span class="font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded select-text">
                                {{ dialogRowIndex !== null ? tableRows[dialogRowIndex].receiveQty : '' }}
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-muted-color font-medium">Unit:</span>
                            <span class="font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded select-text">
                                {{ dialogRowIndex !== null ? tableRows[dialogRowIndex].unit : '' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-lg font-semibold mb-4">Lot Information</div>
                <div class="overflow-x-auto mb-4">
                    <table class="min-w-full border border-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border px-2 py-1">No</th>
                                <th class="border px-2 py-1">Lot No</th>

                                <th class="border px-2 py-1">UNIT</th>
                                <th class="border px-2 py-1">TAKE OUT QTY</th>
                                <!-- <th class="border px-2 py-1">BALANCE QTY</th> -->
                                <th class="border px-2 py-1">EXPIRE DATE</th>
                                <th class="border px-2 py-1">have a problem?</th>
                                <th class="border px-2 py-1">REMARK</th>
                                <th class="border px-2 py-1">ACTIONS</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(row, idx) in lotRows" :key="idx">
                                <td class="border px-2 py-1">
                                    {{ idx + 1 }}
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-24" placeholder="Lot No" v-model="row.lotNo" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-16" placeholder="Unit" v-model="row.unit" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input
                                        type="number"
                                        min="0"
                                        :max="dialogRowIndex !== null ? tableRows[dialogRowIndex].receiveQty : ''"
                                        class="border rounded px-2 py-1 w-16"
                                        placeholder="TAKE OUT QTY"
                                        v-model="row.takeOutQty"
                                        step="any"
                                        @input="
                                            if (
                                                dialogRowIndex !== null &&
                                                parseFloat(row.takeOutQty || '') >
                                                    (parseFloat(tableRows[dialogRowIndex].receiveQty || '') || 0)
                                            ) {
                                                row.takeOutQty = (parseFloat(tableRows[dialogRowIndex].receiveQty || '') || 0).toString();
                                                toast.add({ severity: 'warn', summary: 'Warning', detail: 'Take Out Qty ห้ามเกิน Receive Qty', life: 2000 });
                                            }
                                        "
                                    />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="date" class="border rounded px-2 py-1 w-36" v-model="row.expireDate" :class="expireDateEnd(row.expireDate)" />
                                </td>
                                <td class="border px-2 py-1">
                                    <Checkbox
                                        :id="'checkOption' + idx"
                                        name="option"
                                        :value="true"
                                        v-model="row.problem"
                                    />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-36" v-model="row.remark" />
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    <Button label="Delete" icon="pi pi-trash" severity="danger" style="width: auto" @click="removeRow(idx)" />
                                </td>
                            </tr>
                        </tbody>
                       
                        <tfoot>
                            <tr>
                                <td colspan="8" class="text-left font-semibold py-2 pl-4">
                                    <span
                                        :class="colorBalanceQty(
                                            dialogRowIndex !== null
                                                ? Math.max(
                                                    (parseFloat(tableRows[dialogRowIndex].receiveQty || '') || 0) -
                                                    lotRows.reduce((sum, r) => sum + (parseFloat(r.takeOutQty || '') || 0), 0),
                                                    0
                                                )
                                                : 0
                                        )"
                                    >
                                        Balance Qty:
                                        {{
                                            dialogRowIndex !== null
                                                ? Math.max(
                                                    (parseFloat(tableRows[dialogRowIndex].receiveQty || '') || 0) -
                                                    lotRows.reduce((sum, r) => sum + (parseFloat(r.takeOutQty || '') || 0), 0),
                                                    0
                                                )
                                                : 0 
                                        }}
                                        <span class="colorBalanceQty">
                                           / {{
                                               dialogRowIndex !== null
                                                   ? (parseFloat(tableRows[dialogRowIndex].receiveQty || '') || 0)
                                                   : 0
                                            }}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                        
                         
                    </table>
                    
                   
                    
                </div>
                <div class="flex justify-end gap-2">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="addRow">+ Add Row</button>
                    <button class="px-4 py-2 bg-red-500 text-white rounded" @click="closeEditDialog()">Cancel</button>
                    <ConfirmPopup></ConfirmPopup>
                    <Button ref="popup" @click="confirm($event)" icon="pi pi-check" label="Save" class="mr-2"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
