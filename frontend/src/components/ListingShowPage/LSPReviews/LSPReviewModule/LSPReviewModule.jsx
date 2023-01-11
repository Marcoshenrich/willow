import "./LSPReviewModule.css"
import { useEffect, useState } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { BsPencil } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { updateReview, getReviews, deleteReview, fetchReviews, fetchReview } from "../../../../store/review";
import { getCurrentUser } from "../../../../store/session"

const LSPReviewModule = ({ review }) => {
  const dispatch = useDispatch()
  const author = review.user.username
  const datesArr = review.userAppointments
  const currentUser = useSelector(getCurrentUser)
  const [edit, setEdit] = useState(false)
  const [body, setBody] = useState("")

  const LSPReviewModuleDeleteClickHandler = (e) =>{
    e.stopPropagation()
    dispatch(deleteReview(review.id))
  }

  const LSPReviewModuleEditHandler = () => {
    const updatedReview = { id: review.id, body, userId: currentUser.id, listingId: review.listingId }
    dispatch(updateReview(updatedReview))
    setEdit((edit) => !edit)
  }

  const dateParser = (date) => {
    const year = date.slice(0, 4)
    let month = date.slice(6, 7)
    let day = date.slice(8, 10)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[month - 1]
    if (day[0] === "0") day = day[1]
    return `${month} ${day}, ${year}`
  }

  const dateVisitChecker = () => {
    if (datesArr.length > 0) {
      return (
        `Visited on ${dateParser(datesArr[0].date)}.`
      )
    } else {
      return  `Has not visited the property.`
    }
  }
  return (
    <div className="LSP-Review-Module">
      <div id="LSPRM-Top-Bar" >
        <div id="LSPRM-Username">{author}</div>
        <div id="LSPRM-Top-Bar-Icons">
          {review.userId === currentUser.id && (
          <>
            <BsPencil onClick={()=> setEdit((edit) => !edit)} />
            <TiDeleteOutline onClick={LSPReviewModuleDeleteClickHandler}/>
          </>
          )}
        </div>
      
      </div>
      {edit && (
        <>
          <textarea defaultValue={review.body} onChange={(e) => { setBody(e.target.value) }} cols="30" rows="10"></textarea>
          <button onClick={LSPReviewModuleEditHandler}>submit</button>
        </>
      )}
      {!edit && (
        <>
      <div id="LSPRM-Date">{dateVisitChecker()}</div>
      <div id="LSPRM-Body">{review.body}</div>
        </>
      )}
    </div>
  )
}

export default LSPReviewModule