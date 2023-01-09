import "./SplashPage.css"
import Hero from "./Hero/Hero"
import HomeRecommendations from "./HomeRecommendations"
import footer from "../assets/footer.webp"

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
      <div id="Splash-Page-Footer-Info">
        <div>Willow Group is committed to ensuring accessibility to the mortal realm for all fae. We are continuously working to improve the accessibility of our kind's experience for everyone, and we welcome feedback and accommodation requests. If you wish to report an issue or seek an accommodation, please let us know.</div>
        <div>Willow, Inc. holds real estate brokerage licenses in multiple realms. Willow (Fae Realm), Inc. holds real estate brokerage licenses in multiple faedoms.</div>
        <div>My Info Here</div>
      </div>
      <div id="Splash-Page-Footer-Image">
        <img src={footer} />
      </div>
    </>
  )
}

export default SplashPage