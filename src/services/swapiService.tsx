import axios from "axios";

class SwapiService {
  private static instance: SwapiService;
  private static BASE_URL = "https://swapi.dev/api";

  private constructor() {}

  public static getInstance(): SwapiService {
    if (!SwapiService.instance) {
      SwapiService.instance = new SwapiService();
    }

    return SwapiService.instance;
  }

  public async getCharacters(context: {
    page: string;
    searchTerm: string;
  }): Promise<any> {
    const getUrl = `${SwapiService.BASE_URL}/people/?page=${context.page}&search=${context.searchTerm}`;
    const response = await axios.get(getUrl);
    console.log("Got Data", response);
    return response.data;
  }

  public async searchCharacters(request: {
    searchTerm: string;
    filters: any;
  }): Promise<any> {
    let filterParams = "";
    for (const key in request.filters) {
      if (request.filters[key]) {
        filterParams += `&${key}=${request.filters[key]}`;
      }
    }
    const searchUrl = `${SwapiService.BASE_URL}/people/?search=${request.searchTerm}`;
    const response = await axios.get(
      searchUrl
      // ${filterParams}`
    );
    console.log("Searched Data", response);
    return response.data;
  }

  public async getHomeworld(url: string): Promise<any> {
    const data = axios.get(url).then((response) => response.data);
    console.log("Data", data);
    return data;
  }
}

export default SwapiService.getInstance();
