export type VehicleType = 'Land' | 'Water' | 'Aerial' | 'Amphibious' | 'Space';

export interface Vehicle { 
    readonly id: string;
    brand: string;
    type: VehicleType;
    name: string;
    model: string;

    getFullName(): string;

    isType(type: VehicleType): boolean;

    lockDoors(): void;
    fastenBelts(): void;
    startEngine(): void;

    move(): void;
}