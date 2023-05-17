import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { IDrink, IIngredient } from "@/interfaces/drink.interface";
import { IStore } from "@/interfaces/store.interface";
import Link from "next/link";
import { PieChart } from "react-minimal-pie-chart";
import { getChatData, getIngredients } from "@/util.ts/ingredient";

const Detail = () => {
  const [detail, setDetail] = useState<IDrink>({} as any);
  const [Ingredients, setIngredients] = useState<IIngredient[]>([]);
  const router: any = useRouter();
  const { id } = router.query;
  const drinks: IDrink[] = useSelector((state: IStore) => {
    return state.main.drinks;
  });
  const getDetail = async () => {
    const detailRedux = drinks.find((drink) => {
      return drink.idDrink === id;
    });
    if (detailRedux) {
      setDetail(detailRedux);
      setIngredients(getIngredients(detailRedux));
      return;
    }
    try {
      const result: any = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setDetail(result.data.drinks[0]);
      setIngredients(getIngredients(result.data.drinks[0]));
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetail();
    return () => {};
  }, [id]);
  return (
    <>
      <header className=" w-full text-center text-xl font-bold py-3 border-b-2 border-stone-300 flex justify-between gap-2">
        <Link
          href="/"
          className="text-sky-400 flex items-center gap-1 font-semibold ml-2 cursor-pointer"
        >
          <ChevronLeftIcon className="w-5 h-5" /> Thirsty
        </Link>
        <div>{detail.strDrink}</div>
        <div className="px-10"></div>
      </header>

      <main className="w-full max-w-[500px] mx-auto px-5 pb-5">
        <img
          alt="drink-thumbnail"
          src={detail.strDrinkThumb}
          className="mt-[30px] rounded-full max-w-[200px] aspect-square mx-auto w-[80%]"
        />
        <h1 className="font-bold mt-5 text-center text-xl">
          {detail.strDrink}
        </h1>
        <div className="font-bold mt-[30px] mb-5">Ingredients:</div>
        <div className="flex items-start justify-between gap-5">
          <div>
            {Ingredients.map((ingredient: IIngredient) => {
              return (
                <div className="flex gap-2">
                  <div
                    className="w-5 h-5 flex-none rounded-md mt-0.5"
                    style={{ backgroundColor: ingredient.color }}
                  ></div>
                  {ingredient.strIngredient} {ingredient.strMeasure}
                </div>
              );
            })}
          </div>
          <div className="w-[120px] flex-none">
            <PieChart data={getChatData(Ingredients)} />
          </div>
        </div>
        <div className="mt-[30px]">{detail.strInstructions}</div>
      </main>
    </>
  );
};

export default Detail;
