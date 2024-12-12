import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function AppPromotion() {
  return (
    <div className="bg-[#ffffe0] font-mono py-12">
      <Card className="max-w-6xl mx-auto overflow-hidden bg-[#FFF0D9] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-8">
          <div className="w-full md:w-1/3">
            
              <Image
                src="/images/app-interface.png"
                alt="CampusCart App Interface"
                width={800}
                height={800}
                className="w-full h-auto"
              />
            
          </div>
          
          <div className="w-full md:w-1/3 space-y-4 text-center md:text-left">
            <h2 className="text-3xl text-black font-bold">TRY THE CAMPUSCART APP</h2>
            <p className="text-lg text-black">
              Buy, sell and find just about anything using the app on your mobile.
            </p>
          </div>

          <div className="w-full md:w-1/3 space-y-4">
            <h3 className="text-xl font-bold text-black text-center">COMING SOON!</h3>
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 justify-center">
              <Button 
                variant="outline" 
                className="h-14 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-colors"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
                  <Image
                    src="/images/appstore.png"
                    alt="Download on the App Store"
                    width={200}
                    height={40}
                    className="h-full w-auto"
                  />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-colors"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                  <Image
                    src="/images/googleplay.png"
                    alt="Get it on Google Play"
                    width={200}
                    height={40}
                    className="h-full w-auto"
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

