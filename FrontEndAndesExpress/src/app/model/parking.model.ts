import { Car } from "./car.model";

export class Parking{

    id: number = 0;
    parkingLotId: number = 0;
    carId : number = 0;
    public car: Car = new Car();/*
    brand: string = '';
    model: string = '';
    plate: string = '';*/

    
    constructor() {}

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getParkingLotId(): number {
        return this.parkingLotId;
    }

    setParkingLotId(parkingLotId: number): void {
        this.parkingLotId = parkingLotId;
    }

    getIdCar(): number {
        return this.carId;
    }

    setIdCar(carId: number): void {
        this.carId = carId;
    }

    /*getBrand(): string {
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
    }*/


}