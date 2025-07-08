import Header from "./components/header"
import CardsMap from './components/cards_map'
import Footer from "./components/footer"
const Page = () => {
  return (
    <div>
      <Header/>
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