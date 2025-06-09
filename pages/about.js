import AboutSection from "@/component/aboutSection"
import AboutBanner from "@/component/banner/aboutBanner"
import Layout from "@/component/layout/layout"

function About(props){
    return (
      <Layout categories={props.categories} products={props.products}>
        <AboutBanner />
        <AboutSection />
      </Layout>
    );
}

export default About