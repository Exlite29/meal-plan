import { createFileRoute } from '@tanstack/react-router'
import style from './home.module.scss'
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../../services/meals';
import Loader from '../../components/Loader';
import { useMemo } from 'react';


const { container: containerStyle } = style

export const Route = createFileRoute('/')({
    component: Home,

})

function Home() {

    const { data, error, isLoading } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });

    const items = useMemo(() => {
        if (!data) return []

        return data
    }, [data])

    if (isLoading) return <div><Loader /></div>;
    if (error) return <div>Error loading recipes</div>;

    return (
        <div className={containerStyle}>
            <div className='text-3xl font-bold underline'>
                this will be home
            </div>
            {items.map((recipe: { id: number; name: string; image: string }) => (
                <div>
                    <img src={recipe.image} alt={recipe.name} />
                </div>
            ))}
        </div>
    )
}



export default Home;