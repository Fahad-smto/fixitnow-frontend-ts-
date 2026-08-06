 import { memo } from 'react';
 import ServicePromoBanner from '@/components/ui/banner';
import PopularServices from '@/components/ui/popularServices';
import TechnicianTrust from '@/components/ui/TechnicianTrust';

 const home = () => {
   return (
     <div>
   <ServicePromoBanner></ServicePromoBanner>
   <PopularServices></PopularServices>
   <TechnicianTrust></TechnicianTrust>
     </div>
   );
 };
 
 export default memo(home);