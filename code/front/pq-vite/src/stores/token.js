// ���ڴ洢�͹���token�ļ�ģ��

// ����token��key������ͳһ����
const TOKEN_KEY = 'token'

// ����token��localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

// ��localStorage��ȡtoken
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

// ���token
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
