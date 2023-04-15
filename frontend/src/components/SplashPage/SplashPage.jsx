import "./SplashPage.css"
import Hero from "./Hero/Hero"
import HomeRecommendations from "./HomeRecommendations"
import footer from "../../assets/footer.webp"
const SplashPage = () => {

  return (
    <>
      <Hero/>
      <HomeRecommendations />
      <div id="Splash-Page-Footer-Info">
        <div>Willow Group is committed to ensuring accessibility to the mortal realm for all fae. We are continuously working to improve accessibility for everyone, and we welcome feedback and accommodation requests. If you wish to report an issue or seek an accommodation, please let us know.</div>
        <div>Willow, Inc. holds real estate brokerage licenses in multiple realms. Willow (Fae Realm), Inc. holds real estate brokerage licenses in multiple faedoms.</div>
        <div>Created by Marcos Henrich, in honor of all the mortals trapped in the fae realm and all the fairies trapped in the mortal realm.</div>
      </div>
      <div id="Splash-Page-Footer-Image">
        <img src={footer} />
      </div>
    </>
  )
}

export default SplashPage