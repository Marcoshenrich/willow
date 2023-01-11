import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../../store/session"
import { createReview, deleteReview, fetchReviews, fetchReview } from "../../../store/review";



import LSPReviewModule from "./LSPReviewModule/LSPReviewModule"
import "./LSPReviews.css"

const LSPReviews = ({ listing }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const [body, setBody] = useState("")


  const LSPReviewSubmitHandler = () => {
    console.log("in handler")
    const review = { body, userId: currentUser.id, listingId: listing.id  }
    console.log(review)
    dispatch(createReview(review))
  }

  return (
    <>
      {listing && (<h2 id="LSP-Reviews-h2" >What visitors had to say</h2>)}
      <div id="LSP-Review-Container">
        <div id="Form-Setup">
          <textarea onChange={(e) => { setBody(e.target.value) }} cols="30" rows="10"></textarea>
          <button value={body} onClick={LSPReviewSubmitHandler}>submit</button>
        </div>
        <LSPReviewModule />
        <LSPReviewModule />
        <LSPReviewModule />
      </div>
    </>
  )
}

export default LSPReviews