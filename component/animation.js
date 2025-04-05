import classes from './aniamate.module.css'
function Animation(){
    return(
        <div>
             <div className={classes.animationContainer}>
        <div className={classes.flexAnimation}>
            <div classNmae={classes.animationOne}>
                <img src="https://st2.depositphotos.com/1006318/9844/v/450/depositphotos_98440520-stock-illustration-cloud-doodle-hand-draw-sketch.jpg" width="20%" alt="cloud"/>
            </div>
            
        </div>
        <div className={classes.animationThree}>
            <img src="https://www.pngitem.com/pimgs/m/401-4015327_how-to-draw-lightning-draw-overlapping-clouds-hd.png" width="10%"  alt="cloud"/>
        </div>
    </div>
        </div>
    )
}

export default Animation