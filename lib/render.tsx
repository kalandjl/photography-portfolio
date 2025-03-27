"use client";
import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";


export function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {

  // @ts-ignore
  let {big, leftBig, rightBig, firstRightBig, bigLeft, bigWithRowBelow } = photo

  console.log(sizes)


  let bigContainerStyle =  big && !bigLeft ? {
    width: "200%",
    height: "200%",
    top: "0",
    bottom: "0",
    zIndex: "-10",
  } : big && bigLeft && !bigWithRowBelow ? {
    width: "300%",
    height: "300%",
    top: "0",
    zIndex: "-10",
  } : big && bigLeft && bigWithRowBelow ? {
    width: "300%",
    height: "300%",
    top: "0",
    zIndex: "-10",
  } : big && !bigLeft && bigWithRowBelow ? {
    width: "300%",
    height: "300%",
    top: "0",
    zIndex: "-10",
  } : {}

  let leftBigContainerStyle = leftBig ? {
    bottom: -height ,
    left: "-200%",
  } : {}

  let rightBigContainerStyle = rightBig ? {
    bottom: -height ,
    right: "",
  } : {}

  let firstRightBigContainerStyle = firstRightBig ? {
    right: "-100%",
  } : {}


  
  return (
    <>
      {photo.src === "hidden.jpeg" ? <></> :
      <div className="block">
        <div className="relative">
          <div
          style={{...{
            width: "100%",
            aspectRatio: `${width} / ${height}`,
            display: "",
            position: "relative",
          }, ...bigContainerStyle, 
          ...leftBigContainerStyle, 
          ...rightBigContainerStyle, 
          ...firstRightBigContainerStyle,}}
        >
          <div id="image-container-wrap" 
          className={`
          ${big && bigLeft ? "absolute bottom-0 top-1/3 left-0 right-1/3" : "p-4"}`}>
            <Image
              fill
              src={photo}
              alt={alt}
              title={title}
              sizes={sizes}
              id="gallery-photo"

              className={`
                ${big && !bigLeft ? "absolute" : "sm:p-4 p-2"}
                ${big && bigLeft ? "block !top-0" : "sm:p-4 p-2"}
                ${leftBig || rightBig || firstRightBig ? "absolute sm:p-4 p-2 w-1/2 h-1/2" : "sm:p-4 p-2"}
                ${photo.src === '/hidden.jpeg' ? "hidden" : ""}
              `}
              loading="lazy" // Lazy loading for performance
              priority={false} // Do not prioritize all images
              
            />
          </div>
            <div style={{position: "absolute", background: "transparent"}}></div>
          </div>
        </div>

      </div>
      }
    </>
  );
}
