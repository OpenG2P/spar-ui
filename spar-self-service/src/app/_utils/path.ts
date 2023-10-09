import config from "../../../public/config.json";

export function prefixRootPath(path: string) {
  return config.rootPath + path;
}
