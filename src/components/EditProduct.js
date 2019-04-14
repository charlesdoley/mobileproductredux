import React, { Component } from 'react'
import { Button, Checkbox, Form, Container, Radio, Dropdown } from 'semantic-ui-react'
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {pricingInfo} from '../products';
import { fetchAction, editProduct } from '../actions/productActions';
class EditProduct extends Component {
    productList;
    id;
    constructor(props){
        super(props);
        this.state = {
            name: '',
            weight: '',
            availability: 0,
            id: 0,
            product_url: '',
            price_tier: '',
            price_range: [],
            editable: true,
            priceRangeOptions : []   
        };
        this.id = this.props.location.state.id;
        this.productList = this.props.products[this.id];
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        this.setState({
                name: this.productList.name,
                weight: this.productList.weight,
                availability: this.productList.availability,
                product_url: this.productList.productUrl,
                id: this.id,
                price_tier: this.productList.pricingTier,
                price_range: this.productList.priceRange,
                editable: this.productList.isEditable,
                priceRangeOptions : (this.productList.pricingTier === 'premier') ? pricingInfo.premier.map( function(value,index){
                    return {
                        key: index,
                        value: value,
                        text: value
                    }
                    }) : pricingInfo.budget.map( function(value,index){
                    return {
                        key: index,
                        value: value,
                        text: value
                    }
                })
            });
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        this.setState({
            name: this.state.name,
            weight: this.state.weight,
            id: this.id,
            availability: this.state.availability,
            product_url: this.state.productUrl,
            price_tier: this.state.pricingTier,
            price_range: this.state.priceRange,
            editable: this.state.isEditable,
            priceRangeOptions : (this.state.pricingTier === 'premier') ? pricingInfo.premier.map( function(value,index){
                return {
                    key: index,
                    value: value,
                    text: value
                }
                }) : pricingInfo.budget.map( function(value,index){
                return {
                    key: index,
                    value: value,
                    text: value
                }
            })
        });
        
        this.props.editProduct(this.state);
        this.props.history.push('/');
    }
    handleChange = (e, { value }) => {
        this.setState({ 
        price_tier: value,
        price_range:value,
        priceRangeOptions : (value === 'premier') ? pricingInfo.premier.map( function(tier,index){
            return {
                key: index,
                value: tier,
                text: tier
            }
            }) : pricingInfo.budget.map( function(tier,index){
            return {
                key: index,
                value: tier,
                text: tier
            }
        })
        
    })
}
changeRange = (e, { value }) => {
    this.setState({ 
    price_range:value
    
})
}
    toggle = () => this.setState({ editable: !this.state.editable })
    render() {
        return (
            <React.Fragment>
                <Container className="marginTop">
                <Form onSubmit={this.onSubmit}>
                     <Form.Field>
                    <label>Name</label>
                    <input name='name' value={this.state.name} onChange={this.onChange} required/>
                    </Form.Field> 
                     <Form.Field>
                    <label>Weight</label>
                    <input name='weight' value={this.state.weight} onChange={this.onChange} required/>
                    </Form.Field>
                    <Form.Field>
                    <label>Availability</label>
                    <input placeholder="Only Numbers" type="number" name='availability' value={this.state.availability} onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Product URL</label>
                    <input name='product_url' value={this.state.product_url} onChange={this.onChange} required/>
                    </Form.Field>
                    <Form.Field>
                    <label>Price Tier</label>
                    <Radio label='Budget' name='radioGroup' value='budget' checked={this.state.price_tier === 'budget'} onChange={this.handleChange}/>
                    <Radio label='Premier' name='radioGroup' value='premier'  checked={this.state.price_tier === 'premier'} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Price Range</label>
                    <Dropdown placeholder={this.state.price_range} fluid selection options={this.state.priceRangeOptions} onChange={this.changeRange}/>
                    </Form.Field>
                    <Form.Field>
                    <Checkbox label='Is Editable' onChange={this.toggle} checked={this.state.editable} required/>
                    </Form.Field>
                    <Button primary type='submit' 
                        disabled={this.state.name === '' || this.state.weight === '' || this.state.product_url === ''
                        || this.state.price_tier === '' || !this.state.price_range}>Submit</Button>
                </Form>
                </Container>
            </React.Fragment>
        )
    }
    }
    EditProduct.propTypes = {
        fetchAction: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
    }
    const mapStateToProps = (state) => ({
        products: state.products.items
    });
    
    export default connect(mapStateToProps, { fetchAction, editProduct })(EditProduct);