import "./ImageCarousel.css"
import { ImageModal } from '../../context/Modal';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useState } from "react";

const ImageCarousel = ({ imageArray, index, setImageIndex, setShowImageCarousel }) => {
  const numImages = imageArray.length

  const negModuloHander = (pointer, queueLen) => {
    let remain = pointer % queueLen;
    let check = Math.floor(remain >= 0 ? remain : remain + queueLen)
    return check
  }

  const carouselButtonClickHandler = (e) => {
    e.stopPropagation()
    if (e.currentTarget.id === "left") {
      setImageIndex((index) =>  index - 1 )
    } else {
      setImageIndex((index) => index + 1)
    }
  }

  const onImageModalClose = () => {
    setShowImageCarousel(false)
  }

  return (
    <ImageModal onModalClose={onImageModalClose}>
      <div id="Image-Carousel-Container">
        <div id="left" className="Image-Carousel-Button-Container" onClick={(e) => { carouselButtonClickHandler(e) }}><BsChevronLeft className="Image-Carousel-Icon"/></div>
        <div id="Image-Carousel-Image-Container">
          <img id="Carousel-Image" src={imageArray[negModuloHander(index, numImages)]} alt="" />
        </div>
        <div id="right" className="Image-Carousel-Button-Container" onClick={(e) => { carouselButtonClickHandler(e) }}><BsChevronRight className="Image-Carousel-Icon" /></div>
      </div>
    </ImageModal>
  )
}

export default ImageCarousel