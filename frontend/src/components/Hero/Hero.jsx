import "./Hero.css"
import blueMyco from "../assets/heroes/bluemyco.jpg"

const Hero = () => {
    return (
    <>
        <div id="Hero">
            <img src={blueMyco}/>
        <div class="modal">
        <div class="modal-content">
            <button>x</button>
            <input type="text"/>
            <button>LOGin!</button>
        </div>
        </div>
        </div>
    </>
    )
}

export default Hero