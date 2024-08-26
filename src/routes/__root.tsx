import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import logo from '../../public/mealplate.svg'
import style from './Routes.module.scss'

const {
    main: mainStyle,
    container: contaierStyle,
    list: listStyle
} = style

export const Route = createRootRoute({
    component: () => (
        <>
            <div className={`${mainStyle}`}>
                <div className='mt-10 text-lg'>
                    <Link to="/" className={`${contaierStyle} [&.active]:font-bold text-white`}>
                        <div className='h-20 w-20 '>
                            <img src={logo} alt='veggies' />
                        </div>
                        Meal Plan
                    </Link>
                </div>
                <div className={listStyle}>
                    <Link to="/about" className="[&.active]:font-bold text-white pt-3">
                        About
                    </Link>
                    <Link to='/recipes' className="[&.active]:font-bold text-white pt-3">
                        recipes
                    </Link>

                    <div className='flex flex-col'>
                        <button className='border bg-[#0b6477] hover:bg-[#14919B] rounded-md text-white  p-2'>
                            Create an Account
                        </button>
                        <span className='text-white font-light text-sm text-center mt-1 hover:underline'>Plan your own meal!</span>
                    </div>
                </div>
            </div>
            <hr />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
})
