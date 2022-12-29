import "./Hero.css"
import blueMyco from "../../assets/heroes/bluemyco.jpg"
import { BsSearch } from "react-icons/bs"

const Hero = () => {
    return (
    <>
        <div id="Hero">
            <img src={blueMyco}/>
        </div>
        <div id="Hero-Content">
            <div>Discover Your Fairy Tale</div>
            <div id="Search-Bar">
                <input type="search" placeholder="find your dream home"/>
                <button id="Search-Button">{<BsSearch id="Search-Glass"/>}</button>
            </div>
        </div>
    </>
    )
}

export default Hero