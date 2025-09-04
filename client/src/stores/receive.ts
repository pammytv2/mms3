import { defineStore } from 'pinia';
import { ref } from 'vue';

// Helper function to get today's date in YYYY-MM-DD format
function getTodayStr() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export const useReceiveStore = defineStore('receive', () => {
    const startDate = ref('');
    const endDate = ref(getTodayStr());

    return {
        startDate,
        endDate
    };
});
