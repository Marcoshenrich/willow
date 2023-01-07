import "./LSPImages.css"

const LSPImages = ({listing}) => {

  return (
    <>
      <div className="LSP-Images">
        <div id="LSP-Hero-Image-Container">
          <img src={listing && listing.imageUrls && (listing.imageUrls[0])} />
        </div>
        <div className="LSP-Support-Image-Container">
          <div className="LSP-Support-Image" id="LSP-Support-Image-Top">
            <img src={listing && listing.imageUrls && (listing.imageUrls[1])} />
          </div>
          <div className="LSP-Support-Image" id="LSP-Support-Image-Bot">
            <img src={listing && listing.imageUrls && (listing.imageUrls[2])} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LSPImages