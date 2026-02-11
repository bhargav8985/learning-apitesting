import { test, expect } from "@playwright/test";

test('DELETE user test - dotesthere', async ({ request }) => {

    const userId = 1;

    const startTime = Date.now();

    const response = await request.delete(
        `https://dotesthere.com/api/users/${userId}`
    );

    const responseTime = Date.now() - startTime;

    console.log("Status:", response.status());
    console.log("Response Time:", responseTime);

    // Correct validation for DELETE
    expect(response.status()).toBe(204);

    expect(response.ok()).toBeTruthy();

    // Do NOT use response.json()

});
