import classes from './aboutBanner.module.css'
function AboutBanner(){
    return(
        <div className={classes.section}>
            <div className={classes.header}>
                <h1>About Abiom Supplies<br/> International</h1>
            </div>
            <div className={classes.figure}>
        <img
        src="cartWoman.webp"
        alt="shopping"
        />
        
            </div>

        </div>
    )
}

export default AboutBanner