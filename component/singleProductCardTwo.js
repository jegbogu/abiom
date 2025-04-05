import Link from 'next/link'
import classes from './singleProductCardTwo.module.css'

function SingleProductCardTwo() {
    return (
        <div className={classes.section}>

            <div className={classes.article}>
                <h2>The Spicy Truth About Red Pepper: Health Benefits and Dangers</h2>

                <p>Is it Just me? Or is everywhere getting hotter all of a sudden… Today, we talk about the Red Hot sensation in the room. It’s the Famous <Link href='https://abiomsupply.com/shop/64415b9996df7e3cb6dcd787'><span className={classes.garri}>African Red Pepper …</span></Link></p><br/>

                <p>Also known as cayenne pepper or chili pepper, the Red pepper is a popular spice used in cuisines all around the world. It adds a fiery kick to dishes and is known for its distinct flavor and aroma. </p><br/>

                <p>It is widely used in West and Central Africa with a special reputation for packing quite a punch when added to traditional stews, soups like ugu, sauces, and other delicacies.</p><br/>

                <p> You can visit abiom supplies to order your premium African pepper and add some African spice to your meals.</p>


                <button><Link href='https://blog.abiomsupply.com/2023/04/26/the-spicy-truth-about-red-pepper-health-benefits-and-dangers/'>Read More</Link> </button>
            </div>
            <div className={classes.figure}>
                <img src='https://images.unsplash.com/photo-1575399872684-f6a363abd3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='The Spicy Truth About Red Pepper: Health Benefits and Dangers' />
            </div>
        </div>
    )
}

export default SingleProductCardTwo