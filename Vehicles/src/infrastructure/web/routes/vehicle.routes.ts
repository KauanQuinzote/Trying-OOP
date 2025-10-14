import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const vehicleRoutes = Router();
const controller = new VehicleController();

vehicleRoutes.get('/vehicles', controller.listAll);

export default vehicleRoutes;
