import AppConfig from '../Config/AppConfig'

export default function (path: string) {
  if (path.startsWith('file')) return path
  else return AppConfig.baseUrl + 'etracker/' + path.split('\\').join('/')
}
