import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'HopAsean | From connection to market',description:'Evidence-led partner discovery and a simulated Malaysia to Jakarta market pilot.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
