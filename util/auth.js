/**
 * @description 权限存储函数
 */
const authorizationKey = 'Authorization'

export function getAuthorization() {
    return uni.getStorageSync(authorizationKey)
}

export function setAuthorization(authorization) {
    return uni.setStorageSync(authorizationKey, authorization)
}

export function removeAuthorization(authorization) {
    return uni.removeStorageSync(authorizationKey)
}