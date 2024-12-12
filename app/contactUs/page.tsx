import { ContactPage } from "@/components/contact-us";
import { Footer } from "@/components/footer";
import { ECommerceNav } from "@/components/navbar-for-all";


export default function Page() {
    return (
      <div> 
        <ECommerceNav/>
        <ContactPage />
        <Footer />
      </div>
    )
  }