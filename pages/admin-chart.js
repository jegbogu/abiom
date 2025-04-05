import BarChart from "@/dashboard/barchart";
import { MongoClient } from "mongodb";
import { useState } from "react";

function Charts(props){
   
    // console.log(UserData)
    // const allStates = props.orders.map((data)=>data.state)
    // const cartPrice = props.orders.map((data)=>data.cartPrice)
    const UserData = props.orders
    const [userData, setUserData] = useState({
        labels:UserData.map((data)=>data.state),
        datasets:[
            {
            label:"Amount Generated",
            data:UserData.map((data)=>data.cartPrice),
             
        },
    ]
    })
    return(
       <div>
        <h1>Charts And Analysis</h1>
        <BarChart chartData={userData}/>
       </div> 
    )
}
export async function getStaticProps(){
    const client =  await MongoClient.connect(process.env.DB)

    const db = client.db()

    const productCollection = db.collection('usershopping')

    const orders = await productCollection.find().toArray()
   

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

export default Charts