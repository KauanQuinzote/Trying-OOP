import express from 'express';
import { Car } from '../domain/entities/car';
import { Plane } from '../domain/entities/plane';
import { Boat } from '../domain/entities/boat';
import { Vehicle } from '../interfaces/vehicles';


function simulateVehicle(vehicle: Vehicle) {

    console.log(`\nSimulando veículo: ${vehicle.getFullName()}`);
    vehicle.lockDoors();
    vehicle.fastenBelts();
    vehicle.startEngine();
    vehicle.move();
}

const car = new Car('Toyota', 'Corolla', '2020');
const plane = new Plane('Boeing', '747', '2015');
const boat = new Boat('Yamaha', '242X', '2018');

simulateVehicle(car);
simulateVehicle(plane);
simulateVehicle(boat);
