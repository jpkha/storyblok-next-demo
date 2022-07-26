import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import styled from "styled-components";

const GridLayout = styled.ul`
  display: grid;
  grid-gap: 32px;
  padding: 0;
  padding-top: ${(props) => props.blok.paddingTop}px;
  grid-template-columns: repeat(${(props) => props.blok.nbColumnDesktop},1fr);
  @media (max-width: 599px) {
    grid-template-columns: repeat(${(props) => props.blok.nbColumnMobile},1fr);
  } 
   @media (min-width: 600px) and (max-width: 960px) {
    grid-template-columns: repeat(${(props) => props.blok.nbColumnTablet},1fr);
  }
`

const SbGrid = ({ blok }) => {
    return (
        <GridLayout {...storyblokEditable(blok)} blok={blok}>
            {blok.content.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </GridLayout>
    );
};

export default SbGrid;
