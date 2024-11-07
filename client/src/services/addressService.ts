import axios from "axios";

interface InputValues {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AutocompleteResponse {
  addresses: Address[];
}

interface SubmitResponse {
  ok: boolean;
  message?: string;
}

class AddressService {
  private readonly baseUrl = "http://localhost:8080/api/address";

  // Fetch autocomplete suggestions based on input values
  async fetchAutocompleteData(
    inputValues: InputValues
  ): Promise<AutocompleteResponse> {
    const response = await axios.get<AutocompleteResponse>(
      `${this.baseUrl}/autocomplete`,
      {
        params: inputValues,
      }
    );
    return response.data;
  }

  // Submit form data to validate the address
  async submitAddress(inputValues: InputValues): Promise<SubmitResponse> {
    const response = await axios.post<SubmitResponse>(this.baseUrl, {
      address: inputValues,
    });
    return response.data;
  }
}

export default new AddressService();
