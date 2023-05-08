import {postPayload,postFormdata,putFormdata,deleteFormdata,getString} from '@/util/api.js'
export function pageHome(data) {
  return getString('/index',data)
}


