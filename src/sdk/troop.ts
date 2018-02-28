import { TroopStore } from "./../store/troopStore";
import { TroopModel } from "./../models/troop"

export class Troop {
    public id: string;
    public userId: string;
    constructor (id, userId) {
        this.id = id;
        this.userId = userId;
    }
    async getXLocation(): Promise<number> {
        return (await TroopStore.getTroop(this.id, this.userId)).xLoc;
    }
    async getYLocation(): Promise<number> {
        return (await TroopStore.getTroop(this.id, this.userId)).yLoc;
    }
    async getSpeed(): Promise<number> {
        return (await TroopStore.getTroop(this.id, this.userId)).speed;
    }
    async getDamage(): Promise<number> {
        return (await TroopStore.getTroop(this.id, this.userId)).damage;
    }
    async getHealth(): Promise<number> {
        return (await TroopStore.getTroop(this.id, this.userId)).health;
    }
}

export class TroopEx {
    public base: Troop;
    constructor (base: Troop) {
        this.base = base;
    }
    async setXLocation(xLoc: number): Promise<number> {
        var troop: TroopModel = await TroopStore.getTroop(this.base.id, this.base.userId);
        troop.xLoc = xLoc;
        await TroopStore.updateTroop(troop, this.base.userId);
        return xLoc;
    }
    async setYLocation(yLoc: number): Promise<number> {
        var troop: TroopModel = await TroopStore.getTroop(this.base.id, this.base.userId);
        troop.yLoc = yLoc;
        await TroopStore.updateTroop(troop, this.base.userId);
        return yLoc;
    }
    async setSpeed(speed: number): Promise<number> {
        var troop: TroopModel = await TroopStore.getTroop(this.base.id, this.base.userId);
        troop.speed = speed;
        await TroopStore.updateTroop(troop, this.base.userId);
        return speed;
    }
    async setDamage(damage: number): Promise<number> {
        var troop: TroopModel = await TroopStore.getTroop(this.base.id, this.base.userId);
        troop.xLoc = damage;
        await TroopStore.updateTroop(troop, this.base.userId);
        return damage;
    }
    async setHealth(health: number): Promise<number> {
        var troop: TroopModel = await TroopStore.getTroop(this.base.id, this.base.userId);
        troop.health = health;
        await TroopStore.updateTroop(troop, this.base.userId);
        return health;
    }
}