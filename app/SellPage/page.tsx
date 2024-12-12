import AppPromotion from "@/components/app-promotion";
import { Footer } from "@/components/footer";
import { ECommerceNav } from "@/components/navbar-for-all";
import SellPage from "@/components/sell";

export default function Page() {
    return (
        <div>
            <ECommerceNav/>
            <SellPage/>
            <AppPromotion/>
            <Footer/>
        </div>
    )
}