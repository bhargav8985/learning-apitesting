import { test, expect } from "@playwright/test";
test('Create user POST test - dotesthere', async ({ request }) => {
    const requestBody = {
        first_name: "Bhargav",
        last_name: "Reddy",
        email: "bhargav.reddy@test.com"
    };
    const startTime = Date.now();
    const response = await request.post(
        "https://dotesthere.com/api/users",
        {
            headers: {
                "Content-Type": "application/json"
            },
            data: requestBody
        }
    );
    const responseTime = Date.now() - startTime;
    console.log("Response Time:", responseTime);
    const body = await response.json();
    console.log("Response:", body);
    const user = body.data;
    // Status validation
    expect(response.status()).toBe(201);
    // Header validation
    expect(response.headers()['content-type'])
        .toContain('application/json');
    // Body validation
    expect(user.first_name).toBe(requestBody.first_name);
    expect(user.last_name).toBe(requestBody.last_name);
    expect(user.email).toBe(requestBody.email);
    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeDefined();
    // Response OK
    expect(response.ok()).toBeTruthy();
});
