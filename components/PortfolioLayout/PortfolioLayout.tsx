import { FC } from "react";
import Nav from "../Nav";
import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";
import { renderNextImage } from "@/lib/render";

interface Props {
    pics: Pic[]
    title: string
}

const PortfolioLayout: FC<Props> = (props) => {

    return (
        <>
                <div className="min-h-screen text-black">
                    <Nav theme="dark" />
                    
                    {/* Header */}
                    <header className="text-center py-12">
                        <h1 className="text-4xl font-bold">{props.title}</h1>
                    </header>
        
                    <div className="px-6 md:px-32 lg:px-64 pb-20 pt-10">
                            <RowsPhotoAlbum
                              photos={props.pics}
                              render={{ image: renderNextImage }}
                              defaultContainerWidth={1200}
                              sizes={{
                                size: "1168px",
                                sizes: [
                                  { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
                                ],
                              }}
                            />
                    </div> 
                </div>
        </>
    )
}

export default PortfolioLayout