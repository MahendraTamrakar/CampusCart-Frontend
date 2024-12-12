import FAQPage from "@/components/faq";
import { Footer } from "@/components/footer";
import { ECommerceNav } from "@/components/navbar-for-all";

export default function Page() {
    return (
        <div>
            <ECommerceNav />
            <FAQPage />
            <Footer />
        </div>
    )
}