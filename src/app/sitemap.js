import { site } from "@/data/site";
import { services } from "@/data/services";

export default function sitemap() {
  const routes = ["", "/services", "/work", "/contact", "/terms"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    })
  );

  const serviceRoutes = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
