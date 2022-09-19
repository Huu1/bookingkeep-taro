
export default function getBaseUrl () {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3000'
  } else {
    // 生产环境

    BASE_URL = 'https://*********'

  }
  return BASE_URL;
}
