import { Card } from "@/components/ui/card";
import { SellForm } from "@/components/sell/Sellform";
import { useAuthStore } from '@/lib/hooks/use-auth';


export default function Sell() {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    throw new Error("Unauthorized");
  }
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
