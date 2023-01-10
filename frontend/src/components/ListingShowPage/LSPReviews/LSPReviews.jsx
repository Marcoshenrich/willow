import LSPReviewModule from "./LSPReviewModule/LSPReviewModule"
import "./LSPReviews.css"

const LSPReviews = ({ listing }) => {

  return (
    <>
      {listing && (<h2 id="LSP-Reviews-h2" >What visitors had to say</h2>)}
      <div id="LSP-Review-Container">
        <LSPReviewModule />
        <LSPReviewModule />
        <LSPReviewModule />
      </div>
    </>
  )
}

export default LSPReviews