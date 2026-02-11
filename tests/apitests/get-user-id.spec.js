import {test,expect} from "@playwright/test";
test('Testing the get user by id', async ({request}) => {
const id=1;
const startTime = Date.now();
const response = await request.get(`https://dotesthere.com/api/users/${id}`);
const responseTime = Date.now() - startTime;
console.log(responseTime);
//Checking Status
    expect(response.status()).toBe(200);
    //Checking Header
    const headers=response.headers();
    expect(headers['content-type']).toContain('application/json');
    //checking json body
    const body=await response.json();
    expect(body.data['id']).toBe(id);
    expect(body.data['first_name']).toBe('Ankur');
   // data": {
   // "id": 1,
     //   "email": "ankur.automation@dotesthere.com",
        //"first_name": "Ankur",
       // "last_name": "Automation",
        //"avatar": "https://dotesthere.com/img/faces/1-image.jpg"
expect(body.data['last_name']).toBe('Autoamtion');
expect(body.data['email']).toBe('ankur.automation@dotesthere.com');
//Validating the Response OK
    expect(response.ok()).toBeTruthy();
})