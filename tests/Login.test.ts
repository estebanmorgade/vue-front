import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../src/views/Login.vue';
import { useUserStore } from '../src/stores/useUserStore';

//mock the router
const routes = [
    { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/adminDashboard', component: { template: '<div>Admin Dashboard</div>' } }
]

describe('Login', () => {
    it('allows user to put credentials and submit', async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes
        })

        const pinia = createTestingPinia({
            createSpy: vi.fn, // use vitest's spy function
            stubActions: false, // allow actions to be called
        })

        const wrapper = mount(Login, {
            global: {
                plugins: [pinia, router],
            }
        });

        const userStore = useUserStore()

        // Find the input fields
        const emailInput = wrapper.find('input[name="email"]')
        const passwordInput = wrapper.find('input[name="password"]')

        // Set the input values
        emailInput.setValue('pepe@papa.com')
        passwordInput.setValue('12345678')

        // verify the input values
        expect(emailInput.element.value).toBe('pepe@papa.com')
        expect(passwordInput.element.value).toBe('12345678')

        // simulate login action
        userStore.login = vi.fn().mockImplementation(async (email, password) => {
            userStore.user = { id: 1, email, role: 'user', name: 'Pepe', password: null };
        })

        // simulate form submission
        const form = wrapper.find('form').trigger('submit.prevent');

        //assertions
        expect(userStore.login).toHaveBeenCalledWith(emailInput.element.value, passwordInput.element.value)

        // wait for router navigation
        await router.isReady();

        expect(router.currentRoute.value.path).toBe('/dashboard');

    })
});

