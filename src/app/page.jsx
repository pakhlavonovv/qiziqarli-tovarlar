import Header from "./components/header"
import Carousel from './components/carousel'
import CardsMap from './components/cards_map'
const Page = () => {
  return (
    <div>
      <Header/>
      <Carousel/>
      <p className="container mt-1 text-center text-[10px] sm:text-[14px] md:text-[16px]">Floxsy.com Trade Assurance protects you from payment to delivery.</p>
      <div className="mt-[20px] sm:mt-[60px] md:mt-[80px] lg:mt-[100px]">
      <CardsMap/>
      </div>
    </div>
  )
}

export default Page