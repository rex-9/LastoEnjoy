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

  public async getCharacters(page: number = 1): Promise<any> {
    const response = await axios.get(
      `${SwapiService.BASE_URL}/people/?page=${page}`
    );
    console.log("Data", response);
    return response.data;
  }

  public async getHomeworld(url: string): Promise<any> {
    const data = axios.get(url).then((response) => response.data);
    console.log("Data", data);
    return data;
  }
}

export default SwapiService.getInstance();
