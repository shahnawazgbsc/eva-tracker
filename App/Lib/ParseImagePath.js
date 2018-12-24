import AppConfig from '../Config/AppConfig'

export default function (path: string) {
  return AppConfig.baseUrl + path.split('\\').join('/')
}
