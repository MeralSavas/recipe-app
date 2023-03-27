import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Cards from "../../components/cards/Cards";
import { HeaderText, HomeImg, ImgDiv } from "./Home.style";
import homeSvg from "../../assets/home.svg";

const Home = () => {
  // const APP_KEY =process.env.REACT_APP_APP_KEY
  // const APP_ID =process.env.REACT_APP_APP_ID

  const APP_KEY ='72d812ef6ba14e7dae188d5d680c9276'
  const APP_ID ='a105eab4'
  
  const [query, setQuery] = useState("egg");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [recipes, setRecipes] = useState(null);
  const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

  

  const getData = async (query, selectedMeal) => {
    
    if (query) {
      try {

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${selectedMeal}`;

    
        const { data } = await axios(url);
        setRecipes(data.hits);
    } catch (error) {
        console.log(error);
      }
    } else {
      alert("Fill the Form");
    }
  };
  console.log(recipes);

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div>
      <Header
        setQuery={setQuery}
        setSelectedMeal={setSelectedMeal}
        mealType={mealType}
        getData={()=> getData(query,selectedMeal)}
      />

      {!recipes && (
        <ImgDiv>
          <HomeImg src={homeSvg} />
        </ImgDiv>
      )}

      {recipes?.length === 0 && (
        <HeaderText>The Food can not be found</HeaderText>
      )}

      {recipes?.length > 0 && <Cards recipes={recipes} />}
    </div>
  );
};
export default Home;
