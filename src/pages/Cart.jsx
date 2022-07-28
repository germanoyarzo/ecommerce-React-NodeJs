import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import React, { Component }  from 'react';
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``
const Wrapper = styled.div`
  padding: 20px;
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor:pointer;
  border: ${props=>props.type==="filled" && "none"};
  background-color: ${ (props)=>
    props.type==="filled" ? "black" : "transparent"};
    color: ${ (props) => props.type === "filled" && "white"};
`

const TopTexts =styled.div`

`

const TopText= styled.span`
  text-decoration: underline;
  cursor:pointer;
  margin: 0px 10px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`
const Info= styled.div`
  flex: 3;
`

const Product= styled.div`
  display: flex;
  justify-content: space-between;
`
const ProductDetail= styled.div`
  flex:2;
  display: flex;

`
const Image= styled.img`
  width: 200px;

`
const Details= styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName= styled.span`

`
const ProductId= styled.span`

`
const ProductColor= styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props =>props.color};
`
const ProductSize= styled.span`

`

const PriceDetail= styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`
const ProductAmountContainer=styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount=styled.div`
  font-size:24px;
  margin: 5px;
  
`
const ProductPrice=styled.div`
  font-size: 30px;
  font-weight: 200;

`
const Hr=styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Sumary= styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius:  10px;
  padding: 20px;
  height: 50vh;
`

const SumaryTitle=styled.h1`
  font-weight: 200;

`

const SumaryItem= styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=> props.type === "total" && "500"};
  font-size: ${props=> props.type === "total" && "24px"};; 

`
const SumaryItemText= styled.span``
const SumaryItemPrice= styled.div``
const Button= styled.button`
  width: 100%;
  padding:10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor:pointer;
`

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const history = useNavigate();

  const clearAll = ()=>{
    this.setState({
      cart: [],
      messagge: "no items in your cart"
    })
  }

  const onToken = (token) => {
    setStripeToken(token);
  };
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  
  
  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  const deleteHandler= (i, e) =>{
    e.preventDefault();
    this.props.onDelete(this.props.blogPosts[i].id);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total *100,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && cart.total >=1 && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                  <Link to="/">
                    <TopButton>CONTINUE SHOPPING</TopButton>
                  </Link>
                  
                  <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                  </TopTexts>
                  <TopButton type= "filled">CHECK OUT NOW</TopButton>
                </Top>
                <Bottom>
                  <Info>
                    {cart.products?.map(product => (
                    <Product>
                      <ProductDetail>
                        <Image src={product.img}/>
                        <Details>
                          <ProductName><b>Product: </b> {product.title}</ProductName>
                          <ProductId><b>ID: </b> {product._id}</ProductId>
                          <ProductColor color={product.color} />
                          <ProductSize><b>Size: </b>{product.size} </ProductSize>                         
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add onClick={() => handleQuantity("inc")}/>
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Remove onClick={() => handleQuantity("dec")}/>
                        </ProductAmountContainer>
                        <ProductPrice>${product.price * product.quantity}</ProductPrice>
                      </PriceDetail>
                    </Product>
                    ))}
                    <Hr/>
                    
                  </Info>
                  <Sumary>
                    <SumaryTitle>ORDER SUMMARY</SumaryTitle>
                    <SumaryItem>
                      <SumaryItemText>SubTotal</SumaryItemText>
                      <SumaryItemPrice>$ {cart.total}</SumaryItemPrice>
                    </SumaryItem>
                    <SumaryItem>
                      <SumaryItemText>Estimated Shipping</SumaryItemText>
                      <SumaryItemPrice>$5.90</SumaryItemPrice>
                    </SumaryItem>
                    <SumaryItem>
                      <SumaryItemText>Shipping Discount</SumaryItemText>
                      <SumaryItemPrice>$ -5.90</SumaryItemPrice>
                    </SumaryItem>
                    <SumaryItem type="total">
                      <SumaryItemText>Total</SumaryItemText>
                      <SumaryItemPrice>${cart.total}</SumaryItemPrice>
                    </SumaryItem>
                    <StripeCheckout
                      name="Ecommerce"
                      image="https://i.pinimg.com/564x/f3/68/69/f36869b1674075bd446b133d2daf9378.jpg"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={cart.total * 100}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <Button>CHECK OUT</Button>
                    </StripeCheckout>
                    


                  </Sumary>

                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
  )
}
