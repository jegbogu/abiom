import Link from 'next/link'
import classes from './gridLayout.module.css'

function GridLayout(){
    return(
        <div className={classes.section}>
        <div className={classes.grid}>
        <div className={classes.gridItem2}>
        <img src="https://www.cokodeal.com/blog/wp-content/uploads/2019/02/Pumpkin-leaves-ugwu-on-cokodeal-foe-export.jpg" alt="clean farm" width={550}/>

        </div>
        <div className={classes.gridItem3}>
            <img src="https://media.istockphoto.com/id/515594772/photo/digital-farmer-with-a-tablet.jpg?s=612x612&w=0&k=20&c=LFglQYkKsgqza0mif2-UFHyR8g_WbnnoN_QhAXua8ZA=" 
            alt="clean environment"width={550}/>

            </div>
        <div className={classes.gridItem4}>
            
            <img src="https://media.istockphoto.com/id/1319236881/photo/financial-center-square-and-office-building-in-ningbo-zhejiang-provincechina.jpg?s=612x612&w=0&k=20&c=vdbRaftV7gl-muhyqWrz5mV1CQivswnUaF5YiHLo5Iw=" alt="farm" width={550} />
        </div>
            </div>
            <div className={classes.article}>
                <h3>Crunch into Good Health: Why You Should Eat More of this Leafy Green</h3>

                <p>For the average African, you must be bound to have had a taste of this popular leafy sensation. Ugu is one of West Africa’s most sumptuous vegetables. Not only does it taste delicious when boiled or cooked, but It’s also packed with enormous amounts of nutrients.....</p>
                <button> <Link href="https://blog.abiomsupply.com/2023/04/26/crunch-into-good-health-why-you-should-eat-more-of-this-leafy-green/">Read More</Link></button>
            </div>
            
     
    </div>
    )
}

export default GridLayout