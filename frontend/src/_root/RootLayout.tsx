import { Outlet } from "react-router-dom";
import { Navbar } from "@/components";

export default function RootLayout() {
  return (
    <div className='h-full'>
        <div className='relative h-full font-sans antialiased'>
          <main className='relative flex flex-col min-h-screen'>
		    <Navbar />
            <div className='flex-grow flex-1'>
			  <Outlet />
            </div>
          </main>
        </div>
    </div>
  );
}
