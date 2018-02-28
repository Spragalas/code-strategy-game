import * as t from "./sdk/troop";
import { UserContext } from "./sdk/userContext";
import { Lock, ILock } from "lock"
import * as uuid from "uuid"

const userContexts = {};
const sdks = {};
const lock: ILock = Lock();
const lockKey: string = "SDK_MOVE";


module InternalSDK {
    function registerUser(userContext: UserContext): void {
        userContexts[userContext.id] = false;
    }
}

async function getLockRelease(): Promise<Function> {
    return (await new Promise<Function>((res, rej) => {
        lock(lockKey, (release) => {
            res(release);
        });
    }));
}

export class GameSDK {
    public sdkId: string;
    constructor() {
        this.sdkId = uuid();
        sdks[this.sdkId] = true;
    }
    async MoveFigure(troop: t.Troop, xLoc: number, yLoc: number): Promise<void> {
        var lockRelease: Function = await getLockRelease();

        if (sdks[this.sdkId]) {
            var troopEx: t.TroopEx = new t.TroopEx(troop);
            await troopEx.setXLocation(xLoc);
            await troopEx.setYLocation(yLoc);

            delete sdks[this.sdkId];
        }

        lockRelease();
    }
    async Attack(troop: t.Troop, enemyTroop: t.Troop): Promise<void> {
        var lockRelease: Function = await getLockRelease();

        if (sdks[this.sdkId]) {
            var enemyEx: t.TroopEx = new t.TroopEx(enemyTroop);
            await enemyEx.setHealth((await enemyTroop.getHealth()) - (await troop.getDamage()));
            delete sdks[this.sdkId];
        }
        lockRelease();
    }
    async SkipMove(): Promise<void> {
        var lockRelease: Function = await getLockRelease();
        if (sdks[this.sdkId]) {
            delete sdks[this.sdkId];
        }
        lockRelease();
    }
}