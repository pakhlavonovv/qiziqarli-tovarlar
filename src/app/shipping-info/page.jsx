import Header from "../components/header"
import Footer from "../components/footer"
import '../components/style.css'

const shipping_info = [
    {title: '- Shipping Methods', subtitle: 'Standard Shipping: Delivered in 5-7 business days.'},
    {title: '- Shipping Costs', subtitle: 'Shipping cost is calculated based on your shipping address and order size and will be added to the order amount and product fee at checkout.'},
    {title: '- Processing Time', subtitle: 'Orders are processed within 1-2 business days. Please note that processing time does not include weekends or holidays.'},
    {title: '- Estimated Delivery Time', subtitle: 'Estimated delivery time varies depending on your location: Local: 4-6 business days. International: 7-18 business days.'},
    {title: '- Delivery Restrictions', subtitle: 'Attention! If your product delivery address is limited to us, you will receive a 100% refund and a refund message will be sent to your email.'},
    {title: '- Order Tracking', subtitle: 'Once your order has shipped, you will receive an email with your tracking number and a link to track your order.'},
    {title: '- Shipping Address', subtitle: 'Please make sure that your shipping address is complete and accurate to avoid delivery delays. We are not responsible for orders lost due to incorrect addresses.'},
    {title: '- International Shipping', subtitle: 'International orders may be subject to customs fees, taxes, or import duties, which are the responsibility of the customer.'},
    {title: '- Shipping Insurance', subtitle: 'All orders are shipped with insurance to protect against damage or loss during transit. If your item is damaged or lost, please contact us for assistance.'},
    {title: '- Customer Support', subtitle: 'If you have any questions regarding shipping or need assistance, please contact our customer support team at abdullokhpakhlavonov@gmail.com or call +998 (90) 766-13-03'},
]

const Page = () => {
  return (
    <>
      <div className="mb-3">
        <Header />
      </div>
      <div className="container">
        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] text-center mb-4">Shipping Information</h1>
        {shipping_info.map((item, index) => (
          <div key={index} className="grid grid-cols-1 gap-1 mb-2 sm:mb-4 md:w-[80%] lg:w-[60%]">
            <h3 className="font-semibold text-[16px] sm:text-[18px] lg:text-[20px]">{item.title}</h3>
            <p className="text-gray-700 text-[13px] sm:text-[15px] lg:text-[17px]">{item.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
      <Footer />
      </div>
    </>
  )
}

export default Page
