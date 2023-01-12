import "./LSPReviews.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../../store/session"
import { createReview, getReviews, deleteReview, fetchReviews, fetchReview } from "../../../store/review";
import LSPReviewModule from "./LSPReviewModule/LSPReviewModule"
import { clearErrors } from "../../../store/errors";




const LSPReviews = ({ listing }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const reviews = useSelector(getReviews)
  const errors = useSelector(state => state.errors.newReviewErrors);
  const [body, setBody] = useState("")
  const [writeReview, setWriteReview] = useState(false)
  const [listingReviews, setListingReviews] = useState([])
  

  useEffect(()=>{
    dispatch(fetchReviews(listing.id))
  },[])

  useEffect(() => {
    setListingReviews([])
    reviews.forEach((review)=>{
      if (review.listingId === listing.id) {
        setListingReviews(listingReviews => listingReviews.concat(review))
      }
    })
  }, [reviews])

  const writeReviewPromptClickHandler = () => {
    setWriteReview((writeReview) => !writeReview)
  }

  const LSPReviewSubmitHandler = () => {
    const review = { body, userId: currentUser.id, listingId: listing.id  }
    dispatch(clearErrors())
    dispatch(createReview(review)).then((res) => { if (res.ok) setWriteReview((writeReview) => !writeReview) }).then((writeReview) => { if (!writeReview) setBody("")})
  }

  const lspReviewModulePlacer = (listingReviews) => {
    if (listingReviews) {
      return (
        listingReviews.map((review, i) => {
          return <LSPReviewModule key={i} review={review} /> 
        }
        )
      )
    }
  }

  return (
    <div id="LSP-Reviews">
      {listing && (<h2 id="LSP-Reviews-h2" >What visitors had to say</h2>)}
      <div id="LSP-Review-Container" className={(listingReviews.length === 0 ? "No-Review" : "Contains-Reviews") + (writeReview ? " Write-Review" : "" ) }>
        {(listingReviews.length === 0) && ( 
          <div id="LSP-No-Review-Prompt-Container">
            <div>Looks like no one has written a review of this property</div>
            {currentUser && (<div id="Write-First-Review-Prompt" onClick={writeReviewPromptClickHandler}>Be the first</div>)}
            {!currentUser && (<div id="Write-First-Review-Prompt">Sign in to be the First</div>)}
          </div> 
        )}
        { writeReview  && (
          <div id="LSPR-Write-Review-Form-Container">
            <textarea id="LSPRWR-Text-Input" placeholder="What do you think?" value={body} onChange={(e) => { setBody(e.target.value) }} cols="30" rows="10"></textarea>
            {errors && (<div id="LSPR-Errors">{errors[0]}</div>)}
            <button id="LSPRWR-Submit" onClick={LSPReviewSubmitHandler}>submit</button>
          </div>)}
        {(listingReviews.length > 0) && (
          <div id="LSPR-Review-Show-Container">
            {lspReviewModulePlacer(listingReviews)}
            {!writeReview && currentUser && (<button id="LSPRWR-Write-New-Review-Submit" onClick={writeReviewPromptClickHandler}>Write a Review</button>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default LSPReviews