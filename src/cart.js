import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thumb from './thumb.js';
import CartProduct from './cartproduct.js';
import data from './static/data/products';

class Cart extends Component {

  state = {
    isOpen: false,
    cartProducts: [    {
          "id": 12,
          "sku": 12064273040195392,
          "title": "Cat Tee Black T-Shirt",
          "description": "4 MSL",
          "availableSizes": ["S", "XS"],
          "style": "Black with custom print",
          "price": 10.9,
          "installments": 9,
          "currencyId": "USD",
          "currencyFormat": "$",
          "isFreeShipping": true
        }],
    cartTotal: {
      currencyFormat: "$",
      totalPrice: 10.9
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = product => {
    let cartProducts = this.state.cartProducts;
    let updateCart = this.updateCart;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = product => {
    let cartProducts = this.state.cartProducts;
    let updateCart = this.updateCart;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  updateCart = cartProducts => {
    let productQuantity = cartProducts.reduce((sum, p) => {
      sum += p.quantity;
      return sum;
    }, 0);

    let totalPrice = cartProducts.reduce((sum, p) => {
      sum += p.price * p.quantity;
      return sum;
    }, 0);

    let installments = cartProducts.reduce((greater, p) => {
      greater = p.installments > greater ? p.installments : greater;
      return greater;
    }, 0);

    this.state.cartTotal = {
      productQuantity,
      installments,
      totalPrice,
      currencyId: 'USD',
      currencyFormat: '$'
    };
  };

  render() {
    let cartTotal = this.state.cartTotal;
    let cartProducts = this.state.cartProducts;
    let removeProduct = this.removeProduct;
    console.log(this);

    const products = cartProducts.map(p => {
      return (
        <CartProduct product={p} removeProduct={removeProduct} key={p.id} />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${cartTotal.currencyFormat} ${cartTotal.totalPrice}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotal.installments && (
                  <span>
                    {`OR UP TO ${cartTotal.installments} x ${
                      cartTotal.currencyFormat
                    } ${cartTotal.totalPrice / cartTotal.installments}`}
                  </span>
                )}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
