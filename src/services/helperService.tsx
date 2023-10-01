class HelperService {
  private static instance: HelperService;
  public static getInstance(): HelperService {
    if (!HelperService.instance) {
      HelperService.instance = new HelperService();
    }

    return HelperService.instance;
  }
  numberToColor = (id: string) => {
    switch (id) {
      case "0":
        return "0B53";
      case "1":
        return "A";
      case "2":
        return "B";
      case "3":
        return "C";
      case "4":
        return "D";
      case "5":
        return "E";
      case "6":
        return "F";
      case "7":
        return "G";
      case "8":
        return "H";
      case "9":
        return "I";
      case "10":
        return "J";
      default:
        break;
    }
  };
}

export default HelperService.getInstance();
