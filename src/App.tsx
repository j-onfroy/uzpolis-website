// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
// import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import "@/i18n/index";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layout/MainLayout";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import SubCategoryInfo from "./pages/SubCategoryInfo";
import { ProductInfo } from "./pages/ProductInfo";
import InsuranceRegistration from "./components/InsuranceRegistration";
import OsagoResult from "./pages/OsagoResult";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();
const App = () => {

  return (<QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
    {/* <Toaster position="top-right" /> */}
    <Toaster />

    {/* <Sonner /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/" index element={<Index />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/register" element={<InsuranceRegistration />} />

          <Route path="/category/sub/:url" element={<SubCategory/>} />
          <Route path="/service/:id/:subSlog" element={<SubCategoryInfo/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:productId" element={<ProductInfo/>} />
          <Route path="/osago/result" element={<OsagoResult />} />
          <Route path="/osago/payment" element={<PaymentPage />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
  )
};

export default App;
