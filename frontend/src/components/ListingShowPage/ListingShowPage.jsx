import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import "./ListingShowPage.css"
import ListingShowPageCoreInfo from "./LSPCoreInfo/LSPCoreInfo"
import LSPHighlight from "./LSPHighlight"
import {GiButterflyFlower} from  "react-icons/gi"
import { GiEvilHand } from "react-icons/gi"
import { GiHighGrass } from "react-icons/gi"
import { GiMushroom } from "react-icons/gi"
import { GiFairyWand } from "react-icons/gi"
import { MdDateRange } from "react-icons/md"


const ListingShowPage = () => {
  const dispatch = useDispatch()
  const {listingId} = useParams()
  const listing = useSelector(getListing(listingId))
  
  useEffect(()=>{
    dispatch(fetchListing(listingId))
  }, [listingId])



  return (
    <div className="LSP">
      <div className="LSP-Images">images</div>
      <ListingShowPageCoreInfo listing={listing}/>
      <div id="LSP-Local-Info">Local Info</div>
      <div id="LSP-Description">
        <h2>Description</h2>
        {listing && (<p>{listing.description}</p>)}
      </div>
      <div id="LSP-Highlights">
        <div id="LSP-HLT-Header">Home Highlights</div>
        <div id="LSP-HLT-Container">
            <div>
            <LSPHighlight icon={<GiHighGrass />} category={"Outdoors"} content={"Pristine Glades"} className="LSP-HLT-Icon"  />
              <LSPHighlight icon={<GiButterflyFlower />} category={"Flowers"} content={"Tulips, Daisies"} className="LSP-HLT-Icon" />
            <LSPHighlight icon={<GiMushroom />} category={"Mushrooms"} content={"Amonita"} className="LSP-HLT-Icon" />
            </div>
            <div>
            <LSPHighlight icon={<GiFairyWand />} category={"Blessings"} content={"Glitter"} className="LSP-HLT-Icon" />
            <LSPHighlight icon={<GiEvilHand />} category={"Omens"} content={"Raven's Caw"} className="LSP-HLT-Icon" />
            <LSPHighlight icon={<MdDateRange />} category={"Listed"} content={"21 days ago"} className="LSP-HLT-Icon" />
            </div>
        </div>



      </div>
      <div id="LSP-Details">Details</div>
    </div>
  )
}

export default ListingShowPage