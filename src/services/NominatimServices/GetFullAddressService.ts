import axios, { AxiosResponse } from "axios";
import {
  FullAddress,
  NominatimCoords,
  NominatimAxiosData,
} from "../../@types/NominatimTypes";
import { IServiceExecute } from "../../@types/ServiceTypes";

export interface GetFullAddressService
  extends IServiceExecute<NominatimCoords, FullAddress> {}

export class GetFullAddressServiceImpl implements GetFullAddressService {
  private mountURL({ latitude, longitude }: NominatimCoords): string {
    const URL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    return URL;
  }

  async execute({
    latitude,
    longitude,
  }: NominatimCoords): Promise<FullAddress> {
    const URL = this.mountURL({ latitude, longitude });

    const { data }: AxiosResponse<NominatimAxiosData> = await axios.get(URL);

    return data.display_name;
  }
}
