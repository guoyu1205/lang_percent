<!-- 此页面为“老师”点击主页面某一具体活动后跳转，显示活动信息、PPT预览、活动详情、底部导航 -->
<template>
  <div class="speech-page">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <el-button class="back-btn" @click="$router.back()" link>
        <el-icon size="20"><ArrowLeft /></el-icon>
      </el-button>
      <div class="nav-title">
        <span>{{ activity.title }}</span>
        <el-tag
          :type="getStatusType(activity.status)"
          size="small"
          class="status-tag"
          >{{ getStatusText(activity.status) }}</el-tag
        >
      </div>
    </div>
    <!-- 活动简介小字 -->
    <div class="activity-content-brief" :title="activity.content">
      {{ activity.content }}
    </div>
    <!-- 内容区 -->

    <el-scrollbar max-height="560px">
      <div class="main-content">
        <!-- 活动详情 -->
        <div class="detail-content">
          <div class="invite-code">邀请码：{{ activity.inviteCode }}</div>
          <ul class="activity-detail-list">
            <li><span class="item-label">标题：</span>{{ activity.title }}</li>
            <!-- <li><span class="item-label">内容：</span>{{ activity.content }}</li> -->
            <li>
              <span class="item-label">地点：</span>{{ activity.location }}
            </li>
            <li><span class="item-label">时间：</span></li>
            <li>{{ activity.startTime }} ~ {{ activity.endTime }}</li>
            <li><span class="item-label">人数：</span>{{ activity.curNum }}</li>
            <!-- <li><span class="item-label">状态：</span><el-tag :type="getStatusType(activity.status)" size="small" class="status-tag">{{ getStatusText(activity.status) }}</el-tag></li> -->
          </ul>
        </div>
        <!-- PPT预览框 /////////////////////////////////-->
        <div class="ppt-preview">
          <template v-if="activity.pptUrl">
            <iframe
              :src="`${activity.pptUrl}?x-oss-process=document/preview`"
              class="ppt-iframe"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </template>
          <div v-else class="ppt-placeholder">暂无PPT课件</div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 底部导航栏 -->
    <div class="bottom-nav-student">
      <div
        class="nav-item"
        :class="[
          { active: activeTab === 'popquiz' },
          { active: $route.path.includes('popquizTeacher') },
        ]"
        @click="
          activeTab = 'popquiz';
          $router.push('/popquizTeacher');
        "
      >
        <el-icon><Edit /></el-icon>
        <span>教师出题</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'test' }"
        @click="activeTab = 'test'"
      >
        <el-icon><Document /></el-icon>
        <span>测试列表</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'feedback' }"
        @click="activeTab = 'feedback'"
      >
        <el-icon><ChatDotRound /></el-icon>
        <span>反馈</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'comment' }"
        @click="activeTab = 'comment'"
      >
        <el-icon><Comment /></el-icon>
        <span>评论区</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ArrowLeft,
  Document,
  ChatDotRound,
  Comment,
  Edit,
} from "@element-plus/icons-vue";
import { useUserInfoStore } from '../stores/userInfo.js'

const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.info

// 测试PPT链接/////////////////////////
//activity.pptUrl = 'https://pq-ppt-test.oss-cn-shanghai.aliyuncs.com/ppt-test/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8FPPT_%E6%B5%8B%E8%AF%95.ppt'

const activeTab = ref("");
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return "未开始";
    case 1:
      return "进行中";
    case 2:
      return "已结束";
    default:
      return "未知";
  }
};
function getStatusType(status) {
  switch (status) {
    case 0:
      return "primary";
    case 1:
      return "success";
    case 2:
      return "info";
    default:
      return "warning";
  }
}
</script>

<style scoped>
.speech-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.top-nav {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 16px;
  height: 52px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.back-btn {
  color: white;
  margin-right: 12px;
}
.nav-title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  gap: 12px;
}
.status-tag {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
}
.activity-content-brief {
  background-color: #bbbbbb;
  font-size: 0.85rem;
  color: #fff;
  padding: 4px 20px 0 20px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 20px;
}
.ppt-preview {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 220px;
  max-height: 380px;
  margin-bottom: 8px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ppt-iframe {
  width: 100%;
  height: 360px;
  border: none;
}
.ppt-placeholder {
  color: #bbb;
  font-size: 1.1rem;
  text-align: center;
  padding: 40px 0;
}
.detail-content {
  background: #fff;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 350px;
  word-break: break-all;
  margin: 0 auto;
}
.invite-code {
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 18px;
}
.activity-detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.activity-detail-list li {
  text-align: left;
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
  word-break: break-all;
  white-space: pre-line;
}
.activity-detail-list li .item-label {
  font-weight: bold;
  color: #222;
}
.bottom-nav-student {
  background: white;
  border-top: 1px solid #f0f0f0;
  display: flex;
  padding: 8px 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.bottom-nav-student .nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #909399;
}
.bottom-nav-student .nav-item.active {
  color: #409eff;
}
.bottom-nav-student .nav-item span {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
