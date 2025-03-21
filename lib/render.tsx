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
  let {big, leftBig, rightBig, firstRightBig } = photo


  let bigContainerStyle =  big ? {
    width: "200%",
    height: "200%",
    top: "0",
    bottom: "0",
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
          }, ...bigContainerStyle, ...leftBigContainerStyle, ...rightBigContainerStyle, ...firstRightBigContainerStyle}}
        >
          <Image
            fill
            src={photo}
            alt={alt}
            title={title}
            sizes={sizes}
            id="gallery-photo"
            className={`
              ${big ? "absolute" : "p-4"}
              ${leftBig || rightBig || firstRightBig ? "absolute p-4 w-1/2 h-1/2" : "p-4"}
            `}
            unoptimized
          />
            <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: "transparent"}}></div>

          </div>
        </div>

      </div>
      }
    </>
  );
}
