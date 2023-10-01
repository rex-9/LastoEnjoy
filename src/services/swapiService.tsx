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

  public async getHomeworld(url: string): Promise<any> {
    const data = axios.get(url).then((response) => response.data);
    console.log("Home World Data", data);
    return data;
  }
}

export default SwapiService.getInstance();
