import { createLazyFileRoute } from '@tanstack/react-router'
import Home from '../pages/home/Home'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {

    return (
        <div className="p-2 mt-4">
            <Home />

        </div>
    )
}
