import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import InputForm from './InputForm.vue';

describe('InputForm', () => {
    it('renders input field', async () => {
        const wrapper = mount(InputForm, {
            props: {
                label: 'Username',
                name: 'username',
                modelValue: '',
                type: 'text',
                placeholder: 'Enter text',
                required: true,
            }
    })

    // verify label exists
    expect(wrapper.get('label').text()).toBe('Username *')

    // simulate user input
    const input = wrapper.get('input')
    await input.setValue('Esteban')

    // verify emit update:modelValue event
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Esteban'])

    })
})