import { createFileRoute, useNavigate } from '@tanstack/react-router';
import style from './home.module.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../../services/meals';
import Loader from '../../components/Loader';
import { useEffect, useState } from 'react';

const { container: containerStyle } = style;

export const Route = createFileRoute('/')({
    component: Home,
});

interface Meal {
    id: string;
    image: string;
    name: string;
}

interface Meals {
    morning: Meal | null;
    lunch: Meal | null;
    dinner: Meal | null;
}

function Home() {
    const navigate = useNavigate();




    const { data, error, isLoading } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });

    const [meals, setMeals] = useState<Meals>({
        morning: null,
        lunch: null,
        dinner: null,
    });

    const MEAL_KEYS = ['morning', 'lunch', 'dinner'] as const;
    const LAST_UPDATED_KEY = 'lastUpdated';
    const currentTimestamp = Date.now();

    const loadMealsFromLocalStorage = () => {
        return MEAL_KEYS.reduce((acc, key) => {
            const meal = localStorage.getItem(key);
            if (meal) acc[key] = JSON.parse(meal);
            return acc;
        }, {} as Meals);
    };

    const storeMealsInLocalStorage = (meals: Meals) => {
        MEAL_KEYS.forEach(key => {
            localStorage.setItem(key, JSON.stringify(meals[key]));
        });
        localStorage.setItem(LAST_UPDATED_KEY, currentTimestamp.toString());
    };

    useEffect(() => {
        const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
        const storedMeals = loadMealsFromLocalStorage();

        if (
            Object.keys(storedMeals).length === MEAL_KEYS.length &&
            lastUpdated &&
            currentTimestamp - Number(lastUpdated) < 24 * 60 * 60 * 1000
        ) {
            setMeals(storedMeals);
        } else if (data?.recipes?.length) {
            const newMeals = MEAL_KEYS.reduce((acc, key) => {
                const randomIndex = Math.floor(Math.random() * data.recipes.length);
                acc[key] = data.recipes[randomIndex];
                return acc;
            }, {} as Meals);

            storeMealsInLocalStorage(newMeals);
            setMeals(newMeals);
        }
    }, [data]);

    if (isLoading) return <Loader />;
    if (error) return <div className='flex h-screen justify-center'>Error loading recipes</div>;

    return (
        <div className={`${containerStyle} flex flex-col justify-center items-center`}>
            <h1 className='font-medium text-black text-5xl'>Welcome to my meal plan</h1>
            <div className='mt-4'>
                <p>Your meals for today</p>
            </div>
            {meals.morning && meals.lunch && meals.dinner ? (
                <>
                    {MEAL_KEYS.map(mealType => {
                        const meal = meals[mealType];
                        return meal && (
                            <div key={mealType}>
                                <h2 className='grid grid-cols-1 justify-center font-medium text-black text-3xl'>{mealType}</h2>
                                <img
                                    onClick={() => navigate({ to: "/$foodsId", params: { foodsId: meal.id } })}
                                    className='h-24 w-24 '
                                    src={meal.image}
                                    alt={meal.name}
                                />
                                <p>{meal.name}</p>
                            </div>
                        );
                    })}
                </>
            ) : (
                <p>No recipes available</p>
            )}
            {/* {pinoyItems.map((items, i) => (
                <div key={i}>
                    
            </div>
        ))} */}

        </div>
    );
}

export default Home;
