import { createFileRoute } from '@tanstack/react-router'
import style from './home.module.scss'


const { container: containerStyle } = style

export const Route = createFileRoute('/')({
    component: Home,

})

function Home() {

    return (
        <div className={containerStyle}>
            <div className='text-3xl font-bold underline'>
                this will be home
            </div>
        </div>
    )
}



export default Home;