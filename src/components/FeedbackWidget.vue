<template>
  <div v-if="!isDismissed" class="feedback-widget">
    <!-- Floating Circle Button -->
    <div 
      v-if="!showCallout" 
      class="feedback-circle"
      @click="toggleCallout"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      title="Share your feedback"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      <!-- Tooltip Message -->
      <div v-if="showTooltip && !showCallout" class="tooltip-message">
        Hey, you got a minute to help us help you?
        <div class="tooltip-arrow"></div>
        <button class="tooltip-close" @click="showTooltip = false" title="Close">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Callout Card -->
    <div v-if="showCallout" class="feedback-callout">
      <button class="close-btn" @click="closeCallout" title="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <div class="callout-content">
        <div class="callout-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="callout-text">
          <h3>Hey, you got a minute to help us help you?</h3>
          <p>Share your thoughts and help us make this tool even better for everyone!</p>
        </div>
        
        <div class="callout-actions">
          <button class="feedback-btn" @click="openFeedbackForm">
            Share Feedback
          </button>
          <button class="dismiss-btn" @click="dismissWidget">
            Don't show again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showCallout = ref(false)
const isDismissed = ref(false)
const showTooltip = ref(false)

// Check if user has dismissed the widget in current session
onMounted(() => {
  const dismissed = sessionStorage.getItem('feedback-widget-dismissed')
  if (dismissed === 'true') {
    isDismissed.value = true
  } else {
    // Show tooltip automatically after 5 seconds
    setTimeout(() => {
      if (!isDismissed.value && !showCallout.value) {
        showTooltip.value = true
        
        // Hide tooltip after 8 seconds
        setTimeout(() => {
          showTooltip.value = false
        }, 8000)
      }
    }, 5000)
  }
})

const toggleCallout = () => {
  showCallout.value = !showCallout.value
}

const closeCallout = () => {
  showCallout.value = false
}

const openFeedbackForm = () => {
  window.open('https://tally.so/r/3yLZvx', '_blank')
  showCallout.value = false
}

const dismissWidget = () => {
  isDismissed.value = true
  sessionStorage.setItem('feedback-widget-dismissed', 'true')
}
</script>

<style scoped>
.feedback-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.feedback-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  border: none;
  outline: none;
}

.feedback-circle:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
}

.feedback-circle:active {
  transform: translateY(0) scale(0.98);
}

.tooltip-message {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: #1e293b;
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: tooltipFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  width: 280px;
  max-width: calc(100vw - 48px);
  white-space: normal;
  line-height: 1.4;
}

.tooltip-arrow {
  position: absolute;
  bottom: -6px;
  right: 20px;
  width: 12px;
  height: 12px;
  background: #1e293b;
  transform: rotate(45deg);
}

.tooltip-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.7);
}

.tooltip-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feedback-callout {
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 320px;
  max-width: calc(100vw - 48px);
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.callout-content {
  padding: 24px;
}

.callout-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: white;
}

.callout-text h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
}

.callout-text p {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

.callout-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feedback-btn {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.feedback-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.feedback-btn:active {
  transform: translateY(0);
}

.dismiss-btn {
  background: transparent;
  color: #64748b;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.dismiss-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #374151;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .feedback-widget {
    bottom: 20px;
    right: 20px;
  }
  
  .feedback-circle {
    width: 52px;
    height: 52px;
  }
  
  .feedback-callout {
    width: 280px;
    max-width: calc(100vw - 40px);
  }
  
  .callout-content {
    padding: 20px;
  }
  
  .callout-text h3 {
    font-size: 16px;
  }
  
  .callout-text p {
    font-size: 13px;
  }
  
  .tooltip-message {
    max-width: 200px;
    font-size: 13px;
    padding: 10px 14px;
  }
}

@media (max-width: 480px) {
  .feedback-widget {
    bottom: 16px;
    right: 16px;
  }
  
  .feedback-circle {
    width: 48px;
    height: 48px;
  }
  
  .feedback-callout {
    width: 260px;
    max-width: calc(100vw - 32px);
  }
}
</style>
