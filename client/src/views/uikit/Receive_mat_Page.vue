<script lang="ts" setup>
import { NodeService } from '@/service/NodeService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function handleRowClick(receiveNumber: string) {
    // ตัวอย่าง: ไปหน้า /receive-detail/:receiveNumber
    router.push({ name: 'Receive_Detail', params: { receiveNumber } });
}
const treeValue = ref<any[]>([]);

const treeTableValue = ref<any[]>([]);

// Add searchQuery and onSearch
const searchQuery = ref('');
const startDate = ref('');
const endDate = ref('');

function onSearch() {
    // Implement your search logic here
    console.log('Searching for:', searchQuery.value);
}

function onDateSearch() {
    // Implement your date search logic here
    console.log('Searching from', startDate.value, 'to', endDate.value);
}

onMounted(() => {
    treeValue.value = NodeService.getTreeNodesData();
    // ตัวอย่างข้อมูลสำหรับตาราง
    treeTableValue.value = [
        {
            key: '0',
            data: {
                receiveNumber: 'RCV-20250901-001',
                receiveDate: '2025-09-01',
                invoiceNumber: 'INV-20250901-001',
                supplier: 'ABC Supply Co.',
                status: 'Completed'
            },
            children: [
                {
                    key: '0-0',
                    data: {
                        receiveNumber: 'RCV-20250901-001-1',
                        receiveDate: '2025-09-01',
                        invoiceNumber: 'INV-20250901-001',
                        supplier: 'ABC Supply Co.',
                        status: 'Completed'
                    }
                }
            ]
        },
        {
            key: '1',
            data: {
                receiveNumber: 'RCV-20250902-002',
                receiveDate: '2025-09-02',
                invoiceNumber: 'INV-20250902-002',
                supplier: 'XYZ Trading',
                status: 'Pending'
            }
        }
    ];
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Receive Material</div>
        <form class="mb-4 flex flex-col gap-4">
            <label for="search" class="font-medium mb-1">Receive or Invoice Number</label>
            <div class="flex flex-col md:flex-row md:items-end gap-4">
                <input id="search" v-model="searchQuery" type="text" placeholder="Enter number" class="p-2 border rounded md:w-48" />
                <button type="button" class="px-4 py-2 bg-blue-500 text-white rounded" @click="onSearch">Search</button>

                <div class="flex gap-4 ml-60">
                    <input id="startDate" v-model="startDate" type="date" class="p-2 border rounded md:w-40" />
                    <input id="endDate" v-model="endDate" type="date" class="p-2 border rounded md:w-40" />
                    
                    
                    <button type="button" class="px-4 py-2 bg-green-500 text-white rounded h-fit md:mb-0 mt-0" @click="onDateSearch"> Search by Date</button>
                </div>

                <div class="flex gap-4 ml-1">
                    <button type="button" class="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded h-fit md:mb-0 mt-0 flex items-center gap-2" @click="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Sync Receive
                    </button>
                </div>
            </div>
        </form>
    </div>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Receive Material List</div>
        <!-- ตารางตัวอย่างแบบ HTML ธรรมดา -->
        <table class="min-w-full border border-gray-300 mb-6">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2">Receive Number</th>
                    <th class="border px-4 py-2">Receive Date</th>
                    <th class="border px-4 py-2">Invoice Number</th>
                    <th class="border px-4 py-2">Vendor Code</th>
                    <th class="border px-4 py-2">Vendor Name</th>
                </tr>
            </thead>
            <tbody>
                <tr class="cursor-pointer hover:bg-blue-100" @click="handleRowClick('RCV-20250901-001')">
                    <td class="border px-4 py-2">RCV-20250901-001</td>
                    <td class="border px-4 py-2">2025-09-01</td>
                    <td class="border px-4 py-2">INV-20250901-001</td>
                    <td class="border px-4 py-2">ABC Supply Co.</td>
                    <td class="border px-4 py-2">ABC123</td>
                </tr>
                <tr class="cursor-pointer hover:bg-blue-100" @click="handleRowClick('RCV-20250902-002')">
                    <td class="border px-4 py-2">RCV-20250902-002</td>
                    <td class="border px-4 py-2">2025-09-02</td>
                    <td class="border px-4 py-2">INV-20250902-002</td>
                    <td class="border px-4 py-2">XYZ123</td>
                    <td class="border px-4 py-2">XYZ Trading</td>
                </tr>
            </tbody>
        </table>
    </div>  
</template>
