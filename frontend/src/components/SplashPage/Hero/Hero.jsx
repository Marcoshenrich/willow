import "./Hero.css"
import blueMyco from "../../../assets/heroes/bluemyco.jpg"
import { BsSearch } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { searchListings, clearListings } from "../../../store/listings";
import { clearErrors } from "../../../store/errors";
import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';



const Hero = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [query, setQuery] = useState("")
    const searchErrors = useSelector(state => state.errors.searchErrors);

    const splashSearchSubmit = () => {
        dispatch(clearListings())
        dispatch(clearErrors())
        dispatch(searchListings(query)).then((res) => { if (res.ok) history.push(`/listings/search/${query}`) })
        setQuery("")
    }

    return (
    <>
        <div id="Hero">
            <img src={blueMyco}/>
        </div>
        <div id="Hero-Content">
            
            <div>Discover Your Fairy Tale</div>
                <div id="Search-Bar">
                    <input id={searchErrors ? "Search-Bar-Errors" : ""} value={query} type="search" placeholder={searchErrors ? searchErrors[0] : "find your dream home"} onChange={(e) => setQuery(e.target.value)} />
                    <button id="Search-Button">{<BsSearch id="Search-Glass" onClick={splashSearchSubmit} />}</button>
                </div>
        </div>
    </>
    )
}

export default Hero