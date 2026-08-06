 import { memo } from 'react';
 import ServicePromoBanner from '@/components/ui/banner';
import PopularServices from '@/components/ui/popularServices';

 const home = () => {
   return (
     <div>
   <ServicePromoBanner></ServicePromoBanner>
   <PopularServices></PopularServices>
     </div>
   );
 };
 
 export default memo(home);