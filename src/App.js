import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { Provider } from 'react-redux';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import store from './store';


  
class App extends Component {
 
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/editproduct" component={EditProduct} />
          <Route path="*" component={ProductList} />
        </Switch>
      </React.Fragment>
      </Provider>
    );
  }
}

export default App;
