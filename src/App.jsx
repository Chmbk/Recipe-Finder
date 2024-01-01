import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Header,
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchInput,
  SearchIcon
} from "./Components/HeaderComponent";
import {
  RecipeContainer,
  CoverImg,
  IngredientsText,
  SeeMoreText,
  RecipeName
} from "./Components/RecipeComponent";
import Dialog from "./Components/Dialog";
import Login from "./Login";

const APP_ID = "3d7e9d7f";
const APP_KEY = "c6fd3bdc1bdea7c3243df15aad32ef92";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;

  return (
    <>
       <Dialog open={show} onClose={() => setShow(false)}>
       <DialogTitle>Brownies</DialogTitle>
       </Dialog>
      <RecipeContainer>
        <CoverImg src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setShow(true)}>
          Ingredients
        </IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>
          See Complete Recipe
        </SeeMoreText>
      </RecipeContainer>
    </>
  );
};

function App() {

  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  useEffect(() => {
    
    fetchRecipe("default");
  }, []);

  const fetchRecipe = async (searchString) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      updateRecipeList(response.data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <>
    <Container>
      <Header.Container>
        <AppNameComponent>
          <AppIcon src="/cake.jpg" />
          Recipe Finder
        </AppNameComponent>
        <SearchComponent>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Recipe"
            onChange={onTextChange}
          />
        </SearchComponent>
      </Header.Container>
      <RecipeListContainer>
        {recipeList.length &&
          recipeList.map((recipeObj) => (
            <RecipeComponent key={recipeObj.recipe.uri} recipeObj={recipeObj.recipe} />
          ))}
      </RecipeListContainer>
    </Container>
    <div>
    <Login />
    </div>
  </>
);
}

export default App;