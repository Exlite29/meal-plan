import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFound } from "../components/NotFound";
import Loader from "../components/Loader";
import Recipe from './$recipesId.lazy'

export const Route = createFileRoute('/$recipesId')({
    loader: async ({ params }) => {
        const { recipesId } = params;
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const recipe = await fetch(`https://dummyjson.com/recipes/${recipesId}`)
            .then((res) => res.json())
            .catch(() => { throw notFound });

        if (!recipe.id) throw notFound;

        return { recipe };
    },
    pendingComponent: Loader,
    notFoundComponent: NotFound,
    component: Recipe,
})