import Request from "./Request";

export default class GetInfoRequest extends Request {
  // 🔁 Unified URL generator for consistency
  static buildPath(pathSuffix = "") {
    const basePath =
      import.meta.env?.VITE_PANEL_DOMAIN || window.location.origin;
    const pathname = window.location.pathname.split("#")[0];
    return `${basePath}${pathname}${pathSuffix}`;
  }

  // 📦 Get user subscription & usage info
  static async getInfo() {
    const url = this.buildPath("/info");

    try {
      return await GetInfoRequest.send(url, "GET", {}, {
        toastError: true,
      });
    } catch (error) {
      console.error("❌ Error fetching subscription info:", error);
      throw error;
    }
  }

  // 📦 Get raw config list (fallback for when `.links` not present)
  static async getConfigs() {
    const url = this.buildPath();

    try {
      return await GetInfoRequest.send(url, "GET", {}, {
        toastError: true,
      });
    } catch (error) {
      console.error("❌ Error fetching configs:", error);
      throw error;
    }
  }
}
