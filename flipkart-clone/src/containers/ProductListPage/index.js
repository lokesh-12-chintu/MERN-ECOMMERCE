import Layout from "../../components/Layout";
import ProductStore from './ProductStore'
import ProductPage from './ProductPage'
import getParams from '../../utils/getParams'
import "./index.css"

const ProductListPage = (props) => {

    const renderProduct = () => {
        console.log(props)
        const params = getParams(props.location.search); 
        let content = null 
        switch(params.type){ 
            case 'store': 
                content = <ProductStore {...props}/>;
                break;
            case 'page': 
                content = <ProductPage {...props}/>
                break 
            default: 
                content = null; 
        }
        return content
    }

    return (
        <Layout>  
           {renderProduct()}
        </Layout>
    )
}

export default ProductListPage