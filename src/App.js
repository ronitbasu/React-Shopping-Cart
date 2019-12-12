import React, { Component } from 'react';
import data from './static/data/products';
import PropTypes from 'prop-types';
import Cart from './cart.js';
import Thumb from './thumb.js'

import './App.scss';

console.log(data.products);

class App extends Component {
  render() {
    return (
      <div className="main">
        <Cart products={data.products}/>
        <ProductCatalog products={data.products} />
      </div>
    );
  }
}

class ProductCatalog extends Component {
  render() {
    let products = this.props.products;
    var cols = [];
    products.forEach((product) => {
      cols.push(<ProductCol product={product} key={product.name} />);
    });
  return (
    <div className="shelf-container">
      {cols}
    </div>
  );
  }
}

class ProductCol extends Component {
  render() {
    let product = this.props.product;
    return (
      <div className="shelf-item">
        <Thumb
          classes="shelf-item__thumb"
          src={require(`./static/images/${product.sku}_2.jpg`)}
          alt={product.title}
        />
        <div className="shelf-item__details">
          <p className="title">{product.title}</p>
        </div>
        <div className="shelf-item__price">
          <p>{`${product.currencyFormat}  ${product.price}`}</p>
        </div>
        <div className="shelf-item__buy-btn">Add to cart</div>
      </div>
    );
  }
}

export default App;
