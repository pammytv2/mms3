<script setup lang="ts">
function getActiveStatusClass(status: string) {
    if (status === 'Active') return 'text-green-600 font-semibold';
    if (status === 'Not Active') return 'text-red-600 font-semibold';
    return '';
}
// สำหรับ v-model ของแต่ละ select ในตัวอย่าง
import { reactive, ref, toRefs } from 'vue';

const lotSplitStatusList = reactive([{ value: 'Not Specified' }, { value: 'Not Specified' }]);

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

// Lot rows state for dialog
// Lot rows state for dialog
interface LotRow {
    no: string;
    lotNo: string;
    qty: string;
    unit: string;
    expireDate: string;
}
const lotRows = reactive<LotRow[]>([]);
function openEditDialog(rowIndex: number) {
    dialogRowIndex.value = rowIndex;
    isDialogOpen.value = true;
    // Optional: reset or load lotRows for the selected row
    if (lotRows.length === 0) {
        lotRows.push({ no: '', lotNo: '', qty: '', unit: '', expireDate: '' });
    }
}

function closeEditDialog() {
    isDialogOpen.value = false;
    dialogRowIndex.value = null;
}

function addRow() {
    lotRows.push({ no: '', lotNo: '', qty: '', unit: '', expireDate: '' });
}

function removeRow(index: number) {
    if (lotRows.length > 1) {
        lotRows.splice(index, 1);
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
</script>

<template>
    <div class="card mb-6">
        <div class="text-2xl font-bold mb-4">Receive Material Detail</div>

        <!--    card Detail-->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1 mt-2">
            <div class="flex justify-center">
                <div class="card w-full max-w-xs border border-gray-200 rounded-2xl shadow-lg p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-300">
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

            <div class="flex justify-center">
                <div class="card w-full max-w-xs border border-gray-200 rounded-2xl shadow-lg p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-300">
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

        <table class="min-w-full border border-gray-300 mb-6">
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
            <button class="px-4 py-2 bg-green-500 text-white rounded">Submit to IQA</button>
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
                                    <input type="number" class="border rounded px-2 py-1 w-20" placeholder="Qty" v-model="row.qty" />
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
                    <button class="px-4 py-2 bg-red-500 text-white rounded" @click="closeEditDialog">Cancel</button>
                    <button class="px-4 py-2 bg-green-500 text-white rounded" @click="closeEditDialog">Save</button>
                </div>
                <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" @click="closeEditDialog">&times;</button>
            </div>
        </div>
    </div>
</template>
 
