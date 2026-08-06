 import { memo } from 'react';
 import ServicePromoBanner from '@/components/ui/banner';

 const home = () => {
   return (
     <div>
   <   ServicePromoBanner></ServicePromoBanner>
     </div>
   );
 };
 
 export default memo(home);