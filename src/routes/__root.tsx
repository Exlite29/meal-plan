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
                <div className='mt-8 text-lg'>
                    <Link to="/" className={`${contaierStyle} [&.active]:font-bold text-white`}>
                        <div className='h-20 w-20 '>
                            <img src={logo} alt='veggies' />
                        </div>
                        Meal Plan
                    </Link>
                </div>
                <div className={listStyle}>
                    <Link to="/about" className="[&.active]:font-bold text-white">
                        About
                    </Link>
                    <Link to='/foods' className="[&.active]:font-bold text-white">
                        foods
                    </Link>
                </div>
            </div>
            <hr />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
})
