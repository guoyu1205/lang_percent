import request from '../utils/request'

// ��ȡ���������ۣ���ƽ���飩����װ���������ṹ
export async function fetchDiscussionComments(activityId) {
  const res = await request.get(`/discussion/comments/${activityId}`)
  if (!res.data || !Array.isArray(res.data)) return []
  const flat = res.data
  // һ�����ۣ�parentIdΪnull
  const map = {}
  flat.forEach(item => {
    map[item.id] = { ...item, replies: [] }
  })
  const tree = []
  flat.forEach(item => {
    if (!item.parentId) {
      tree.push(map[item.id])
    } else if (map[item.parentId]) {
      // ��������
      map[item.parentId].replies.push(map[item.id])
    }
  })
  return tree
}

// �������������ۣ�һ���������parentId/replyTo Ϊ�ջ� null ��ʾһ�����ۣ�
export async function sendDiscussionComment({ activityId, userId, userName, content, anonymous = false, parentId = null, replyTo = null, time, role }) {
  return request.post('/discussion/comments/comment', {
    activityId,
    userId,
    userName,
    content,
    anonymous,
    parentId,
    replyTo,
    time,
    role
  })
} 