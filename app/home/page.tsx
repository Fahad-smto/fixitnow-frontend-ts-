 import { memo } from 'react';
 import ServicePromoBanner from '@/components/ui/banner';
import PopularServices from '@/components/ui/popularServices';
import TechnicianTrust from '@/components/ui/TechnicianTrust';
import Footer from '@/components/ui/footer';
import HowItWorks from '@/components/ui/howItWorks';
import HeroSlider from '@/components/ui/heroSlider';
import FeatureSection from '@/components/ui/FeatureSection';

 const home = () => {
   return (
     <div>
   {/* <HeroSlider></HeroSlider> */}
   <ServicePromoBanner></ServicePromoBanner>
   <PopularServices></PopularServices>
   <FeatureSection></FeatureSection>
   <HowItWorks></HowItWorks>
   <TechnicianTrust></TechnicianTrust>
   <Footer></Footer>
     </div>
   );
 };
 
 export default memo(home);