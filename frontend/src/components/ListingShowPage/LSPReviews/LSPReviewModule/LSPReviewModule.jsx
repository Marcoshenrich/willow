import "./LSPReviewModule.css"
import { TiDeleteOutline } from "react-icons/ti"
import { BsPencil } from "react-icons/bs"

const LSPReviewModule = ({username, date, body}) => {

  return (
    <div className="LSP-Review-Module">
      <div id="LSPRM-Top-Bar" >
        <div id="LSPRM-Username">HelenOfTroy</div>
        <div id="LSPRM-Top-Bar-Icons">
          <BsPencil />
          <TiDeleteOutline />
        </div>
      
      </div>
      <div id="LSPRM-Date">Visited on January 12</div>
      <div id="LSPRM-Body">This place was super cute, the chantrelles were just starting to spore</div>
    </div>
  )
}

export default LSPReviewModule