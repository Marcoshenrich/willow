import "./HomeRecommendations.css"
import { useHistory } from 'react-router-dom';
import gardenSign from "../../../assets/heroes/gardensign.jpg"
import yellowHouse from "../../../assets/heroes/yellowHouse.jpeg"
import leafHome from "../../../assets/heroes/leafHome.jpeg"

const HomeRecommendations = () => {
  const history = useHistory();
  
  const routeChangeListings = () => {
    history.push(`/listings`);
  }


  return (
    <div className="Recommendations">
      <div>
        <div id="Recommendation-Text">
          <h3>Homes from Glade to Glen</h3>
          <p>Let's write your next chapter together.</p>
          <button id="Splash-Page-CTA" onClick={routeChangeListings}>Find the perfect home</button>

        </div>
        <div><img src={gardenSign} /></div>
        <div><img src={leafHome} /></div>
        <div><img src={yellowHouse} /></div>
      </div>
    </div>
  )
}

export default HomeRecommendations