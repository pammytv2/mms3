<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const confirmPopup = useConfirm();

function getActiveStatusClass(status: string) {
    if (status === 'Active') return 'bg-green-100 text-green-600 font-semibold';
    if (status === 'Not Active') return 'bg-red-100 text-red-600 font-semibold';
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
        activeStatus: 'Active',
        iqaStatus: 'Pending'
    },
    {
        no: '2',
        itemNo: 'ITEM-002',
        description: 'Amoxicillin 250mg',
        unit: 'Bottle',
        lotExpireDate: '2025-03-15',
        invoice: 'INV-20250902-002',
        lotSplitStatusIdx: 2,
        activeStatus: 'Not Active',
        iqaStatus: 'Failed'
    },
    {
        no: '3',
        itemNo: 'ITEM-003',
        description: 'Amoxicillin 250mg',
        unit: 'Bottle',
        lotExpireDate: '2025-03-15',
        invoice: 'INV-20250902-002',
        lotSplitStatusIdx: 1,
        activeStatus: 'Not Active',
        iqaStatus: 'Passed'
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
            row.activeStatus.toLowerCase().includes(q) ||
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
}
const allLotRows = reactive<LotRowEx[][]>([
    [{ no: '1', lotNo: 'A001', qty: '10', unit: 'Box', expireDate: '2025-09-01', takeOutQty: '' }],
    [{ no: '1', lotNo: 'B002', qty: '5', unit: 'Bottle', expireDate: '2025-03-15', takeOutQty: '' }],
    [{ no: '1', lotNo: 'C003', qty: '8', unit: 'Bottle', expireDate: '2025-03-15', takeOutQty: '' }]
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
    lotRows.value.push({ no: '', lotNo: '', qty: '', unit: '', expireDate: '' });
}

function removeRow(index: number) {
    if (lotRows.value.length > 1) {
        lotRows.value.splice(index, 1);
    }
}

const searchQuery = ref('');
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
</script>

<template>
    <div class="card mb-6">
        <div class="text-2xl font-bold mb-4">Receive Material Detail</div>
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

        <table ref="detailTableRef" class="min-w-full border border-gray-300 mb-6">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2">Select</th>
                    <th class="border px-4 py-2">No</th>
                    <th class="border px-4 py-2">Item No</th>
                    <th class="border px-4 py-2">Item Description</th>
                    <th class="border px-4 py-2">Unit</th>
                    <th class="border px-4 py-2">Invoice Number</th>
                    <th class="border px-4 py-2">Lot Split Status</th>
                    <th class="border px-4 py-2">Active Status</th>
                    <th class="border px-4 py-2">IQA Status</th>
                    <th class="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, idx) in filteredRows" :key="row.no">
                    <td class="border px-4 py-2 text-center"><input type="checkbox" /></td>
                    <td class="border px-4 py-2 text-center">{{ row.no }}</td>
                    <td class="border px-4 py-2">{{ row.itemNo }}</td>
                    <td class="border px-4 py-2">{{ row.description }}</td>
                    <td class="border px-4 py-2 text-center">{{ row.unit }}</td>
                    <!-- <td class="border px-4 py-2 text-center">{{ row.lotExpireDate }}</td> -->
                    <td class="border px-4 py-2">{{ row.invoice }}</td>
                    <td class="border px-4 py-2 text-center">
                        <select class="border rounded px-2 py-1 w-full" v-model="lotSplitStatusList[row.lotSplitStatusIdx].value" :class="getLotSplitStatusClass(lotSplitStatusList[row.lotSplitStatusIdx].value)">
                            <option value="Not Specified">Not Specified</option>
                            <option value="Lot Required">Lot Required</option>
                            <option value="No Lot Required">No Lot Required</option>
                        </select>
                    </td>
                    <td class="border px-4 py-2 text-center" :class="getActiveStatusClass(row.activeStatus)">{{ row.activeStatus }}</td>
                    <td class="border px-4 py-2 text-center" :class="getIQAStatusClass(row.iqaStatus)">{{ row.iqaStatus }}</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="openEditDialog(idx)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-end">
            <ConfirmPopup></ConfirmPopup>
            <Button ref="popup" @click="Success()" icon="pi pi-check" label="Submit to IQA" class="mr-2"></Button>
        </div>
        <!-- Edit Dialog -->
        <div v-if="isDialogOpen" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-40">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative">
                <div class="text-lg font-semibold mb-4">Lot Information</div>
                <div class="overflow-x-auto mb-4">
                    <table class="min-w-full border border-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border px-2 py-1">No</th>
                                <th class="border px-2 py-1">Lot No</th>
                                <th class="border px-2 py-1">Lot Qty</th>
                                <th class="border px-2 py-1">UNIT</th>
                                <th class="border px-2 py-1">TAKE OUT QTY</th>
                                <th class="border px-2 py-1">BALANCE QTY</th>
                                <th class="border px-2 py-1">EXPIRE DATE</th>
                                <th class="border px-2 py-1">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, idx) in lotRows" :key="idx">
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-24" placeholder="No" v-model="row.no" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-24" placeholder="Lot No" v-model="row.lotNo" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="number" min="0" class="border rounded px-2 py-1 w-20" placeholder="Qty" v-model="row.qty" step="any" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="text" class="border rounded px-2 py-1 w-16" placeholder="Unit" v-model="row.unit" />
                                </td>
                                <td class="border px-2 py-1">
                                    <input
                                        type="number"
                                        min="0"
                                        :max="parseFloat(row.qty || '') || 0"
                                        class="border rounded px-2 py-1 w-16"
                                        placeholder="TAKE OUT QTY"
                                        v-model="row.takeOutQty"
                                        step="any"
                                        @input="
                                            if (parseFloat(row.takeOutQty || '') > (parseFloat(row.qty || '') || 0)) {
                                                row.takeOutQty = (parseFloat(row.qty || '') || 0).toString();
                                                toast.add({ severity: 'warn', summary: 'Warning', detail: 'Take Out Qty ห้ามเกิน Lot Qty', life: 2000 });
                                            }
                                        "
                                    />
                                </td>
                                <td class="border px-2 py-1">
                                {{ Math.max((parseFloat(row.qty || '') || 0) - (parseFloat(row.takeOutQty || '') || 0), 0) }}
                                </td>
                                <td class="border px-2 py-1">
                                    <input type="date" class="border rounded px-2 py-1 w-36" v-model="row.expireDate" :class="expireDateEnd(row.expireDate)" />
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    <Button label="Delete" icon="pi pi-trash" severity="danger" style="width: auto" @click="removeRow(idx)" />
                                </td>
                            </tr>
                        </tbody>

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
