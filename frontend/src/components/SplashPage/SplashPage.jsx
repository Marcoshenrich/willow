import "./SplashPage.css"
import Hero from "./Hero/Hero"
import HomeRecommendations from "./HomeRecommendations"
import footer from "../assets/footer.webp"
const SplashPage = () => {

  return (
    <>
      <Hero/>
      <HomeRecommendations />
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