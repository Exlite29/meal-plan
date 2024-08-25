import { createLazyFileRoute } from '@tanstack/react-router'
import Index from '../pages/about/Index'


export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    return <div className="p-2">
        <Index />
    </div>
}
