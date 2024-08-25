import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/')({
    loader: async () => {
        const recipes = await (
            await fetch('https://dummyjson.com/recipes')
        ).json()

        return recipes
    },
})


// const newLocal = fetch('https://dummyjson.com/recipes')
//     .then(res => res.json())
//     .then(console.log);