<template>
   <div class="invite-card">
      <p class="invite-title">"{{ invite.fromUserName }}" invited you</p>
      <p class="invite-body">"{{ invite.message }}"</p>

      <div class="invite-actions">
         <button class="btn accept" @click="$emit('accept', invite)">Accept</button>
         <button class="btn close" @click="$emit('close', invite)">Close</button>
      </div>
   </div>
</template>

<script setup lang="ts">
defineProps<{ invite: any }>();
defineEmits(["accept", "close"]);
</script>

<style scoped>
.invite-card {
   background: #1b1b1b;
   border: 1px solid #333;
   border-radius: 14px;
   padding: 1.4rem;
   color: #f1f1f1;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
   transition: 0.2s ease;
}

.invite-card:hover {
   transform: translateY(-3px);
}

.invite-title {
   font-size: 1rem;
   margin-bottom: 0.5rem;
   color: #ffd25e;
   text-shadow: 0 0 4px #ff4c29;
}

.invite-body {
   font-size: 0.85rem;
   opacity: 0.85;
}

.invite-actions {
   display: flex;
   justify-content: center;
   gap: 1rem;
   margin-top: 1.8rem;
}

.btn {
   padding: 0.4rem 1rem;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   font-weight: 600;
   font-size: 0.9rem;
   transition: 0.2s;
}

.btn.accept {
   background: #4caf50;
   color: white;
}
.btn.accept:hover {
   background: #69c76b;
}

.btn.close {
   background: #ff9800;
   color: white;
}
.btn.close:hover {
   background: #ffad33;
}
</style>
