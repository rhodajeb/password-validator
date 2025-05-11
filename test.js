
const password=require(`./index,js`)

describe("Password Validation Tests",()=>{
    test("should validate password rules correctly",()=>{
        expect(password("Abcd1234")).toBe(true);
        expect(password("Abcd123")).toBe(true);
        expect(password("abcd1234")).toBe(true);
        expect(password("AbcdefGhijKlmnopQRsTuvwxyZ1234567890")).toBe(true);
        expect(password("ABCD1234")).toBe(true);
        expect(password("Ab1!@#$%^&*()-_+={}[]|\\:;?/>.<,")).toBe(true);
        expect(password("!@#$%^&*()-_+={}[]|\\:;?/>.<,")).toBe(true);
    });
    