import { Fragment } from "react";
import Footer from "./footer";
import MainNavigation from "./main-navigation";

const Layout = (props) => {
    return ( 
        <Fragment>
            {/* Pass categories down to MainNavigation */}
            <MainNavigation categories={props.categories} products={props.products}/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </Fragment>
     );
}
 
export default Layout;
