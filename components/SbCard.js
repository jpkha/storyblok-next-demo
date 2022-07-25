import { storyblokEditable } from "@storyblok/react";
import styled from "styled-components";

const SbCardContainer = styled.li`
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid black;
    list-style: none;
`

const ImgContainer = styled.div`
    height: 180px;
    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const SbCardContent = styled.div`
    padding: 16px;
    > h2 {
        margin-top: 0px;
    }
`

const SbCard = ({ blok }) => {
    return <SbCardContainer {...storyblokEditable(blok)}>
        <ImgContainer>
            <img
                alt={blok.image.alt}
                src={blok.image.filename}
            />
        </ImgContainer>
        <SbCardContent>
            <h2>{blok.headline}</h2>
            <p>{blok.text}</p>
        </SbCardContent>
    </SbCardContainer>;
};

export default SbCard;
