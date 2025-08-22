<template>
  <div class="h-screen">
    <!-- Hero Text Overlay -->
    <div
      class="h-screen uppercase items-center w-full absolute z-50 pointer-events-none px-10 flex justify-center flex-col"
    >
      <div class="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
        <div class="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
          <div
            v-for="(word, index) in titleWords"
            :key="index"
            :class="{ 'fade-in': index < visibleWords }"
            :style="{
              animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
              opacity: index < visibleWords ? undefined : 0,
            }"
          >
            {{ word }}
          </div>
        </div>
      </div>
      <div
        class="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold"
      >
        <div
          :class="{ 'fade-in-subtitle': subtitleVisible }"
          :style="{
            animationDelay: `${
              titleWords.length * 0.13 + 0.2 + subtitleDelay
            }s`,
            opacity: subtitleVisible ? undefined : 0,
          }"
        >
          {{ subtitle }}
        </div>
      </div>
    </div>

    <!-- Explore Button -->
    <button class="explore-btn" style="animation-delay: 2.2s">
      Scroll to explore
      <span class="explore-arrow">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow-svg"
        >
          <path
            d="M11 5V17"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M6 12L11 17L16 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>

    <!-- Three.js Canvas -->
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import * as THREE from 'three'

// Constants
const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" };
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" };
const WIDTH = 300;
const HEIGHT = 300;

// Reactive data
const canvasRef = ref<HTMLCanvasElement | null>(null);
const visibleWords = ref(0);
const subtitleVisible = ref(false);
const delays = ref<number[]>([]);
const subtitleDelay = ref(0);

// Computed
const titleWords = computed(() => "Construa seus sonhos".split(" "));
const subtitle = "Criatividade impulsionada por IA para a próxima geração.";

// Three.js variables
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let mesh: THREE.Mesh
let material: THREE.ShaderMaterial
let animationId: number
let clock = new THREE.Clock()

// Animation variables
const mouse = new THREE.Vector2(0, 0)

// Initialize Three.js scene
const initThree = async () => {
  if (!canvasRef.value) return;

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Load textures
  const textureLoader = new THREE.TextureLoader()
  const [rawMap, depthMap] = await Promise.all([
    textureLoader.loadAsync(TEXTUREMAP.src),
    textureLoader.loadAsync(DEPTHMAP.src),
  ]);

  // Shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
      uRawMap: { value: rawMap },
      uDepthMap: { value: depthMap },
      uAspect: { value: WIDTH / HEIGHT },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform sampler2D uRawMap;
      uniform sampler2D uDepthMap;
      uniform float uAspect;
      varying vec2 vUv;

      // Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;
        
        // Depth-based displacement
        float depth = texture2D(uDepthMap, uv).r;
        vec2 displacedUv = uv + depth * uPointer * 0.01;
        vec4 rawColor = texture2D(uRawMap, displacedUv);
        
        // Aspect ratio correction
        vec2 aspectUv = vec2(uv.x * uAspect, uv.y);
        
        // Tiling for dot pattern
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(aspectUv * tiling, 2.0) - 1.0;
        
        // Cell noise for brightness variation
        float brightness = noise(aspectUv * tiling * 0.5);
        
        // Distance for dots
        float dist = length(tiledUv);
        float dot = smoothstep(0.5, 0.49, dist) * brightness;
        
        // Flow effect based on depth and progress
        float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));
        
        // Red scanning mask
        vec3 mask = vec3(dot * flow * vec3(10.0, 0.0, 0.0));
        
        // Screen blend
        vec3 final = rawColor.rgb + mask - rawColor.rgb * mask;
        
        // Scan line effect
        float scanPos = uProgress;
        float scanWidth = 0.05;
        float scanLine = smoothstep(0.0, scanWidth, abs(uv.y - scanPos));
        vec3 redOverlay = vec3(1.0, 0.0, 0.0) * (1.0 - scanLine) * 0.4;
        
        final = mix(final, final + redOverlay, smoothstep(0.9, 1.0, 1.0 - scanLine));
        
        gl_FragColor = vec4(final, 1.0);
      }
    `,
  });

  // Geometry
  const geometry = new THREE.PlaneGeometry(1, 1)

  // Calculate scale to maintain aspect ratio
  const aspect = camera.aspect;
  const scaleFactor = 0.3;
  const scaleX = (WIDTH / HEIGHT) * scaleFactor * aspect;
  const scaleY = scaleFactor;

  mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(scaleX, scaleY, 1);
  scene.add(mesh);

  camera.position.z = 1;

  // Mouse move handler
  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("mousemove", handleMouseMove);

  // Animation loop
  const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;
    material.uniforms.uPointer.value = mouse;
    material.uniforms.uProgress.value = Math.sin(elapsedTime * 0.5) * 0.5 + 0.5;

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };

  animate();

  // Handle resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleResize);
};

// Text animation setup
const setupTextAnimation = () => {
  // Generate random delays for glitch effect
  delays.value = titleWords.value.map(() => Math.random() * 0.07);
  subtitleDelay.value = Math.random() * 0.1;

  // Animate words
  const animateWords = () => {
    if (visibleWords.value < titleWords.value.length) {
      setTimeout(() => {
        visibleWords.value++;
        animateWords();
      }, 600);
    } else {
      setTimeout(() => {
        subtitleVisible.value = true;
      }, 800);
    }
  };

  animateWords();
};

// Lifecycle
onMounted(async () => {
  await initThree();
  setupTextAnimation();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  if (material) {
    material.dispose();
  }
  window.removeEventListener("resize", () => {});
  window.removeEventListener("mousemove", () => {});
});
</script>

<style scoped>
.h-screen {
  height: 100vh;
}

.fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in-subtitle {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.explore-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  z-index: 10;
}

.explore-btn:hover {
  background: rgb(255, 255, 255);
  transform: translateX(-50%) translateY(-2px);
}

.explore-arrow {
  display: flex;
  align-items: center;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-4px);
  }
  60% {
    transform: translateY(-2px);
  }
}

.arrow-svg {
  transition: transform 0.3s ease;
}

.explore-btn:hover .arrow-svg {
  transform: translateY(2px);
}

/* Responsive utilities */
@media (min-width: 768px) {
  .text-3xl {
    font-size: 1.875rem;
  }
  .text-5xl {
    font-size: 3rem;
  }
  .text-xl {
    font-size: 1.25rem;
  }
}

@media (min-width: 1280px) {
  .text-6xl {
    font-size: 3.75rem;
  }
  .text-2xl {
    font-size: 1.5rem;
  }
}

@media (min-width: 1536px) {
  .text-7xl {
    font-size: 4.5rem;
  }
  .text-3xl {
    font-size: 1.875rem;
  }
}

.font-extrabold {
  font-weight: 800;
}
.font-bold {
  font-weight: 700;
}
.uppercase {
  text-transform: uppercase;
}
.overflow-hidden {
  overflow: hidden;
}
.pointer-events-none {
  pointer-events: none;
}
</style>
