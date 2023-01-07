import "./LSPImages.css"

const LSPImages = ({listing}) => {

  return (
    <>
      <div className="LSP-Images">
        <div id="LSP-Hero-Image">Hero
          <h1>Hero</h1>
        </div>
        <div className="LSP-Support-Image-Container">
          <div className="LSP-Support-Image" id="LSP-Support-Image-Top">
            img 2
          </div>
          <div className="LSP-Support-Image" id="LSP-Support-Image-Bot">
            img 3
          </div>
        </div>
      </div>
    </>
  )
}

export default LSPImages