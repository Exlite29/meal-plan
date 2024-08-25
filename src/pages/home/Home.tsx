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

function Home() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });

    const [randomRecipe, setRandomRecipe] = useState<any>(null);

    useEffect(() => {
        const RANDOM_RECIPE_KEY = 'randomRecipe';
        const LAST_UPDATED_KEY = 'lastUpdated';
        const currentTimestamp = Date.now();

        const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
        const storedRecipe = localStorage.getItem(RANDOM_RECIPE_KEY);

        if (storedRecipe && lastUpdated && currentTimestamp - Number(lastUpdated) < 24 * 60 * 60 * 1000) {
            setRandomRecipe(JSON.parse(storedRecipe));
        } else {
            if (data?.recipes?.length) {
                const newRecipe = data.recipes[Math.floor(Math.random() * data.recipes.length)];
                localStorage.setItem(RANDOM_RECIPE_KEY, JSON.stringify(newRecipe));
                localStorage.setItem(LAST_UPDATED_KEY, currentTimestamp.toString());
                setRandomRecipe(newRecipe);
            }
        }
    }, [data]);

    if (isLoading) return <div><Loader /></div>;
    if (error) return <div className='flex h-screen justify-center'>Error loading recipes</div>;

    return (
        <div className={`${containerStyle} flex flex-col`}>
            <div>You're meal for today</div>
            {randomRecipe ? (
                <div>
                    <img
                        onClick={() => navigate({ to: "/$recipesId", params: { recipesId: randomRecipe.id } })}
                        className='h-24 w-24'
                        src={randomRecipe.image}
                        alt={randomRecipe.name}
                    />
                    <p>{randomRecipe.name}</p>
                </div>
            ) : (
                <p>No recipes available</p>
            )}
        </div>
    );
}

export default Home;
