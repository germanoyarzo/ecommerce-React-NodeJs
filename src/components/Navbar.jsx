import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Container = styled.div`
    height: 60px;
    
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items:center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
`


const Left = styled.div`
    flex: 1;
    display: flex;
    align-items:center;
`
const Center = styled.div`
flex: 1;
`

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end; 
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px; 
`

export default function Navbar(){
    //const quantity= useSelector(state =>state.cart.quantity)
    const quantity = useSelector(state =>state.cart.quantity)

    console.log(quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search style = {{color: "gray", fontSize: 16}}/>
                    </SearchContainer> 
                </Left>
                <Center><Logo>Ecommerce</Logo></Center>
                <Right>
                    <Link to="/register">
                        <MenuItem>Register</MenuItem>
                    </Link>
                    <Link to="/login">
                        <MenuItem>Sign In</MenuItem>
                    </Link>
                    <Link to="/login">
                        <MenuItem>Log Out</MenuItem>
                    </Link>
                    <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </Link >
                </Right>
            </Wrapper>

        </Container>
    )
}
