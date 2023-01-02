import ListingShowPage from "../ListingShowPage"
import "./ListingsIndex.css"
import { Link } from "react-router-dom"
import Map from "../Map"

const ListingsIndex = () => {

  return (
    <>
    <div className="Listings-Index">
        <div id="Listings-Search-Bar">Listings Search Bar</div>
      <div className="Listings-Panels">
          <div id="Listings-Map">
            <Map/>
          </div>
          <div className="Listings-Nav">
            <div id="Listings-Header">Listings Header</div>
            <div id="Listings-Container">Listings Container
            </div>
          </div>
      </div>
    </div> 
    </>
  )
}

export default ListingsIndex