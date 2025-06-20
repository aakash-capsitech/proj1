import Footer from '../components/Footer'
import Updated from '../components/Updated'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Prowess from '../components/Prowess'
import Body from '../components/Body'
import Copyright from '../components/Copyright'
import Header from '../components/Header'
import Working from '../components/Working'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div className=''>
        <Header />
        <Body />
        {/* <Prowess /> */}
        <Services />
        <Working />
        <Portfolio />
        <Updated />
        <Contact />
        <Footer />
        <Copyright />
    </div>
  )
}

export default Home