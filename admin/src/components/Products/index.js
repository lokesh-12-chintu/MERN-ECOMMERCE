import Layout from "../Layout"
import {Container, Row, Col,Table} from "react-bootstrap"
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux"
import {addProduct} from "../../actions"
import Modal from "../Modal"
import "./index.css"

const Product = () => {

    const [name,setName] = useState('')
    const [quantity,setQuantity] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [categoryId,setCategoryId] = useState('')
    const [productPictures,setProductPictures] = useState([])
    const [show,setShow] = useState(false); 
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)

    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()

    console.log(product)

    const handleClose = () => {
      setShow(false);
    };
    
    const submitProductForm = () => {
      const form = new FormData();
      form.append("name", name);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("description", description);
      form.append("category", categoryId);
  
      for (let pic of productPictures) {
        form.append("productPictures", pic);
      }
  
      dispatch(addProduct(form)).then(() => setShow(false));
    };

    const handleShow = () => setShow(true)

    const createCategoryList = (categories,options = []) => {
      for(let category of categories) {
          options.push({value : category._id, name:category.name})
          if(category.children.length > 0) {
              createCategoryList(category.children, options)
          }
      }
      return options
  }

    const handleProductPictures = (e) => {
      setProductPictures([
        ...productPictures, 
        e.target.files[0]
      ]);
    }  


    const renderProducts = () => {
      return (
        <Table style={{ fontSize: 12 }} responsive="sm">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? product.products.map((product) => (
                  <tr onClick = {() => showProductDetailsModal(product) } key={product._id}>
                    <td>2</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category?.name}</td>
                  </tr>
               ))
              : null}
          </tbody>
        </Table>
      );
    };

    const renderAddProductModal = () => {
      return(
        <Modal show = {show} modalTitle = {'Add New Product'} handleClose = {handleClose} onSubmit={submitProductForm}>
          <input className = "form-control" value = {name} placeholder = {'Product Name'} onChange = {(e) => setName(e.target.value)}/><br/>
          <input className = "form-control" value = {quantity} placeholder = {'Qunatity'} onChange = {(e) => setQuantity(e.target.value)}/><br/>
          <input className = "form-control" value = {price} placeholder = {'Price'} onChange = {(e) => setPrice(e.target.value)}/><br/>
          <input className = "form-control" value = {description} placeholder = {'Description'} onChange = {(e) => setDescription(e.target.value)}/><br/>
          <select className = "form-control" value = {categoryId} onChange = {(e) => setCategoryId(e.target.value)}><br/>
            <option>select category</option>
            {
              createCategoryList(category.categories).map(option => 
                <option key = {option.value} value = {option.value}>{option.name}</option>
            )  
            }
          </select><br/>
            
          {productPictures.length > 0 ? productPictures.map((pic, index) => (<div key={index}>{pic.name}</div> )) : null}

          <input type = "file" name = "productPictures" onChange = {handleProductPictures}/>
      </Modal>
      )
    }

    const handleCloseProductDetailsModal = () => {
      setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true); 
        console.log(product)
    }

    const renderProductDetailsModal = () => {

      if(!productDetails){
        return null 
      }

      return(
        <Modal
          show = {productDetailModal}
          handleClose = {handleCloseProductDetailsModal}
          modalTitle = {'Product Details'}
          size = 'lg'
        >
         <Row>
            <Col md = "6">
              <label className = "key">Name</label>
              <p  className = "value">{productDetails.name}</p>
            </Col>
            <Col md = "6">
              <label className = "key">Price</label>
              <p  className = "value">{productDetails.price}</p>
            </Col>
         </Row>
         <Row>
            <Col md = "6">
              <label className = "key">Qunatity</label>
              <p  className = "value">{productDetails.quantity}</p>
            </Col>
            <Col md = "6">
              <label className = "key">Category</label>
              <p  className = "value">--</p>
            </Col>
         </Row>
         <Row>
            <Col md = "12">
              <label className = "key">Description</label>
              <p  className = "value">{productDetails.description}</p>
            </Col>
         </Row>
         <Row>
            <Col style = {{display:'flex'}}>
              {
                productDetails.productPictures.map(picture => 
                  <div className = "productImgContainer">
                    <img src = {`http://localhost:5000/uploads/${picture.img}`}/>
                  </div>
                  )
              }
            </Col>
         </Row>
         
        </Modal>
      )
    } 

    return(
      <Layout>
        <Container>
        <Row>
          <Col md = {12}>
              <div className = "category-container">
                  <p>Products</p>
                  <button onClick = {handleShow} className = "btn btn-primary">Add</button>
              </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        </Container>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Layout>
    )
}

export default Product