import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../../store/session"
import { createReview, getReviews, deleteReview, fetchReviews, fetchReview } from "../../../store/review";



import LSPReviewModule from "./LSPReviewModule/LSPReviewModule"
import "./LSPReviews.css"

const LSPReviews = ({ listing }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const reviews = useSelector(getReviews)
  const [body, setBody] = useState("")
  const [writeReview, setWriteReview] = useState(false)

  useEffect(()=>{
    dispatch(fetchReviews(listing.id))
  },[])

  const writeReviewPromptClickHandler = () => {
    setWriteReview((writeReview) => !writeReview)
  }

  const LSPReviewSubmitHandler = () => {
    const review = { body, userId: currentUser.id, listingId: listing.id  }
    dispatch(createReview(review))
    setBody("")
  }


  const lspReviewModulePlacer = () => {
    if (reviews) {
      return (
        reviews.map((review, i) => <LSPReviewModule key={i} review={review} /> )
      )
    }
  }

  return (
    <>
      {listing && (<h2 id="LSP-Reviews-h2" >What visitors had to say</h2>)}
      <div id="LSP-Review-Container" className={(reviews.length === 0 ? "No-Review" : "Contains-Reviews") + (writeReview ? " Write-Review" : "" ) }>
        { (reviews.length === 0) && ( <div id="LSP-No-Review-Prompt-Container">
          <div>Looks like no one has written a review of this property</div>
          <div id="Write-Review-Prompt" onClick={writeReviewPromptClickHandler}>Write the first one</div>
        </div> 
        )}
        { writeReview  && (<div id="Form-Setup">
          <textarea value={body} onChange={(e) => { setBody(e.target.value) }} cols="30" rows="10"></textarea>
          <button onClick={LSPReviewSubmitHandler}>submit</button>
        </div>)}
  
          {reviews && lspReviewModulePlacer()}
      </div>
    </>
  )
}

export default LSPReviews