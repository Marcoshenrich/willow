import "./LSPImages.css"

const LSPImages = ({ imageUrls }) => {

  return (
    <>
      <div className="LSP-Images">
        <div id="LSP-Hero-Image-Container">
          <img src={ imageUrls && (imageUrls[0])} />
        </div>
        <div className="LSP-Support-Image-Container">
          <div className="LSP-Support-Image" id="LSP-Support-Image-Top">
            <img src={ imageUrls && (imageUrls[1])} />
          </div>
          <div className="LSP-Support-Image" id="LSP-Support-Image-Bot">
            <img src={ imageUrls && (imageUrls[2])} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LSPImages