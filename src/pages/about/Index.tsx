import { createFileRoute } from "@tanstack/react-router"
import style from './index.module.scss'


const {
    container: containerStyle
} = style

export const Route = createFileRoute('/about')({
    component: Index
})

function Index() {
    return (
        <div className={containerStyle}>
            <h1 className=" font-bold text-lg">About Our Meal Plan App</h1>

            <p>Welcome to Ariel's Meal Plan, your go-to solution for effortless meal planning. Our app is designed with one goal in mind: to make healthy, balanced eating accessible and manageable for everyone, regardless of how busy life gets.</p>

            <h1>
                Our Purpose
            </h1>

            <p>
                We understand that maintaining a nutritious diet can be challenging, especially with the demands of daily life. That's why we created Ariel's Meal Plan—to take the guesswork out of meal planning and empower you to achieve your health goals with ease. Whether you're looking to streamline your grocery shopping, track your nutrition, or simply find new recipes, our app is here to support you every step of the way.

                With Ariel's Meal Plan, meal planning becomes simple, flexible, and tailored to your unique lifestyle. We believe that eating well shouldn't be complicated, and our app is here to make that a reality.</p>
        </div>
    )
}

export default Index