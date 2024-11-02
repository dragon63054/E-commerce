import AddressForm, { AddressFormValues } from "@/components/ui/address-form";
import BillingForm from "@/components/ui/billing-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Payment() {
  const [activeTab, setActiveTab] = useState("address");

  function onAddressFormSubmit(data: AddressFormValues) {
    console.log(data);
    setActiveTab("billing");
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Tabs defaultValue="address" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="address" className="flex-1 text-center">Address</TabsTrigger>
          <TabsTrigger value="billing" className="flex-1 text-center">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="address">
          <AddressForm onFormSubmit={onAddressFormSubmit} />
        </TabsContent>
        <TabsContent value="billing">
          <BillingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}