import "./LSPAppointmentsCarousel.css"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import LSPAMDateBlock from "../LSPAMDateBlock"


const LSPAppointmentsCarousel = () => {

  return (
    <div id="LSPA-Carousel">
      <BsChevronLeft id="Left-LSPA-Carousel-Icon" />
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <BsChevronRight id="Right-LSPA-Carousel-Icon" />
    </div>
  )
}

export default LSPAppointmentsCarousel