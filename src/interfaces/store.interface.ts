import { IDrink } from "./drink.interface";

export interface IStore {
  main: {
    drinks: IDrink[];
  };
}
