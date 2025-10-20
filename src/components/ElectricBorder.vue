<template>
  <div ref="rootRef" :class="`electric-border ${className ?? ''}`" :style="computedStyle">
    <svg ref="svgRef" class="eb-svg" aria-hidden="true" focusable="false">
      <defs>
        <filter :id="filterId" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
          <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
          <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="combinedNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>

    <div class="eb-layers">
      <div ref="strokeRef" class="eb-stroke" />
      <div class="eb-glow-1" />
      <div class="eb-glow-2" />
      <div class="eb-background-glow" />
    </div>

    <div class="eb-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

interface Props {
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#5227FF',
  speed: 1,
  chaos: 1,
  thickness: 2,
  className: '',
  style: () => ({})
});

const filterId = `turbulent-displace-${Math.random().toString(36).substr(2, 9)}`;
const svgRef = ref<SVGSVGElement | null>(null);
const rootRef = ref<HTMLDivElement | null>(null);
const strokeRef = ref<HTMLDivElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const computedStyle = computed(() => {
  return {
    '--electric-border-color': props.color,
    '--eb-border-width': `${props.thickness}px`,
    ...props.style
  };
});

const updateAnim = () => {
  const svg = svgRef.value;
  const host = rootRef.value;
  if (!svg || !host) return;

  if (strokeRef.value) {
    strokeRef.value.style.filter = `url(#${filterId})`;
  }

  const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
  const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

  const dyAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]'));
  if (dyAnims.length >= 2) {
    dyAnims[0].setAttribute('values', `${height}; 0`);
    dyAnims[1].setAttribute('values', `0; -${height}`);
  }

  const dxAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]'));
  if (dxAnims.length >= 2) {
    dxAnims[0].setAttribute('values', `${width}; 0`);
    dxAnims[1].setAttribute('values', `0; -${width}`);
  }

  const baseDur = 6;
  const dur = Math.max(0.001, baseDur / (props.speed || 1));
  [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

  const disp = svg.querySelector('feDisplacementMap');
  if (disp) disp.setAttribute('scale', String(30 * (props.chaos || 1)));

  const filterEl = svg.querySelector<SVGFilterElement>(`#${CSS.escape(filterId)}`);
  if (filterEl) {
    filterEl.setAttribute('x', '-200%');
    filterEl.setAttribute('y', '-200%');
    filterEl.setAttribute('width', '500%');
    filterEl.setAttribute('height', '500%');
  }

  nextTick(() => {
    [...dyAnims, ...dxAnims].forEach((a: any) => {
      if (typeof a.beginElement === 'function') {
        try {
          a.beginElement();
        } catch {}
      }
    });
  });
};

watch([() => props.speed, () => props.chaos], () => {
  updateAnim();
});

onMounted(() => {
  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => updateAnim());
    resizeObserver.observe(rootRef.value);
    updateAnim();
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
@import './ElectricBorder.css';
</style>
