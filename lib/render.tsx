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
  let {big, leftBig, rightBig, firstRightBig, bigLeft, bigWithRowBelow, hidden, badImage } = photo

  console.log(badImage)


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
      <div className="block">
        <div className="relative">
          <div
          id={`img-${photo.src}`}
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
          ${big && bigLeft ? "absolute bottom-0 top-1/3 left-0 right-1/3" : badImage ? "" : "p-4"}`}>
            {badImage ? 
            <>
              <img 
                src={photo.src}
                alt={alt}
                title={title}
                sizes={sizes}
                id="gallery-photo"
  
                className={`
                  ${big && !bigLeft ? "absolute" : "sm:p-4 p-2"}
                  ${big && bigLeft ? "block !top-0" : "sm:p-4 p-2"}
                  ${leftBig || rightBig || firstRightBig ? "absolute sm:p-4 p-2 w-1/2 h-1/2" : "sm:p-4 p-2"}
                  ${photo.src.includes('hidden') ? "hidden" : ""}
                `}
                loading={`${big ? "lazy" : "eager"}`} // Lazy loading for performance
                />
            </>
            :
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
                ${photo.src.includes('hidden') ? "hidden" : ""}
              `}
              loading={`${big ? "lazy" : "eager"}`} // Lazy loading for performance
              priority={false} // Do not prioritize all images
            />
            }
          </div>
            <div style={{position: "absolute", background: "transparent"}}></div>
          </div>
        </div>

      </div>
    </>
  );
}

export function renderNextImageMobile(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {

  // @ts-ignore
  let { big, leftBig, rightBig, firstRightBig, bigLeft, bigWithRowBelow, badImage } = photo


    let bigContainerStyle =  big && !bigLeft ? {
      width: "200%",
      height: "200%",
      top: "0",
      bottom: "0",
      zIndex: "-10",
      left: "-100%",
    } : big && bigLeft && !bigWithRowBelow ? {
      width: "300%",
      height: "300%",
      top: "0",
      zIndex: "-10",
    } : big && bigLeft && bigWithRowBelow ? {
      left: "-100%",
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

  // Override the logic for mobile, do not apply any large image or layout adjustments for big-related properties
  let containerStyle = {
    width: "100%",
    aspectRatio: `${width} / ${height}`,
    display: "block",
    position: "relative",
  }

  let imageWrapperClass = "sm:p-4 p-2";

  // If none of the 'big' flags apply, we can just use a simpler approach
  if (big || leftBig || rightBig || firstRightBig) {
    containerStyle = {
      ...containerStyle,
      width: "100%", // Reset to default
      // @ts-ignore
      height: "auto", // Ensure no forced height
      zIndex: "auto", // Avoid layer issues on mobile
    }
    imageWrapperClass = "sm:p-4 p-2"; // Default padding for mobile
  }

  return (
    <>
      <div className="block">
        <div className="relative">
          <div
            id={`img-${photo.src}`}
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
          ${big && bigLeft ? "absolute bottom-0 top-1/3 left-0 right-1/3":  badImage ? "" : "p-4"}`}>
            {badImage ?
            <>
            <img 
                src={photo.src}
                alt={alt}
                title={title}
                sizes={sizes}
                id="gallery-photo"
  
                className={`
                  ${big && !bigLeft ? "absolute" : "sm:p-4 p-2"}
                  ${big && bigLeft ? "block !top-0" : "sm:p-4 p-2"}
                  ${leftBig || rightBig || firstRightBig ? "absolute sm:p-4 p-2 w-1/2 h-1/2" : "sm:p-4 p-2"}
                  ${photo.src.includes('hidden') ? "hidden" : ""}
                `}
                loading={`${big ? "lazy" : "eager"}`} // Lazy loading for performance
                />
              </>
            :
            <Image
              fill
              src={photo}
              alt={alt}
              title={title}
              sizes={sizes}
              id="gallery-photo"
              quality={50}

              className={`
                ${big && !bigLeft ? "absolute" : "sm:p-4 p-2"}
                ${big && bigLeft ? "block !top-0" : "sm:p-4 p-2"}
                ${leftBig || rightBig || firstRightBig ? "absolute sm:p-4 p-2 w-1/2 h-1/2" : "sm:p-4 p-2"}
                ${photo.src.includes('hidden') || photo.src.includes("hdden") ? "hidden" : ""}
              `}
              loading={`${big ? "lazy" : "eager"}`} // Lazy loading for performance
              priority={false} // Do not prioritize all images
            />}
          </div>
            <div style={{position: "absolute", background: "transparent"}}></div>
          </div>
        </div>

      </div>
    </>
  );
}
