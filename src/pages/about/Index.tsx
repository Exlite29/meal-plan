import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/about')({
    component: Index
})

function Index() {
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="flex justify-start bg-[#1D4ED8] rounded">
                <h1 className="text-white font-bold text-lg ml-5 mr-5">About My Meal Plan</h1>
            </div>
            <div className="flex justify-center ml-20 mr-20 mb-10">
                <p>Welcome to Ariel's Meal Plan, your go-to solution for effortless meal planning. Our app is designed with one goal in mind: to make healthy, balanced eating accessible and manageable for everyone, regardless of how busy life gets.</p>
            </div>
            <div className="flex justify-start bg-[#1D4ED8] rounded">
                <h1 className="text-white font-bold ml-5 mr-5">
                    Purpose
                </h1>
            </div>
            <div className="flex justify-center ml-20 mr-20 mb-10">
                <p className="font-medium" >
                    We understand that maintaining a nutritious diet can be challenging, especially with the demands of daily life. That's why we created Ariel's Meal Plan—to take the guesswork out of meal planning and empower you to achieve your health goals with ease. Whether you're looking to streamline your grocery shopping, track your nutrition, or simply find new recipes, our app is here to support you every step of the way.

                    With Ariel's Meal Plan, meal planning becomes simple, flexible, and tailored to your unique lifestyle. We believe that eating well shouldn't be complicated, and our app is here to make that a reality.</p>
            </div>
        </div>
    )
}

export default Index