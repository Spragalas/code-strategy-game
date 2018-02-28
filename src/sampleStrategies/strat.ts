import { GameSDK } from "./../game-sdk"
import { Strategy } from "./../sdk/strategy"
import { Troop } from "./../sdk/troop"

export class Strat implements Strategy {
    nextMove(SDK: GameSDK, myTroops: Troop[], enemyTroops: Troop[]): void {
        SDK.Attack(myTroops[0], enemyTroops[0]);
    }
}