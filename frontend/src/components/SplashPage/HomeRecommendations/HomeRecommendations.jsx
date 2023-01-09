import "./HomeRecommendations.css"
import gardenSign from "../../assets/heroes/gardensign.jpg"
import mushroom from "../../assets/heroes/mushroom.jpg"
import butterflies from "../../assets/heroes/butterflies.jpg"

const HomeRecommendations = () => {

  return (
    <div className="Recommendations">
      <div>
        <div id="Recommendation-Text">
          <h3>Homes from Glade to Glen</h3>
          <p>Sign in to write your next chapter.</p>
          <button>Sign In</button>
        </div>
        <div><img src={mushroom} /></div>
        <div><img src={gardenSign} /></div>
        <div><img src={butterflies} /></div>
      </div>
    </div>
  )
}

export default HomeRecommendations