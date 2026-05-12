import Header from '@/components/Header'
import MobileDock from '@/components/MobileDock'
import { useIsMobile } from '@/hooks/use-mobile'
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
