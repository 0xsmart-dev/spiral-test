import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { setDrinks } from "@/store/main.slice";
import { IDrink } from "@/interfaces/drink.interface";
import { IStore } from "@/interfaces/store.interface";
import Link from "next/link";

export default function Home() {
  const [searchIndex, setSearchIndex] = useState<string>("");
  const drinks: IDrink[] = useSelector((state: IStore) => {
    return state.main.drinks;
  });
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const result: any = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
      );
      dispatch(setDrinks(result.data.drinks));
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <>
      <header className="w-full text-center text-xl font-bold py-3 border-b-2 border-stone-300">
        Thirsty
      </header>
      <main className="w-full max-w-[500px] mx-auto">
        <div className="p-2.5 border-b border-stone-300">
          <div className="relative">
            <div className="absolute h-full flex items-center top-0 left-2 text-stone-500">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </div>
            <input
              value={searchIndex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchIndex(e.target.value);
              }}
              className="rounded-xl bg-stone-200/60 outline-none w-full py-2 px-9"
              placeholder="Find a drink"
            ></input>
            {searchIndex && (
              <div
                className="absolute h-full flex items-center top-0 right-2 text-stone-500"
                onClick={() => {
                  setSearchIndex("");
                }}
              >
                <XCircleIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
        <div>
          {drinks
            .filter((drink: IDrink) => {
              return drink.strDrink
                .toLowerCase()
                .includes(searchIndex.toLowerCase());
            })
            .map((drink: IDrink) => {
              return (
                <Link
                  href={`/detail/${drink.idDrink}`}
                  key={drink.idDrink}
                  className="flex items-center p-2.5 border-b border-stone-200"
                >
                  <img
                    alt="drink-thumbnail"
                    src={drink.strDrinkThumb}
                    className="w-10 rounded-full mr-[15px]"
                  ></img>

                  {drink.strDrink}

                  <ChevronRightIcon className="w-4 h-4 ml-auto mr-3 text-stone-400"></ChevronRightIcon>
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
}
