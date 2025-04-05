 
import classes from './addtoCartBtn.module.css'

function AddtoCartBtn(){
    
    function displayCartBtn(){
        alert('hello')
    }
    return(
        <button className={classes.itemBody} onClick={displayCartBtn}>Add to Cart</button>
      
    )
}

export default AddtoCartBtn