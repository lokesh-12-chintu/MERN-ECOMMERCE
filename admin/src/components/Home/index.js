import "./index.css"
import {Row,Col,Container} from 'react-bootstrap'


const Home = () => {
    return(
        <div> 
            <Container fluid>    
               <Row>
                <Col lg = {2} className = "sidebar">Sidebar</Col>
                <Col lg = {10} style = {{marginLeft:'auto'}}>Container</Col>
               </Row>
            </Container>
        </div>
    )
}

export default Home