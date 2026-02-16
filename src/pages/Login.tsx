import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react";


function Login() {
    const [passportNumber, setPassportNumber] = useState("");

    return (
        <>
            <Header />
            <section id="login" className="py-20 flex items-center m-auto h-full bg-background ">
                <div className="container mx-auto pt-20 px-4 justify-center max-w-xl">
                    <div
                        className={`group relative bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card `}
                        style={{ animationDelay: `${0.1}s` }}
                    >
                        <h3 className="text-xl font-bold text-foreground mb-3">Login</h3>
                        <Input
                            placeholder="93 147 06 08"
                            value={passportNumber}
                            onChange={(e) =>
                                setPassportNumber(e.target.value.replace(/\D/g, "").slice(0, 7))
                            }
                            className="h-14 flex-1 bg-background"
                            required
                            maxLength={7}
                        />
                        <div className="flex items-center justify-between pt-4  border-border">
                            <Button  size="lg" className="w-full" >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
