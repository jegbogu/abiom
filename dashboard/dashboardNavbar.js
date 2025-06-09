import { useSession, signOut } from 'next-auth/react';
import Link from "next/link";
import classes from './dashboardNavbar.module.css';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

function DashboardNavbar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            setUsername(session.user.name);
        }
    }, [status, session]);

    const logoutHandler = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    return (
        <div className={classes.section}>
            <div className={classes.sectionpara}>
                <p>Hello {status === 'authenticated' ? username : 'Admin'}</p>
            </div>

            <div className={classes.sectionroute}>
                <div className={classes.sectionroutes}>
                    <Link href="/newProduct">Add New Product</Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/admin-products">All Products (Edit, Delete)</Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/orders">Placed Orders</Link>
                </div>
                <div className={classes.sectionroutes}>
                    <Link href="/admin-chart">Charts and Analysis</Link>
                </div>
                <div className={classes.btn}>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default DashboardNavbar;
