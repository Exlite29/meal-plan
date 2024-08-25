import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFound } from "../components/NotFound";
import Loader from "../components/Loader";
import Recipe from "./$foodsId.lazy";

export const Route = createFileRoute('/$foodsId')({
    loader: async ({ params }) => {
        const { foodsId } = params;
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const recipe = await fetch(`https://dummyjson.com/recipes/${foodsId}`)
            .then((res) => res.json())
            .catch(() => { throw notFound });

        if (!recipe.id) throw notFound;

        return { recipe };
    },
    pendingComponent: Loader,
    notFoundComponent: NotFound,
    component: Recipe,
})