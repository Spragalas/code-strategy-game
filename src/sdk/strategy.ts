import {GameSDK} from "./../game-sdk";
import {Troop} from "./../sdk/troop";

export interface Strategy {
    nextMove(SDK: GameSDK, myTroops: Troop[], enemyTroops: Troop[]): void;
}