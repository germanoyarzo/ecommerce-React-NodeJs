import styled from 'styled-components'
import { categories } from "../data"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content:space-between; 
`

export default function Categories() {
  return (
    <Container>
        {categories.map( (item) => (
            <CategoryItem item= {item} key= {item.id}/>
        ))}
    </Container>    
  )
}
