 import { memo } from 'react';
 import ServicePromoBanner from '@/components/ui/banner';
import PopularServices from '@/components/ui/popularServices';
import TechnicianTrust from '@/components/ui/TechnicianTrust';
import Footer from '@/components/ui/footer';

 const home = () => {
   return (
     <div>
   <ServicePromoBanner></ServicePromoBanner>
   <PopularServices></PopularServices>
   <TechnicianTrust></TechnicianTrust>
   <Footer></Footer>
     </div>
   );
 };
 
 export default memo(home);