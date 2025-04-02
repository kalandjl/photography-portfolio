import PortfolioLayout from "@/components/PortfolioLayout";
import Head from "next/head";
import HeroImage from "@/public/pictures/Windsor Champs-074.jpg"
import HeroImageSection from "@/components/HeroImageSection";


const pics = [

    // Row 1
    { src: "/pictures/_DSC0316-Enhanced-NR.jpg", width: 5994, height: 3996 }, 
    { 
    src: "/pictures/Saitns Round 1 VARSITY-131.jpg",
    // src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Saitns%20Round%201%20VARSITY-131.jpg?alt=media&token=df61a4b6-4934-45ee-848b-7d0688159605&?q=50&?w=32", 
    width: 1500, height: 1000, big: true, blurDataURL: "/pictures/Saitns Round 1 VARSITY-131.jpg", badImage: true, quality: 80}, 
    { src: "/pictures/Saitns Round 1 VARSITY-101.jpg", width: 2400, height: 1600, leftBig: true }, 


    // Row 2
    { src: "/pictures/JMAI -038.jpg", width: 4158, height: 2772, big: true, bigLeft: true, bigWithRowBelow: true, badImage: true}, // big pic #2
    { src: "/hidden.jpeg", width: 7008, height: 4672, badImage: true}, 
    { src: "/hidden1.jpeg", width: 4622, height: 3081, badImage: true}, 


    // Row 3
    { src: "/pictures/JMAI -069.jpg", width: 6645, height: 4430, badImage: true}, // left of big pic #3
    { src: "/hidden2.jpeg", width: 6671, height: 4447, badImage: true}, 
    { src: "/pictures/JMAI -220.jpg", width: 3889, height: 2593, badImage: true}, // right big pic #2


     {src: "/pictures/_DSC2941.jpg", width: 6671, height: 4447, badImage: true },// left of big pic #3
    { src: "/pictures/_DSC6059-Enhanced-NR.jpg", width: 6419, height: 4279, big: true, badImage: true}, // Big pic #3

    { src: "/pictures/JMAI Post abits Rematch-094.jpg", width: 7008, height: 4672, badImage: true },  // right big pic #2


    { src: "/pictures/JMAI -001.jpg", width: 2048, height: 1365, badImage: true},
    { src: "/pictures/JMAI -148.jpg", width: 6087, height: 4058, badImage: true}, 

    { src: "/hidden3.jpeg", width: 5812, height: 3875, badImage: true}, 


    { src: "/pictures/JMAI Post abits Rematch Retouched-2.jpg", width: 6220, height: 4147, badImage: true},
    { src: "/pictures/JMAI -128.jpg", width: 7008, height: 4672, badImage: true}, 
    { src: "/hidden4.jpeg", width: 4622, height: 3081, badImage: true}, 
    { src: "/pictures/JMAI Post abits Rematch-018.jpg", width: 7008, height: 4672, badImage: true}, 
    { src: "/pictures/JMAI -009.jpg", width: 6426, height: 4284, badImage: true}, 
    { src: "/pictures/JMAI Post abits Rematch-031.jpg", width: 3620, height: 2413, badImage: true},
    { src: "/pictures/JMAI -45.jpg", width: 2965, height: 1977, badImage: true}, 
    { src: "/pictures/_DSC0646-Enhanced-NR.jpg", width: 6673, height: 4449, badImage: true},
    { src: "/pictures/_DSC0666-Enhanced-NR.jpg", width: 7708, height: 4672, badImage: true}, 
    { src: "/pictures/_DSC0676-Enhanced-NR.jpg", width: 7708, height: 4672, badImage: true}, 
    { src: "/pictures/_DSC6815.jpg", width: 6037, height: 4025, badImage: true},
    { src: "/pictures/JMAI NV HOCKEY-018.jpg", width: 5812, height: 3875, badImage: true}, 
    { src: "/pictures/_DSC6971.jpg", width: 7008, height: 4672, badImage: true}, 
    { src: "/pictures/_DSC9083.jpg", width: 7008, height: 4672, badImage: true}, 
    { src: "/pictures/JMAI -22.jpg", width: 5467, height: 3645, badImage: true}, 
    { src: "/pictures/JMAI -006.jpg", width: 4622, height: 3081, badImage: true}, 
    { src: "/pictures/_DSC9997-Enhanced-NR.jpg", width: 3763, height: 5645, badImage: true}
];

const mobilePics = [

    { src: "/hddenmobile.jpeg", width: 7008, height: 4672,  },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Saitns%20Round%201%20VARSITY-131.jpg?alt=media&token=217b1ab0-437d-4a8b-90ec-6cb49fa7de7d", width: 7008, height: 4672, big: true, badImage: true }, 
    { src: "/hddenmobile1.jpeg", width: 7008, height: 4672,  },
    { src: "/pictures/_DSC0316-Enhanced-NR.jpg", width: 5994, height: 3996}, 
    { src: "/pictures/Saitns Round 1 VARSITY-101.jpg", width: 2400, height: 1600}, 
    { src: "/pictures/JMAI -038.jpg", width: 4158, height: 2772, big: true},
    { src: "/hddenmobile2.jpeg", width: 7008, height: 4672,  },
    { src: "/pictures/JMAI -220.jpg", width: 3889, height: 2593},
    { src: "/hddenmobile3.jpeg", width: 7008, height: 4672,  },
    {src: "/pictures/_DSC2941.jpg", width: 6671, height: 4447 },
    { src: "/pictures/JMAI Post abits Rematch-094.jpg", width: 7008, height: 4672, }, 
    { src: "/pictures/JMAI -001.jpg", width: 2048, height: 1365},
    { src: "/pictures/JMAI -148.jpg", width: 6087, height: 4058}, 
    { src: "/pictures/JMAI -069.jpg", width: 6645, height: 4430}, 
    { src: "/pictures/JMAI Post abits Rematch Retouched-2.jpg", width: 6220, height: 4147},
    { src: "/pictures/JMAI -128.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI Post abits Rematch-018.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/_DSC6059-Enhanced-NR.jpg", width: 6419, height: 4279, big: true},
    { src: "/pictures/JMAI -009.jpg", width: 6426, height: 4284}, 
    { src: "/pictures/JMAI Post abits Rematch-031.jpg", width: 3620, height: 2413},
    { src: "/hddenmobile4.jpeg", width: 7008, height: 4672,  },
    { src: "/pictures/JMAI -45.jpg", width: 2965, height: 1977}, 
    { src: "/hddenmobile5.jpeg", width: 7008, height: 4672,  },
    { src: "/pictures/_DSC0646-Enhanced-NR.jpg", width: 6673, height: 4449},
    { src: "/pictures/_DSC0666-Enhanced-NR.jpg", width: 7708, height: 4672}, 
    { src: "/pictures/_DSC0676-Enhanced-NR.jpg", width: 7708, height: 4672}, 
    { src: "/pictures/_DSC6815.jpg", width: 6037, height: 4025},
    { src: "/pictures/JMAI NV HOCKEY-018.jpg", width: 5812, height: 3875}, 
    { src: "/pictures/_DSC6971.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/_DSC9083.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI -22.jpg", width: 5467, height: 3645}, 
    { src: "/pictures/JMAI -006.jpg", width: 4622, height: 3081}, 
    { src: "/pictures/_DSC9997-Enhanced-NR.jpg", width: 3763, height: 5645}
];

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Sports" />
            <PortfolioLayout pics={pics} mobilePicsProps={mobilePics} title="Sports" />
        </>
    )
};

export default Home;