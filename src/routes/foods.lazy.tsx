import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/meals';
import Loader from '../components/Loader';
import { useMemo, useState } from 'react';


export const Route = createLazyFileRoute('/foods')({
  component: Foods
})

function Foods() {
  const navigate = useNavigate()
  const { data, error, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Memoize the current page's recipes
  const currentRecipes = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.recipes.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error loading recipes</div>;



  return (
    <div>
      <ul>
        {currentRecipes.map((recipe: { id: number; name: string; image: string }) => (
          <li className='flex flex-col items-center' key={recipe.id}>
            <div className='flex justify-center'>
              <img
                onClick={() => navigate({ from: '/foods', to: '/$foodsId', params: { foodsId: recipe.id.toString() } })}
                src={recipe.image}
                alt={recipe.name}
                className='h-24 w-24 mt-10'
              />
            </div>
            <h1>{recipe.name}</h1>
          </li>
        ))}
      </ul>

      <div className='mt-10 flex justify-end gap-2'>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => (currentRecipes.length === itemsPerPage ? prev + 1 : prev))} disabled={currentRecipes.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>


  )
}