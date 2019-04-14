import React, { Component } from 'react';
import { Table, Button , Header , Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import { fetchAction } from '../actions/productActions';
class ProductList extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        this.props.fetchAction();
    }
    render() {  
        const productElement = this.props.products.map( (product, index) => (
            <Table.Row key={index}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.weight}</Table.Cell>
                <Table.Cell>{product.availability}</Table.Cell>
                <Table.Cell>{product.isEditable && (<Link to={{pathname:'/editproduct', state:{id:index}}}><Button primary>Edit</Button></Link>)}</Table.Cell>
            </Table.Row>
        ));
        return (
            <div>
                <React.Fragment>
                    <Container className="marginTop">
                        <Header size='large'>Mobile Products</Header>
                        <Table celled>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Weight</Table.HeaderCell>
                                <Table.HeaderCell>Availability</Table.HeaderCell>
                                <Table.HeaderCell>isEditable</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>
                        
                            <Table.Body>
                                {productElement}
                            </Table.Body>
                        </Table>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}
ProductList.propTypes = {
    fetchAction: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    products: state.products.items  
});

export default connect(mapStateToProps, { fetchAction })(ProductList);