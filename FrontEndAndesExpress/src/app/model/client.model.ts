export class Client{


    id: number = 0;
    fullName: string = '';
    phone: string = '';
    email: string = '';

    
    constructor() {}

    getClienteId(): number {
        return this.id;
    }

    setClienteId(id: number): void {
        this.id = id;
    }

    getFullName(): string {
        return this.fullName;
    }

    setFullName(fullName: string): void {
        this.fullName = fullName;
    }

    getPhone(): string {
        return this.phone;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

     getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }


}