import Header from '@/components/Header'
import MobileDock from '@/components/MobileDock'
import DropLang from '@/components/ui/drop-lang'
import { useIsMobile } from '@/hooks/use-mobile'
import { Footer } from 'react-day-picker'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    const isMobile = useIsMobile()
    return (
        <>
                <Header />
            {isMobile &&
                <br />
            }
            <Outlet />
            {
                isMobile &&
                <MobileDock />
            }
            {/* <Footer/> */}
        </>
    )
}

export default MainLayout
