import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        message: null as string | null,
        type: null as 'success' | 'error' | null
    }),

    actions: {
        show(message: string, type: 'success' | 'error') {
            this.message = message;
            this.type = type;
            setTimeout(() => this.clear(), 3000); // Clear after 3 seconds
        },
        clear() {
            this.message = null;
            this.type = null;
        }
    }
});