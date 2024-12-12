import AppPromotion from "@/components/app-promotion";
import { BuyPage } from "@/components/buy-page";
import { Footer } from "@/components/footer";
import { ECommerceNav } from "@/components/navbar-for-all";

export default function Page() {
  return (
    <div>
    <ECommerceNav/>
    <BuyPage/>
    <AppPromotion />
    <Footer/>
    </div>
  )
}