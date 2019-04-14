import { FETCH_PRODUCT, EDIT_PRODUCT } from '../actions/types';
import {products} from '../products';
const initialState = {
    items: products
};
export default function(state = {items: []}, action){
    
    switch(action.type){
        case FETCH_PRODUCT:
            return {
                ...initialState,...state
            }
        case EDIT_PRODUCT:
            const updatedList = state.items.map((item,index) => {
                if(index === action.id){
                    return {
                         ...action.payload 
                    }
                }
                return item
            });
            return {
                items: updatedList
            }
        default:
            return initialState;
    }
}