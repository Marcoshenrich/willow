import "./HomeRecommendations.css"
import gardenSign from "../../../assets/heroes/gardensign.jpg"
import mushroom from "../../../assets/heroes/mushroom.jpg"
import butterflies from "../../../assets/heroes/butterflies.jpg"

const HomeRecommendations = () => {

  return (
    <div className="Recommendations">
      <div>
        <div id="Recommendation-Text">
          <h3>Homes from Glade to Glen</h3>
          <p>Let's write your next chapter together.</p>
        </div>
        <div><img src={mushroom} /></div>
        <div><img src={gardenSign} /></div>
        <div><img src={butterflies} /></div>
      </div>
    </div>
  )
}

export default HomeRecommendations