import * as cron from "cron"
import * as uuid from "uuid"
import { Strat } from "./sampleStrategies/strat"
import { TroopStore } from "./store/troopStore"
import { Troop } from "./sdk/troop"
import { GameSDK } from "./game-sdk";

const players = [
    { id: uuid(), troops: [], strat: new Strat() },
    { id: uuid(), troops: [], strat: new Strat() }
]
var current = 0;
var next = 1;

(async function go() {
    for (var i = 0; i < 10; i++) {
        players[0].troops.push(new Troop((await TroopStore.createTroop(players[0].id)).id, players[0].id));
        players[1].troops.push(new Troop((await TroopStore.createTroop(players[1].id)).id, players[1].id));
    }
    while (true) {
        try {
            players[current].strat.nextMove(new GameSDK(), players[current].troops, players[next].troops);
        } catch (err) {
            console.log(err);
        }
        var temp = next;
        next = current;
        current = temp;
        console.log("waiting")
        await new Promise<void>((res, rej) => {
            setTimeout(() => {
                res();
            }, 1000);
        });
        console.log("running")
    }

})()


// new cron.CronJob("* * * * *",
//     () => {
//         players[current].strat.nextMove(new GameSDK(), players[current].troops, players[next].troops);
//     },
//     () => {
//         var temp = next;
//         next = current;
//         current = temp;
//     }, true);

