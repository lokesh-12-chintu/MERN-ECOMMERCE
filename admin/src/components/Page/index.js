import Layout from "../Layout"
import {useState,useEffect} from "react"
import {useSelector,useDispatch} from 'react-redux'
import { Row, Col } from "react-bootstrap"
import Modal from "../Modal"
import linearCategories from '../../helpers/linearCategories'
import {createPage} from '../../actions'
import './index.css'

const Page = () => {
    const [createModal,setCreateModal] = useState(false)
    const [title,setTitle] = useState('')
    const [categories,setCategories] = useState([])
    const [categoryId,setCategoryId] = useState('')
    const [desc,setDesc] = useState('');
    const [type,setType] = useState(''); 
    const [banners,setBanners] = useState([]);
    const [products,setProducts] = useState([])
    
    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page)

    const dispatch = useDispatch()


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    },[category])

    useEffect(() => { 
        console.log(page)
        if(!page.loading){
            setCreateModal(false)
            setTitle('')
            setCategoryId('')
            setDesc('') 
            setProducts([])
            setBanners([])
        }
    },[page])

    const onCategoryChange = (e) => { 
        const category = categories.find(category => category.value == e.target.value); 
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        console.log(e)
        setBanners([...banners,e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e)
        setProducts([...products,e.target.files[0]]);

    }

    const submitPageForm = (e) => {
        //e.target.preventDefault(); 

        if(title === ''){ 
            alert('Title is required')
            return;
        }

        const form = new FormData(); 
        form.append('title',title) 
        form.append('description',desc) 
        form.append('category',categoryId) 
        form.append('type', type )
        banners.forEach((banner,index) => {
            form.append('banners',banner)
        });
        products.forEach((product,index) => {
            form.append('products',product)
        });

        dispatch(createPage(form))
        setCreateModal(false)
    }


    const renderCreatePageModal = () => {
        return(
                <Modal
                    show = {createModal}
                    modalTitle = {'Create New Page'}
                    handleClose={() => setCreateModal(false)}
                    onSubmit={submitPageForm}
                >
                    <Row className = "margin">
                        <Col>
                            <select
                                value = {categoryId} 
                                onChange = {onCategoryChange}
                                className = "form-control"
                            >  
                                <option value = ''>select category</option>
                                {
                                    categories.map(cat => 
                                        <option key = {cat.value} value = {cat.value}>{cat.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row className = "margin">
                        <Col>
                            <input value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder = {'Page Title'} className = 'form-control' />
                        </Col>
                    </Row>
                    <Row className = "margin">
                        <Col>
                            <input value = {desc} onChange = {(e) => setDesc(e.target.value)} placeholder = {'Page Desc'} className = 'form-control' />
                        </Col>
                    </Row>
                    <Row className = "margin">
                        {
                            banners.length > 0 ? 
                            banners.map((banner,index) => 
                                <Row  key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null 
                        }
                        <Col>
                            <input type = "file" name = "banners" onChange = {handleBannerImages} className = 'form-control'/>
                        </Col>
                    </Row>
                    <Row className = "margin">
                        {
                            products.length > 0 ? 
                            products.map((product,index) => 
                                <Row  key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null 
                        }
                        <Col>
                            <input type = "file" name = "products" onChange = {handleProductImages} className = 'form-control'/> 
                        </Col>
                    </Row>
                </Modal>
        )
    } 
    return(
        <Layout sidebar>
            {
                page.loading ?  
                <p>Creating Page...please wait</p> : 
                <>
                    {renderCreatePageModal()}
                    <button onClick = {() => setCreateModal(true)}>Create Page</button>
                </>
            }
           
        </Layout>
    )
}

export default Page