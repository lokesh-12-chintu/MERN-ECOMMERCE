import React from 'react'
import Modal from '../../Modal'
import {Row,Col} from "react-bootstrap"

const UpdateCategoriesModal = (props) => {

    const {show,size,handleClose, modalTitle, expandedArray, checkedArray, handleCategoryInput, categoryList,onSubmit} = props;

    console.log({expandedArray, checkedArray})

    return(
        <Modal onSubmit = {onSubmit} show={show} handleClose={handleClose} modalTitle={modalTitle} size={size}>
            <Row>
                <Col>
                     <h6>Expanded</h6> 
                </Col>
            </Row>
            {
                expandedArray.length > 0 && 
                expandedArray.map((item, index) =>
                     <Row key={index}>
                        <Col>
                            <input className="form-control" value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')} /> <br />
                        </Col>
                        <Col>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'expanded')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select><br />
                        </Col>
                        <Col>
                            <select value = {item.type}  onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')} className="form-control" >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                     <Row key={index}>
                        <Col>
                            <input className="form-control" value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')} /> <br />
                        </Col>
                        <Col>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'checked')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select><br />
                        </Col>
                        <Col>
                            <select value = {item.type}  onChange={(e) => handleCategoryInput('type',e.target.value,index,'checked')}  className="form-control" >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
        </Modal>
    )
}
export default UpdateCategoriesModal