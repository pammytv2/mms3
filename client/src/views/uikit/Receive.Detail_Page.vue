<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const confirmPopup = useConfirm();

function getActiveStatusClass(status: string) {
    if (status === 'Active') return 'text-green-600 font-semibold';
    if (status === 'Not Active') return 'text-red-600 font-semibold';
    return '';
}
// สำหรับ v-model ของแต่ละ select ในตัวอย่าง
import { reactive, ref, toRefs, nextTick } from 'vue';
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

const receiveNumber = route.params.receiveNumber;
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
// สมมุติว่ามี 2 แถว (ขยายได้ตามจำนวนจริง)
const allLotRows = reactive<LotRow[][]>([[{ no: '1', lotNo: 'A001', qty: '10', unit: 'Box', expireDate: '2026-01-31' }], [{ no: '1', lotNo: 'B002', qty: '5', unit: 'Bottle', expireDate: '2026-03-15' }]]);
const lotRows = ref<LotRow[]>([]); // ใช้สำหรับ dialog เท่านั้น

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
        <div class="flex flex-col sm:flex-row justify-center items-stretch gap-8 mt-2">
            <div class="flex justify-center flex-1">
                <div class="card w-full max-w-sm border border-blue-200 rounded-2xl shadow-lg p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-300">
                    <div class="mb-1">
                        <span class="inline-block text-muted-color font-medium mr-2">Receive NO:</span>
                        <span class="inline-block font-semibold">RCV-20240601-001</span>
                    </div>
                    <div>
                        <span class="inline-block text-muted-color font-medium">Receive Date:</span>
                        <span class="inline-block font-semibold ml-2">2024-06-01</span>
                    </div>
                    <div class="mb-1">
                        <span class="block text-muted-color font-medium mb-1">Invoice No:</span>
                        <span class="block font-semibold mb-1">INV-20240601-001</span>
                    </div>
                    <div class="mb-2">
                        <span class="block text-muted-color font-medium mb-1">Special Exp:</span>
                        <span class="block font-semibold">2026-06-01</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center flex-1 sm:justify-start mt-2">
                <div class="card w-full max-w-sm border border-gray-200 rounded-2xl shadow-lg p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-300">
                    <div class="mb-1">
                        <span class="block text-muted-color font-medium mb-1">Vendor Details:</span>
                        <span class="block font-semibold mb-1">ABC Pharma Co., Ltd.</span>
                    </div>
                    <div>
                        <span class="block text-muted-color font-medium mb-1">Contact:</span>
                        <span class="block font-semibold">02-123-4567</span>
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
            <div class="w-full md:w-1/3 md:mr-2">
                <label for="expireDate" class="block text-sm font-medium mb-1">Expire Date</label>
                <input type="date" id="expireDate" v-model="expireDate" class="input p-2 border rounded w-full md:w-60" />
            </div>
        </div>

    <table ref="detailTableRef" class="min-w-full border border-gray-300 mb-6">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2">Select</th>
                    <th class="border px-4 py-2">No</th>
                    <th class="border px-4 py-2">Item No</th>
                    <th class="border px-4 py-2">Item Description</th>
                    <th class="border px-4 py-2">Unit</th>
                    <th class="border px-4 py-2">Lot Expire Date</th>
                    <th class="border px-4 py-2">Invoice Number</th>
                    <th class="border px-4 py-2">Lot Split Status</th>
                    <th class="border px-4 py-2">Lot Status</th>
                    <th class="border px-4 py-2">Active Status</th>
                    <th class="border px-4 py-2">IQA Status</th>
                    <th class="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border px-4 py-2 text-center"><input type="checkbox" /></td>
                    <td class="border px-4 py-2 text-center">1</td>
                    <td class="border px-4 py-2">ITEM-001</td>
                    <td class="border px-4 py-2">Paracetamol 500mg</td>
                    <td class="border px-4 py-2 text-center">Box</td>
                    <td class="border px-4 py-2 text-center">2026-01-31</td>
                    <td class="border px-4 py-2">INV-20250901-001</td>
                    <td class="border px-4 py-2 text-center">
                        <select class="border rounded px-2 py-1 w-full" v-model="lotSplitStatusList[0].value" :class="getLotSplitStatusClass(lotSplitStatusList[0].value)">
                            <option value="Not Specified">Not Specified</option>
                            <option value="Lot Required">Lot Required</option>
                            <option value="No Lot Required">No Lot Required</option>
                        </select>
                    </td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center" :class="getActiveStatusClass('Active')">Active</td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="openEditDialog(0)">Edit</button>
                    </td>

                </tr>
                <tr>
                    <td class="border px-4 py-2 text-center"><input type="checkbox" /></td>
                    <td class="border px-4 py-2 text-center">2</td>
                    <td class="border px-4 py-2">ITEM-002</td>
                    <td class="border px-4 py-2">Amoxicillin 250mg</td>
                    <td class="border px-4 py-2 text-center">Bottle</td>
                    <td class="border px-4 py-2 text-center">2026-03-15</td>
                    <td class="border px-4 py-2">INV-20250902-002</td>
                    <td class="border px-4 py-2 text-center">
                        <select class="border rounded px-2 py-1 w-full" v-model="lotSplitStatusList[2].value" :class="getLotSplitStatusClass(lotSplitStatusList[2].value)">
                            <option value="Not Specified">Not Specified</option>
                            <option value="Lot Required">Lot Required</option>
                            <option value="No Lot Required">No Lot Required</option>
                        </select>
                    </td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center" :class="getActiveStatusClass('Not Active')">Not Active</td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="openEditDialog(1)">Edit</button>
                    </td>
                </tr>

                <tr>
                    <td class="border px-4 py-2 text-center"><input type="checkbox" /></td>
                    <td class="border px-4 py-2 text-center">3</td>
                    <td class="border px-4 py-2">ITEM-003</td>
                    <td class="border px-4 py-2">Amoxicillin 250mg</td>
                    <td class="border px-4 py-2 text-center">Bottle</td>
                    <td class="border px-4 py-2 text-center">2026-03-15</td>
                    <td class="border px-4 py-2">INV-20250902-002</td>
                    <td class="border px-4 py-2 text-center">
                        <select class="border rounded px-2 py-1 w-full" v-model="lotSplitStatusList[1].value" :class="getLotSplitStatusClass(lotSplitStatusList[1].value)">
                            <option value="Not Specified">Not Specified</option>
                            <option value="Lot Required">Lot Required</option>
                            <option value="No Lot Required">No Lot Required</option>
                        </select>
                    </td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center" :class="getActiveStatusClass('Not Active')">Not Active</td>
                    <td class="border px-4 py-2 text-center">N/A</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="openEditDialog(1)">Edit</button>
                    </td>
                </tr>
                
                
            </tbody>
        </table>

        <div class="flex justify-end">
            <ConfirmPopup></ConfirmPopup>
            <Button ref="popup" @click="Success()" icon="pi pi-check" label="Submit to IQA" class="mr-2"></Button>
        </div>
        <!-- Edit Dialog -->
        <div v-if="isDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative">
            <div class="text-lg font-semibold mb-4">Lot Information</div>
            <div class="overflow-x-auto mb-4">
                <table class="min-w-full border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                    <th class="border px-2 py-1">No</th>
                    <th class="border px-2 py-1">Lot No</th>
                    <th class="border px-2 py-1">Qty</th>
                    <th class="border px-2 py-1">UNIT</th>
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
                        <input type="date" class="border rounded px-2 py-1 w-36" v-model="row.expireDate" />
                    </td>
                    <td class="border px-2 py-1 text-center">
                        <button class="text-red-500 hover:text-red-700" title="Delete Row" @click="removeRow(idx)" :disabled="lotRows.length === 1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
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
