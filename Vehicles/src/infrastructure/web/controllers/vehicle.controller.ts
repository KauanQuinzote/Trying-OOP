import { Request, Response } from 'express';
import { Car } from '../../../domain/entities/car';
import { Boat } from '../../../domain/entities/boat';
import { Plane } from '../../../domain/entities/plane';

// Em um cenário real, estes dados viriam de um caso de uso que, por sua vez, os pegaria de um banco de dados.
const vehicles = [
    new Car('Volks', 'Polo', 'TSI'),
    new Boat('Triton', 'Triton', '300'),
    new Plane('Airbus', 'A320', 'neo')
];

export class VehicleController {
    
    public listAll(req: Request, res: Response): Response {
        try {
            const vehicleNames = vehicles.map(vehicle => vehicle.getFullName());
            return res.status(200).json(vehicleNames);
        } catch (error: any) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
