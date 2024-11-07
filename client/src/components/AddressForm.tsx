import React, { useState } from "react";
import AddressService from "../services/addressService";
import InputField from "./InputField/InputField";
import Message from "./Message";
import Button from "./Button/Button";

interface InputValues {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AutocompleteData {
  street: string[];
  city: string[];
  state: string[];
  postalCode: string[];
  country: string[];
}

const AddressForm: React.FC = () => {
  const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>({
    street: [],
    city: [],
    state: [],
    postalCode: [],
    country: [],
  });
  const [inputValues, setInputValues] = useState<InputValues>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [message, setMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);

  // Fetch autocomplete suggestions based on current input values
  const fetchAutocompleteData = async () => {
    try {
      const data = await AddressService.fetchAutocompleteData(inputValues);
      setAutocompleteData({
        street: Array.from(
          new Set(data.addresses.map((address) => address.street))
        ),
        city: Array.from(
          new Set(data.addresses.map((address) => address.city))
        ),
        state: Array.from(
          new Set(data.addresses.map((address) => address.state))
        ),
        postalCode: Array.from(
          new Set(data.addresses.map((address) => address.postalCode))
        ),
        country: Array.from(
          new Set(data.addresses.map((address) => address.country))
        ),
      });
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
      setMessage({ text: "Error fetching autocomplete data", success: false });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await AddressService.submitAddress(inputValues);
      setMessage({
        text: data.ok
          ? "Address validated and submitted successfully!"
          : data.message || "Validation failed.",
        success: data.ok,
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setMessage({
        text: error.response?.data?.message || "Submission failed.",
        success: false,
      });
    }
  };

  // Reset form and clear data
  const handleResetForm = () => {
    setInputValues({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setAutocompleteData({
      street: [],
      city: [],
      state: [],
      postalCode: [],
      country: [],
    });
    setMessage(null);
  };

  return (
    <div className="AddressForm">
      {message && <Message text={message.text} success={message.success} />}
      <form onSubmit={handleFormSubmit}>
        {["street", "city", "state", "postalCode", "country"].map((field) => (
          <InputField
            key={field}
            field={field as keyof InputValues}
            value={inputValues[field as keyof InputValues]}
            onChange={(name, value) => {
              setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value,
              }));
              fetchAutocompleteData();
            }}
            suggestions={autocompleteData[field as keyof AutocompleteData]}
          />
        ))}
        <Button type="submit" label="Continue" color="primary" />
        <Button
          type="button"
          label="Reset Form"
          color="secondary"
          onClick={handleResetForm}
        />
      </form>
    </div>
  );
};

export default AddressForm;
