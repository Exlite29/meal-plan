import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchrecipes } from '../services/meals';
import Loader from '../components/Loader';
import { useMemo, useState } from 'react';

export const Route = createLazyFileRoute('/recipes')({
  component: recipes,
});


function recipes() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchrecipes,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const currentrecipes = useMemo(() => {
    if (!data) return [];
    const recipesArray = Array.isArray(data) ? data : data.recipes || [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return recipesArray.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div>
      <ul className="grid grid-cols-5 gap-4">
        {currentrecipes.map((recipe: { id: number; image: string; name: string }) => (
          <li className="flex flex-col items-center" key={recipe.id}>

            <div className="flex justify-center">
              <img
                onClick={() =>
                  navigate({
                    from: '/recipes',
                    to: '/$recipesId',
                    params: { recipesId: recipe.id.toString() },
                  })
                }
                src={recipe.image}
                alt={recipe.name}
                className="h-32 w-32 rounded-md mt-10"
              />
            </div>
            <h1 className="mt-2">{recipe.name}</h1>

          </li>
        ))}
      </ul>


      <div className='mt-10 flex justify-end gap-4'>
        <button className='border rounded bg-[#213a57] text-white pl-2 pr-2' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button className='border rounded bg-[#213a57] text-white pl-2 pr-2' onClick={() => setCurrentPage((prev) => (currentrecipes.length === itemsPerPage ? prev + 1 : prev))} disabled={currentrecipes.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default recipes;
