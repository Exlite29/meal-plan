
import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute('/$foodsId')({
    component: Recipe,
})

interface RecipeData {
    recipe: {
        id: number;
        name: string;
        image: string;
        ingredients: string[];
        instructions: string[]
    };
}

function Recipe() {
    const loaderData = Route.useLoaderData<RecipeData>();

    if (!loaderData) {
        return <div>Loading...</div>;
    }

    const { recipe } = loaderData;

    return (
        <>
            <h1 className="flex justify-center mt-10 mb-2 font-bold">{recipe.name}</h1>
            <div className="flex h-screen justify-center mt-20 gap-10">


                <img className="h-1/2 left-0" src={recipe.image} alt={recipe.name} />

                <div className="gap-8">
                    <div>
                        <span className="mt-2">Ingredients:</span>
                        <ul className="mt-2 list-disc list-inside">
                            {recipe.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <span className="mt-4">Intructions:</span>
                        <ul className="mt-2 list-disc list-inside">
                            {recipe.instructions.map((items, i) => (
                                <li key={i}>{items}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipe