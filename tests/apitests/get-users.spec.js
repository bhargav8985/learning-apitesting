const { test, expect } = require('@playwright/test');

test('Validate Users API - Complete Test', async ({ request }) => {

    // Test data
    const pageNumber = 1;
    const limitNumber = 10;

    // Start timer
    const startTime = Date.now();

    // Send request
    const response = await request.get(
        `https://dotesthere.com/api/users?page=${pageNumber}&limit=${limitNumber}`
    );

    // End timer
    const responseTime = Date.now() - startTime;

    console.log("Response Time:", responseTime, "ms");

    // ============================
    // 1. Validate Status Code
    // ============================

    expect(response.status()).toBe(200);

    // ============================
    // 2. Validate Headers
    // ============================

    const headers = response.headers();

    expect(headers['content-type'])
        .toContain('application/json');

    // ============================
    // 3. Validate Response Time
    // ============================

    expect(responseTime).toBeLessThan(5000);

    // ============================
    // 4. Validate Response Body
    // ============================

    const body = await response.json();

    console.log("Response Body:", body);

    expect(body).toBeTruthy();

    // ============================
    // 5. Validate Users List Exists
    // ============================

    const users = body.users || body.data;

    expect(users).toBeDefined();

    expect(Array.isArray(users)).toBeTruthy();

    expect(users.length).toBeGreaterThan(0);

    expect(users.length).toBeLessThanOrEqual(limitNumber);

    // ============================
    // 6. Validate Pagination (if available)
    // ============================

    if (body.page !== undefined)
        expect(body.page).toBe(pageNumber);

    if (body.limit !== undefined)
        expect(body.limit).toBe(limitNumber);

    // ============================
    // 7. Validate First User Fields
    // ============================

    const firstUser = users[0];

    console.log("First User:", firstUser);

    expect(firstUser).toHaveProperty('id');

    // Optional validations (depends on API structure)
    if (firstUser.name !== undefined)
        expect(firstUser.name).toBeTruthy();

    if (firstUser.email !== undefined)
        expect(firstUser.email).toContain('@');

    // ============================
    // 8. Validate Response OK
    // ============================

    expect(response.ok()).toBeTruthy();

});
