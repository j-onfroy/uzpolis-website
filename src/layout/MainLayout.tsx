import Header from '@/components/Header'
import MobileDock from '@/components/MobileDock'
import DropLang from '@/components/ui/drop-lang'
import { useIsMobile } from '@/hooks/use-mobile'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    const isMobile = useIsMobile()
    return (
        <>
            {
                !isMobile ?
                <Header />
                : <DropLang/>
            }
            <Outlet />
            {
                isMobile &&
                <MobileDock />
            }
        </>
    )
}

export default MainLayout
