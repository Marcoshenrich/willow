import "./SplashPage.css"
import Hero from "./Hero/Hero"
import HomeRecommendations from "./HomeRecommendations"

const SplashPage = () => {

  return (
    <>
      <Hero/>
      <HomeRecommendations />
      <div id="Font-Test">
        <div>
          <span className="LargeS LargeW">Large Large</span>
          <span className="LargeS MedW">Large Med</span>
          <span className="LargeS SmlW">Large Small</span>
        </div>
        <div>
          <span className="StandS LargeW">Standard Large</span>
          <span className="StandS MedW">Standard Med</span>
          <span className="StandS SmlW">Standard Small</span>
        </div>
        <div>
          <span className="MedS LargeW">Med Large</span>
          <span className="MedS MedW">Med Med</span>
          <span className="MedS SmlW">Med Small</span>
        </div>
        <div>
          <span className="SmlS LargeW">Small Large</span>
          <span className="SmlS MedW">Small Med</span>
          <span className="SmlS SmlW">Small Small</span>
        </div>
      </div>
      <div id="space"></div>
    </>
  )
}

export default SplashPage