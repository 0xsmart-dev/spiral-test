import { IIngredient } from "@/interfaces/drink.interface";

const measureValues: { [key: string]: number } = {
  tsp: 1,
  oz: 16,
  cup: 48,
  Cup: 48,
  tblsp: 3,
  spoons: 1,
  cl: 2,
};
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getIngredientValue = (strMeasure: string | null) => {
  if (strMeasure === null) return 0;
  strMeasure = strMeasure.replace(" fresh", "").trim();
  const values = strMeasure.split(" ");

  const measure = values[values.length - 1];
  if (values[values.length - 2] === "of") {
    return 48 * eval(values[values.length - 1]);
  } else {
    if (!Object.keys(measureValues).includes(measure)) return 0;
    let parsedValue = 0;
    for (let i = 0; i < values.length - 1; i++) {
      const element = values[i];
      parsedValue += eval(element);
    }
    return Number(parsedValue) * Number(measureValues[measure]);
  }
};

export const getIngredients = (drinkData: any) => {
  var ingredientArray: IIngredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drinkData[`strIngredient${i}`];
    const measure = drinkData[`strMeasure${i}`];

    if (ingredient !== null) {
      const data: IIngredient = {
        color: getRandomColor(),
        strIngredient: ingredient,
        strMeasure: measure,
      };
      ingredientArray.push(data);
    }
  }
  return ingredientArray;
};

export const getChatData = (ingredientData: IIngredient[]) => {
  const chatData = ingredientData.map((ingredient) => {
    return {
      title: ingredient.strIngredient,
      value: getIngredientValue(ingredient.strMeasure),
      color: ingredient.color,
    };
  });
  return chatData;
};
