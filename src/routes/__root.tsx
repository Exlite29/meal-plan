import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import logo from '../../public/mealplate.svg'
import style from './Routes.module.scss'

const {
    main: mainStyle,
    container: contaierStyle,
    link: linkStyle,
    list: listStyle
} = style

export const Route = createRootRoute({
    component: () => (
        <>
            <div className={mainStyle}>
                <div>
                    <Link to="/" className={`${contaierStyle} [&.active]:font-bold`}>
                        <div className={linkStyle}>
                            <img src={logo} alt='veggies' className='h-20 w-20' />
                        </div>
                        <p className='[&.active]:font-bold'>Meal Plan</p>
                    </Link>
                </div>
                <div className={listStyle}>
                    <Link to="/about" className="[&.active]:font-bold">
                        About
                    </Link>
                    <Link to='/recipes' className="[&.active]:font-bold">
                        Recipes
                    </Link>
                </div>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})
