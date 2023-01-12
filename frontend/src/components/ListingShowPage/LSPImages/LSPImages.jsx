import "./LSPImages.css"
import ImageCarousel from "../../ImageCarousel";
import { useState } from "react";

const LSPImages = ({ imageUrls }) => {
  const [showImageCarousel, setShowImageCarousel] = useState(false)
  const [imageArray, setImageArray] = useState([])
  const [imageIndex, setImageIndex] = useState(0)

  const imageClickHandler = (e, index) => {
    e.stopPropagation()
    setShowImageCarousel(true)
    setImageIndex(index)
  }

  return (
    
    <>
      {showImageCarousel && (<ImageCarousel imageArray={imageUrls} index={imageIndex} setImageIndex={setImageIndex} setShowImageCarousel={setShowImageCarousel} />)}
      <div className="LSP-Images">
        <div id="LSP-Hero-Image-Container">
          <img src={imageUrls && (imageUrls[0])} onClick={(e) => imageClickHandler(e, 0)}/>
        </div>
        <div className="LSP-Support-Image-Container">
          <div className="LSP-Support-Image" id="LSP-Support-Image-Top">
            <img src={imageUrls && (imageUrls[1])} onClick={(e) => imageClickHandler(e, 1)} />
          </div>
          <div className="LSP-Support-Image" id="LSP-Support-Image-Bot">
            <img src={imageUrls && (imageUrls[2])} onClick={(e) => imageClickHandler(e, 2)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LSPImages