// "use client";
import Header from "@/components/Header";

interface UserData {
    id: string;
    phoneNumber: string;
    role: string;
    status: string;
    isVerified: boolean;
    registeredAt: string;
    wallet: {
        balance: number;
        totalCashback: number;
        totalReferralBonus: number;
        totalEarned: number;
    };
    referral: {
        referralCode: string;
        referralLink: string;
        referredCount: number;
        referralPurchases: number;
    };
}

const user: UserData = {
    id: "da1ca934-40ad-4724-8af7-4c47d2806817",
    phoneNumber: "998900000000",
    role: "CUSTOMER",
    status: "ACTIVE",
    isVerified: true,
    registeredAt: "2026-02-16T13:49:29.039561",
    wallet: {
        balance: 0,
        totalCashback: 0,
        totalReferralBonus: 0,
        totalEarned: 0,
    },
    referral: {
        referralCode: "F9E7A39B",
        referralLink: "https://uzpolis.uz/ref/F9E7A39B",
        referredCount: 0,
        referralPurchases: 0,
    },
};

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="max-w-6xl  mx-auto mt-20 p-4 sm:p-6 md:p-8 space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold text-gray-800">User Info</h2>
                        <p className="text-gray-600 font-mono">{user.phoneNumber}</p>
                        <p className="text-gray-500 text-sm">
                            Registered: {new Date(user.registeredAt).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-sm">Role: {user.role}</p>
                        <p className="text-gray-500 text-sm">
                            Verified: {user.isVerified ? "✅ Yes" : "❌ No"}
                        </p>
                    </div>
                    {/* <Badge
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              user.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {user.status}
          </Badge> */}
                </div>

                {/* Wallet Section */}
                {/* <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(user.wallet).map(([key, value]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
                  <span className="text-gray-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-lg font-bold text-gray-800">{value} UZS</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white text-xs rounded-md p-2">
                {`Your ${key.replace(/([A-Z])/g, ' $1')}`}
              </TooltipContent>
            </Tooltip>
          ))}
        </div> */}

                {/* Referral Section */}
                <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <span className="text-gray-500 text-sm">Referral Code</span>
                        <span className="text-lg font-bold text-gray-800">{user.referral.referralCode}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <span className="text-gray-500 text-sm">Referral Link</span>
                        <a
                            href={user.referral.referralLink}
                            target="_blank"
                            className="text-blue-500 text-sm hover:underline break-all text-center"
                        >
                            {user.referral.referralLink}
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <span className="text-gray-500 text-sm">Referred Users</span>
                        <span className="text-lg font-bold text-gray-800">{user.referral.referredCount}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <span className="text-gray-500 text-sm">Referral Purchases</span>
                        <span className="text-lg font-bold text-gray-800">{user.referral.referralPurchases}</span>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
}
