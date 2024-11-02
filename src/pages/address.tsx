import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

interface AddressProps {
  onSubmit: (address: AddressDetails) => void;
}

interface AddressDetails {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const Address: React.FC<AddressProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState<AddressDetails>({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address);
    toast.success('Address submitted successfully!', {
      duration: 2000,
      position: 'bottom-right',
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enter Your Address</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={address.zip}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <Button type="submit" className="w-full">
          Submit Address
        </Button>
      </form>
    </div>
  );
};

export default Address;