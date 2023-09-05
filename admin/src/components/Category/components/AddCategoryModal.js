import React from 'react'
import Modal from '../../Modal'
import {Row,Col} from "react-bootstrap"


const AddCategoryModal = (props) => {

    const {
        show, 
        handleClose, 
        categoryName, 
        setCategoryName, 
        parentCategoryId, 
        setParentCategoryId, 
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props 

    return(
        <Modal onSubmit = {onSubmit} show={show} handleClose={handleClose} modalTitle={'Add New Category'} size='lg'>
        <Row>
            <Col>
                 <input className="form-control" value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} /> <br />
            </Col>
            <Col> 
                <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                <option>select category</option>
                {
                    categoryList.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                }
                </select><br />
            </Col>
        </Row>
        <Row>
            <Col>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Col>
        </Row>
    </Modal>
    )
}

export default AddCategoryModal;