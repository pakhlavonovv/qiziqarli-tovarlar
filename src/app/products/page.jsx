import Header from "../components/header"
import CardsMap from "../components/cards_map"
import Footer from "../components/footer"

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-11">
        <Header />
      </div>
      <div className="flex-grow mb-8">
        <CardsMap />
      </div>
      <Footer />
    </div>
  )
}

export default Page
