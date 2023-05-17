import { IDrink } from "@/@interfaces/drink.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drinks: [] as IDrink[],
};

export const slice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDrinks: (state, action) => {
      state.drinks = action.payload;
    },
  },
});

export const { setDrinks } = slice.actions;

export default slice.reducer;
