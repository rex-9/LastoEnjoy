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
        return "0B53" + id + id;
      case "1":
        return "A" + id + id;
      case "2":
        return "B" + id + id;
      case "3":
        return "C" + id + id;
      case "4":
        return "D" + id + id;
      case "5":
        return "E" + id + id;
      case "6":
        return "ABBB" + id + id;
      case "7":
        return "BCCC" + id + id;
      case "8":
        return "CDDD" + id + id;
      case "9":
        return "DEEE" + id + id;
      case "10":
        return "EFFF" + id + id;
      case "11":
        return "ACCC" + id + id;
      case "12":
        return "BDDD" + id + id;
      case "13":
        return "CEEE" + id + id;
      case "14":
        return "DFFF" + id + id;
      case "15":
        return "EAAA" + id + id;
      case "16":
        return "ADDD" + id + id;
      case "17":
        return "BEEE" + id + id;
      case "18":
        return "CFFF" + id + id;
      case "19":
        return "DAAA" + id + id;
      case "20":
        return "EBBB" + id + id;
      default:
        return "black";
    }
  };
}

export default HelperService.getInstance();
