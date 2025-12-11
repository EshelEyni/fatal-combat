<template>
   <InviteMessagePopUp />

   <div class="about-wrapper">
      <p class="about-text">
         Hi, I'm <strong>Eshel Eyni</strong> — full-stack developer and creator of
         <em>Fatal Combat</em>. I build modern apps with <strong>Vue</strong>,
         <strong>React</strong>, <strong>TS</strong>, <strong>Node</strong>, and
         <strong>Python/FastAPI</strong>.
      </p>

      <p class="about-text">
         I enjoy mixing clean engineering with creative design — from realtime systems to game
         engines.
      </p>
      <p class="about-text">
         The core canvas gameplay is based on the amazing tutorial by Chris Courses — you can watch
         it
         <a
            class="about-link"
            href="https://www.youtube.com/watch?v=vyqbNFMDRGQ&t=13500s"
            target="_blank"
            rel="noopener noreferrer"
            >here on YouTube</a
         >. On top of that base, I built everything else — the UI, the server and authentication
         system, online multiplayer using WebSockets, and a custom AI engine to complete the full
         game experience.
      </p>

      <h2 class="about-subtitle">More About Me</h2>

      <p class="about-text">Want to connect or see more of my work? Find me here:</p>

      <ul class="about-links">
         <li>
            <a
               class="about-link"
               href="https://www.linkedin.com/in/eshel-eyni-71982b220/"
               target="_blank"
            >
               🔗 LinkedIn — Eshel Eyni
            </a>
         </li>
         <li>
            <a class="about-link" href="https://www.esheleyni.com/home" target="_blank">
               🌐 Personal Website — esheleyni.com
            </a>
         </li>
      </ul>

      <p class="about-text">Thanks for visiting! Enjoy exploring <strong>Fatal Combat</strong>.</p>
   </div>
</template>

<script setup lang="ts">
import InviteMessagePopUp from "../../components/InviteMessagePopUp.vue";
</script>

<style scoped>
.about-wrapper {
   max-width: 800px;
   color: white;
   line-height: 1.6;
}

.about-subtitle {
   font-size: 1.8rem;
   margin-top: 2rem;
   margin-bottom: 1rem;
   color: var(--p-primary-400, #66bb6a);
}

.about-text {
   margin-bottom: 1rem;
   font-size: 1.2rem;
}

.about-links {
   margin-top: 1rem;
   margin-bottom: 2rem;
   list-style: none;
   padding: 0;
}

.about-links li {
   margin-bottom: 0.8rem;
}

.about-link {
   color: var(--p-primary-300, #81c784);
   font-size: 1.2rem;
   text-decoration: none;
}

.about-link:hover {
   text-decoration: underline;
}
</style>
