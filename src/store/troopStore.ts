import { TroopModel } from "./../models/troop"
import * as uuid from "uuid"
import * as fs from "fs";

export module TroopStore {
    export async function createTroop(userId: string): Promise<TroopModel> {
        var id: string = uuid();
        var troop: TroopModel = {
            userId: userId,
            id: id,
            xLoc: 0,
            yLoc: 0,
            damage: 10,
            health: 100,
            speed: 5
        };

        await updateTroop(troop, userId);
        return troop;
    }
    export async function getAllTroops(userId: string): Promise<TroopModel[]> {
        var troopPaths: string[] = await fsreaddir((await getPathToUser(userId)));
        var troops: TroopModel[] = [];
        var promises: Promise<TroopModel>[] = [];
        for (var i = 0; troopPaths.length < i; i++)
            promises.push(new Promise<TroopModel>((res, rej) => {
                res(JSON.parse(fs.readFileSync(troopPaths[i]).toString()));
            }));
        return (await Promise.all(promises));
    }
    export async function getTroop(id: string, userId: string): Promise<TroopModel> {
        var troopRaw: string = (await fsreadFile((await getPathToTroop(userId, id)))).toString();
        return JSON.parse(troopRaw);
    }
    export async function updateTroop(troop: TroopModel, userId: string): Promise<void> {
        await fswriteFile((await getPathToTroop(userId, troop.id)), JSON.stringify(troop));
    }
    async function getPathToTroop(userId: string, id: string): Promise<string> {
        return (await getPathToUser(userId)) + id + ".json";
    }
    async function getPathToUser(userId: string): Promise<string> {
        var path = "./data/" + userId + "/";
        if (! await fsexists("./data/")) {
            await fsmkdir("./data/");
        }
        if (! await fsexists(path)) {
            await fsmkdir(path);
        }
        return path;
    }
}
async function fsexists(path: fs.PathLike): Promise<boolean> {
    return await new Promise<boolean>((res, rej) => {
        fs.exists(path, (exists) => {
            res(exists);
        })
    });
}
async function fsmkdir(path: fs.PathLike): Promise<void> {
    await new Promise<void>((res, rej) => {
        fs.mkdir(path, (err) => {
            if (err) rej(err);
            res();
        });
    });
}
async function fswriteFile(path: fs.PathLike, data: any): Promise<void> {
    await new Promise<void>((res, rej) => {
        fs.writeFile(path, data, (err) => {
            if (err) rej(err);
            res();
        })
    });
}
async function fsreadFile(path: fs.PathLike): Promise<Buffer> {
    return await new Promise<Buffer>((res, rej) => {
        fs.readFile(path, (err, data) => {
            if (err) rej(err);
            res(data);
        })
    });
}
async function fsreaddir(path: fs.PathLike): Promise<string[]> {
    return await new Promise<string[]>((res, rej) => {
        fs.readdir(path, (err, files) => {
            if (err) rej(err);
            res(files);
        })
    });
}