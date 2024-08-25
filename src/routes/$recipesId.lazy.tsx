
import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute('/$recipesId')({
    component: Recipe,
})

interface RecipeData {
    recipe: {
        id: number;
        name: string;
    };
}

function Recipe() {
    const loaderData = Route.useLoaderData<RecipeData>();

    if (!loaderData) {
        return <div>Loading...</div>;
    }

    const { recipe } = loaderData;

    return (
        <div>
            <h1>{recipe.id} {recipe.name}</h1>
        </div>
    )
}

export default Recipe