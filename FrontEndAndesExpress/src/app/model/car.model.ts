import { Client } from "./client.model";

export class Car{

    id: number = 0;
    customerId: number = 0;
    public customer: Client = new Client();
    brand: string = '';
    model: string = '';
    plate: string = '';

    
    constructor() {}

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getIdClient(): number {
        return this.customerId;
    }

    setIdClient(customerId: number): void {
        this.customerId = customerId;
    }

    getBrand(): string {
        return this.brand;
    }

    setBrand(brand: string): void {
        this.brand = brand;
    }

    getModel(): string {
        return this.model;
    }

    setModel(model: string): void {
        this.model = model;
    }

     getPlate(): string {
        return this.plate;
    }

    setPlate(plate: string): void {
        this.plate = plate;
    }


}