import { FETCH_PRODUCT, EDIT_PRODUCT } from './types';
import {products} from '../products';

export function fetchAction(){
    return function(dispatch){
        return dispatch({
            type: FETCH_PRODUCT,
            payload: products
        });
    }
}



export function editProduct(state){
    return function(dispatch){
        return dispatch({
            type: EDIT_PRODUCT,
            payload: {
                name: state.name,
                pricingTier: state.price_tier,
                priceRange: state.price_range,
                weight: state.weight, 
                availability: state.availability,
                productUrl: state.product_url,
                isEditable: state.editable
            },
            id:state.id
        });
    }
}