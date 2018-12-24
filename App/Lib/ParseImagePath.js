import AppConfig from '../Config/AppConfig'

export default function (path: string) {
  return AppConfig.baseUrl + 'etracker/' + path.split('\\').join('/')
}
