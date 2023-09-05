import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
import "./index.css"

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        console.log({params});
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, []);


    return (
        <div style = {{margin:'0 10px'}}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs = {() => {}}
            >
                {
                    page.banners && page.banners.map((banner, index) => 
                        <a  key={index} style = {{display:'block'}}  href = {banner.navigateTo}>
                            <img  src={banner.img} alt="" />
                        </a>
                    )
                }
            </Carousel>
            <div className = "product-container" >
            {
                page.products && page.products.map((product, index) => 
                    <div  className = "product-sub-container" key={index}>
                        <img  className = "image-page" src={product.img} alt=""/>
                    </div>
                 )
                }
            </div>
        </div>
    )

}

export default ProductPage