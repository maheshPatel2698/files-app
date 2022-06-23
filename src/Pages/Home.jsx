import React from 'react'
import "../Css/Home.css"
import { useSelector } from 'react-redux'
const Home = () => {
    const { Dark } = useSelector(state => state.darkModeReducer)
    return (
        <div className='Home-Container' style={Dark}>
            <ol>To use This website use Follwing
                <li>First click on Login </li>
                <li>Add your customer and bill data</li>
                <li>See all the data on files app </li>
                <li>To update data go to files and click on pen icon</li>
            </ol>
        </div>
    )
}

export default Home