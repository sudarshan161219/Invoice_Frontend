import type { FC, ReactElement } from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const SettingsPage: FC = (): ReactElement => {
  const [currency, setCurrency] = useState("USD");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account, business, and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
            <TabsTrigger value="invoice">Invoice Settings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-4">
              <Input placeholder="Business Name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Phone" />
              <Textarea placeholder="Business Address" />
              <Input placeholder="Tax ID / GSTIN" />
            </div>
          </TabsContent>

          <TabsContent value="invoice">
            <div className="grid gap-4">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Default Tax Rate (%)" />
              <Input placeholder="Invoice Prefix (e.g. INV-)" />
              <Textarea placeholder="Default Invoice Notes" />
              <Textarea placeholder="Payment Instructions" />
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid gap-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email" disabled />
              <Input type="password" placeholder="New Password" />
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="paid" />
                <label htmlFor="paid">Notify me when invoice is paid</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="reminder" />
                <label htmlFor="reminder">
                  Send reminder 3 days before due
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="summary" />
                <label htmlFor="summary">Weekly summary email</label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-6">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};
