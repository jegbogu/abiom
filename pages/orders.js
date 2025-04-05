import { MongoClient } from "mongodb"
import DashboardNavbar from "@/dashboard/dashboardNavbar"
import classes from './orders.module.css'
import {  useState } from "react"
import { useRef } from "react"
import SearchIcon from "@/icons/search"

function Orders(props){
const allOrder = props.orders
const[productDisplay, setProductDisplay] = useState(allOrder)
const[noOrder, setNoOder] = useState('')

 
const productInput = useRef()
const optionValue = useRef()


function submitHandler(event){
  
event.preventDefault()
//  setValueRes(enteredProductInput)

const enteredProductInput = productInput.current.value
const enteredOptionValue = optionValue.current.value
 
 function display(show, reVal){
    return show[reVal]
 }
// console.log(enteredProductInput)
// console.log(allOrder)
const foundOrder = allOrder.filter((product)=>{
  return display(product,enteredOptionValue)   === enteredProductInput
})

if(foundOrder.length===0){
setNoOder(<div className={classes.noOrder}>No Order Found</div>)
}else{
    setNoOder(<div></div>)
}
// console.log(foundOrder)
setProductDisplay(foundOrder)
}
 
 
    return(
        <div className={classes.mainSection}>
        <div className={classes.header}>
            <h1>All Client Orders</h1>
        </div>
        <div className={classes.section}>
        <DashboardNavbar/>
        <div className={classes.sectionTable}>
            <form onSubmit={submitHandler} >
                <label htmlFor="search">Search for Order(s)</label><br/>
                <input type="text" placeholder="search for Order(s)" required ref={productInput}/>
                <select ref={optionValue}>
                    <option>'--Select Option-- '</option>
                    <option value='email'>Email</option>
                    <option value='price'>Price</option>
                    <option value='invoiceNum'>InvoiceNum</option>
                    <option value='city'>City</option>
                    <option value='state'>State</option>
                </select>

                <button className={classes.btn}><SearchIcon/></button>
            </form>
        <table>
            <tr>
                <th>S/N</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Price</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>InvoiceNum</th>
            </tr>
          
            {productDisplay.map((order,i)=>(
                <tr key={order.id}>
                   <td>{i+1}</td>
                    <td>{order.firstname}</td>
                    <td>{order.lastname}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.cartPrice}</td>
                    <td>{order.cartProducts}</td>
                    <td>{order.cartQty}</td>
                    <td>{order.invoiceNum}</td>
                </tr>
            ))}
        </table>
        {noOrder}
        </div>
        </div>
        </div>
    )
}

export async function getServerSideProps(){
    const client =  await MongoClient.connect(process.env.DB)

    const db = client.db()

    const productCollection = db.collection('usershopping')

    const orders = await productCollection.find().toArray()
    console.log(orders)

    client.close()

    return{
        props:{
            orders:orders.map((order)=>({
              firstname: order.firstname,
                lastname: order.lastname,
                email: order.email,
                address:order.address,
                city:order.city,
                state:order.state,
                cartPrice:order.cartPrice,
                cartProducts:order.cartProducts,
                cartQty:order.cartQty,
                invoiceNum:order.invoiceNum,
                id:order._id.toString(),
            }))
        },
        revalidate: 1,
    }

}

export default Orders