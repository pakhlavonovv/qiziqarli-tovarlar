import Header from "./components/header"
import Carousel from './components/carousel'
import CardsMap from './components/cards_map'
import Footer from "./components/footer"
const Page = () => {
  return (
    <div>
      <Header/>
      <Carousel/>
      <p className="container mt-1 text-center text-[10px] sm:text-[14px] md:text-[16px]">Floxsy.shop Trade Assurance protects you from payment to delivery.</p>
      <div className="mt-[20px] sm:mt-[60px] md:mt-[80px] lg:mt-[100px]">
      <CardsMap/>
      </div>
      <div className="mt-[50px] sm:mt-[60px] md:mt-[80px] lg:mt-[100px]">
      <Footer/>
      </div>
    </div>
  )
}

export default Page