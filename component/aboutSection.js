import CoreValue from '@/icons/coreValue'
import MissionIcon from '@/icons/mission'
import VisonIcon from '@/icons/vision'
import classes from './aboutSection.module.css'
function AboutSection() {
    return (
        <div className={classes.sectionAbout}>
            <div className={classes.figure}>

            </div>
            <div className={classes.section}>
                <div className={classes.mission}>
                    <MissionIcon />
                    <h2>Mission Statement</h2>
                    
                    <p>We are committed advanced/superior
                        services, competitive pricing and
                        providing our customer value, quality
                        and freshest products.</p>
                </div>
                <div className={classes.vision}>
                    <VisonIcon />
                    <h2> Vision</h2>
                    <p>Our vision is to be a household name
                        in online supplies and services.</p>
                </div>
                <div className={classes.value}>
                    <CoreValue />
                    <h2>Core Value</h2>
                    <p>We believe and insist on honesty and
                        truthfulness with our customers,
                        vendors and colleagues.
                        We value our customers opinion and
                        perspectives.</p>
                </div>


            </div>
        </div>
    )
}
export default AboutSection