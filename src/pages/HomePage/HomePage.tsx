import SimpleImageSlider from "react-simple-image-slider";
import { useNavigate } from "react-router-dom";
import LatestRecipesHomePage from "../LatestRecipes/LatestRecipesHomePage";
import MostViewsHomePage from "../MostViews/MostViewsHomePage";
import BestRatingsHomePage from "../BestRatings/BestRatingsHomePage";


const HomePage = () => {
    const navigate = useNavigate();

    const images = [
        { url: "https://i.imgur.com/uyZN1vA.jpg",
        idx: 0,
        event: "/search?q=breakfast",
        },
        { url: "https://i.pinimg.com/564x/86/c2/52/86c252eff4d81eecdeaace5559f1e253.jpg",
        idx: 1,
        event: "/search?q=coffee"
        },
        { url: "https://st2.depositphotos.com/3818339/10141/v/950/depositphotos_101411426-stock-illustration-vector-modern-seafood-seamless-pattern.jpg",
        idx: 2,
        event: "/search?q=seafood"
        },
        { url: "https://i.imgur.com/ca6xStA.jpg",
        idx: 3,
        event: "/search?q=ice cream"
        },
        { url: "https://i.imgur.com/SocsSth.jpg",
        idx: 4,
        event: "/search?q=chocolate"
        },
        { url: "https://i.pinimg.com/564x/5a/5e/38/5a5e38468258298eeae9a83601ebbb38.jpg",
        idx: 5, 
        event: "/search?q=coffee"
        },
        ];
    
    return(
        <div style={{display: "flex"}}>
        <div>
        <SimpleImageSlider
          width={540}
          height={510}
          images={images}
          showBullets={false}
          showNavs={true}
          onClick = {(idx) => (navigate(`${images[idx].event}`))}
          navMargin={0}
          navStyle={2}
          autoPlay={true}
        />
      </div>
      <div style={{ marginLeft: '20px' }}>
      <LatestRecipesHomePage />
      </div>
      <MostViewsHomePage />
      </div>
    )
}

export default HomePage