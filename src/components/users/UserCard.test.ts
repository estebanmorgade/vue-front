import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UserCard from "./UserCard.vue";

describe("UserCard", () => {
    it("renders user information correctly", async () => {
        const wrapper = mount(UserCard, {
            props: {
                user: {
                    id: 1,
                    name: "John Doe",
                    email: "jeje@jeje.com",
                    role: "admin",
                    password: null
                }
            }
        })

        // Verify user name is displayed
        expect(wrapper.get("h3").text()).toBe("John Doe")

        // Verify user email is displayed
        expect(wrapper.get("p").text()).toBe("jeje@jeje.com")

    })
})