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

const allReceiveList = ref<any[]>([]);


const searchQuery = ref('');

const startDate = ref('');
const endDate = ref('');

// กำหนด endDate เป็นวันปัจจุบัน
function getTodayStr() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
endDate.value = getTodayStr();

// กรองข้อมูลตาม searchQuery
import { computed } from 'vue';
const filteredReceiveList = computed(() => {
    let list = allReceiveList.value;
    // filter by searchQuery
    if (searchQuery.value) {
        const q = searchQuery.value.trim().toLowerCase();
        list = list.filter(item => {
            const receive = item.receiveNumber.toLowerCase();
            const invoice = item.invoiceNumber.toLowerCase();
            // ค้นหาทั้งแบบ contains และ startsWith
            return (
                receive.includes(q) ||
                invoice.includes(q) ||
                receive.startsWith(q) ||
                invoice.startsWith(q)
            );
        });
    }
    // filter by date range
    if (startDate.value) {
        list = list.filter(item => item.receiveDate >= startDate.value.replace(/-/g, ''));
    }
    if (endDate.value) {
        list = list.filter(item => item.receiveDate <= endDate.value.replace(/-/g, ''));
    }
    return list;
});

function onSearch() {
    // ไม่ต้องทำอะไร เพราะ filteredReceiveList จะอัปเดตอัตโนมัติ
}

function onDateSearch() {
    // ไม่ต้องทำอะไร เพราะ filteredReceiveList จะอัปเดตอัตโนมัติ
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
            items: [
                { no: 1, itemNo: 'ITEM-003', desc: 'Ibuprofen 200mg', unit: 'Box', lotExpireDate: '2026-05-10', invoiceNumber: 'INV-20250902-002', lotSplitStatus: 'Lot Required', lotStatus: 'N/A', activeStatus: 'Active', iqaStatus: 'N/A' }
            ]
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
            <label for="search" class="font-medium mb-1">Receive or Invoice Number</label>
            <div class="flex flex-col md:flex-row md:items-end gap-4">
                <input id="search" v-model="searchQuery" type="text" placeholder="Enter number" class="p-2 border rounded md:w-48" />
                <button type="button" class="px-4 py-2 bg-blue-500 text-white rounded" @click="onSearch">Search</button>

                <div class="flex gap-4 ml-60">
                    <input id="startDate" v-model="startDate" type="date" class="p-2 border rounded md:w-40" />
                    <input id="endDate" v-model="endDate" type="date" class="p-2 border rounded md:w-40" />
                    
                    
                    <button type="button" class="px-4 py-2 bg-green-500 text-white rounded h-fit md:mb-0 mt-0" @click="onDateSearch"> Sync Date</button>
                </div>
<!-- 
                <div class="flex gap-4 ml-1">
                    <button type="button" class="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded h-fit md:mb-0 mt-0 flex items-center gap-2" @click="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Sync Receive
                    </button>
                </div> -->
            </div>
        </form>
    </div>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Receive Material List</div>
        <!-- ตารางแสดงผลลัพธ์การค้นหา -->
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
                <tr v-for="item in filteredReceiveList" :key="item.receiveNumber" class="cursor-pointer hover:bg-blue-100" @click="handleRowClick(item.receiveNumber)">
                    <td class="border px-4 py-2">{{ item.receiveNumber }}</td>
                    <td class="border px-4 py-2">{{ item.receiveDate }}</td>
                    <td class="border px-4 py-2">{{ item.invoiceNumber }}</td>
                    <td class="border px-4 py-2">{{ item.vendorCode }}</td>
                    <td class="border px-4 py-2">{{ item.vendorName }}</td>
                </tr>
                <tr v-if="filteredReceiveList.length === 0">
                    <td colspan="5" class="text-center py-4">No data found</td>
                </tr>
            </tbody>
        </table>
    </div>  
</template>
