import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import LSPDetails from "./LSPDetails"
import LSPImages from "./LSPImages"
import LSPAppointmentsManager from "./LSPAppointmentsManager"
import LSPReviews from "./LSPReviews"



const ListingShowPage = ({listing}) => {
  const dispatch = useDispatch()
  const [showAppointmentsManager, setShowAppointmentsManager] = useState(false)
  
  useEffect(()=>{
    dispatch(fetchListing(listing.id))
  }, [listing.id])



  return (
    <div className="LSP">
      <LSPImages imageUrls={listing.imageUrls}/>
      <ListingShowPageCoreInfo listing={listing} showAppointmentsManager={showAppointmentsManager} setShowAppointmentsManager={setShowAppointmentsManager} />
      {showAppointmentsManager && (< LSPAppointmentsManager listing={listing} />)}
      <div id="LSP-Local-Info">Local Info</div>
      <div id="LSP-Description">
        <div>
          <h2>Description</h2>
          {listing && (<p>{listing.description}</p>)}
        </div>
      </div>
      <div id="LSP-Highlights">
        <div id="LSP-HLT-Header">Home Highlights</div>
        <div id="LSP-HLT-Container">
            <div>
            {listing && (<LSPHighlight icon={<GiHighGrass />} category={"Outdoors"} content={listing.outdoors} className="LSP-HLT-Icon"  />)}
            {listing && (<LSPHighlight icon={<GiButterflyFlower />} category={"Flowers"} content={listing.flowers} className="LSP-HLT-Icon" />)}
            {listing && (<LSPHighlight icon={<GiMushroom />} category={"Mushrooms"} content={listing.mushrooms} className="LSP-HLT-Icon" />)}
            </div>
            <div>
            {listing && (<LSPHighlight icon={<GiFairyWand />} category={"Blessings"} content={listing.blessings} className="LSP-HLT-Icon" />)}
            {listing && (<LSPHighlight icon={<GiEvilHand />} category={"Omens"} content={listing.omens} className="LSP-HLT-Icon" />)}
            {listing && (<LSPHighlight icon={<MdDateRange />} category={"Listed"} content={"21 days ago"} className="LSP-HLT-Icon" />)}
            </div>
        </div>

      </div>
      <div id="LSP-Details"> <LSPDetails listing={listing}/></div>
      <div id="LSP-Reviews"><LSPReviews listing={listing} /></div>
    </div>
  )
}

export default ListingShowPage