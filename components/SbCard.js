import { storyblokEditable } from "@storyblok/react";
import styled from "styled-components";

const SbCardContainer = styled.li`
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid black;
    list-style: none;
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    > h2 {
        margin-top: 0px;
    }
    > p {
        flex : 1 1 auto;
    }
`

const BuyButton = styled.button`
    padding: 12px 16px;
    background-color: #E26D5C;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    color: white;
`

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    > span {
        font-weight: bold;
        font-size: 1.25rem;
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
            <PriceContainer>
                <span>${Number(blok.price).toFixed(2)}</span>
                <BuyButton
                    className="snipcart-add-item"
                    data-item-id={blok._uid}
                    data-item-name={blok.headline}
                    data-item-description={blok.text}
                    data-item-price={(blok.price)}
                    data-item-image={blok.image.filename}
                >
                Add to cart</BuyButton>
            </PriceContainer>
        </SbCardContent>
    </SbCardContainer>;
};

export default SbCard;
