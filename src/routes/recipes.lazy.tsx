import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/meals';
import Loader from '../components/Loader';


export const Route = createLazyFileRoute('/recipes')({
  component: Recipes
})

function Recipes() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div>
      <ul>
        {data.recipes.map((recipe: { id: number; name: string; instructions: string, image: string }) => (
          <li key={recipe.id}>
            <img src={recipe.image} alt={recipe.name} />
            <h1>{recipe.name}</h1>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>


  )
}