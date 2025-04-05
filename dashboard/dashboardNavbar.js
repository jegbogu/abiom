// import { useContext } from "react";
import { useSession, signOut } from 'next-auth/react';
// import CartsContext from "@/store/product-context";
import Link from "next/link";
import classes from './dashboardNavbar.module.css'
import { useRouter } from "next/router";
async function DashboardNavbar() {
    // const { userAdmin } = useContext(CartsContext)
    const router = useRouter()
    const { data: session, status } = useSession()
    if (status === 'authenticated') {
        await signOut({
            redirect:false
        })
        router.push('/admin-login')
    }
    let username;
    if(status === 'authenticated'){
        username = session.user.name
    }


    
    return (
        <div className={classes.section}>
            <div className={classes.sectionpara}>
                <p>Hello {username}</p>

            </div>

            <div lassName={classes.sectionroute}>
                <div className={classes.sectionroutes}>
                    <Link href="/newProduct">Add New Product</Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/admin-products">All Products(Edit, Delete)</Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/orders">Placed Orders </Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/admin-chart">Charts and Analysis</Link>
                </div>
                <div className={classes.btn}>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>



        </div>
    )
}
export default DashboardNavbar