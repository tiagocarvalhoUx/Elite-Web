<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <button
        @click="$router.back()"
        class="p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div>
        <h1 class="text-3xl font-bold text-gradient">
          {{ isEditing ? "Editar Projeto" : "Novo Projeto" }}
        </h1>
        <p class="text-gray-400 mt-1">
          {{
            isEditing
              ? "Atualize as informações do projeto"
              : "Preencha os dados para criar um novo projeto"
          }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Image Upload -->
      <GlassCard variant="dark" :animated="true" title="Imagem do Projeto">
        <div class="space-y-4">
          <!-- Tabs: Upload ou URL -->
          <div class="flex gap-2 mb-4">
            <button
              type="button"
              @click="imageMode = 'upload'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="
                imageMode === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              "
            >
              Upload de Arquivo
            </button>
            <button
              type="button"
              @click="imageMode = 'url'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="
                imageMode === 'url'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              "
            >
              URL da Imagem
            </button>
          </div>

          <!-- Modo URL -->
          <div v-if="imageMode === 'url'" class="space-y-3">
            <input
              v-model="form.image_url"
              type="url"
              class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
              placeholder="https://images.unsplash.com/..."
              @input="onImageUrlInput"
            />
            <p class="text-xs text-gray-500">
              Use URLs do Unsplash, Pexels ou similar
            </p>
            <div v-if="form.image_url && imagePreview" class="relative">
              <img
                :src="imagePreview"
                alt="Preview"
                class="w-full h-64 object-cover rounded-lg"
                @error="onImageUrlError"
              />
            </div>
          </div>

          <!-- Modo Upload -->
          <div
            v-else
            class="relative border-2 border-dashed rounded-xl overflow-hidden transition-all"
            :class="
              imagePreview
                ? 'border-purple-500/50'
                : 'border-white/20 hover:border-white/40'
            "
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageChange"
            />

            <div v-if="!imagePreview" class="p-12 text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p class="text-white font-medium mb-2">
                Clique para fazer upload
              </p>
              <p class="text-gray-400 text-sm">PNG, JPG até 5MB</p>
              <button
                type="button"
                @click="fileInput?.click()"
                class="mt-4 px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-colors"
              >
                Selecionar imagem
              </button>
            </div>

            <div v-else class="relative">
              <img
                :src="imagePreview"
                alt="Preview"
                class="w-full h-64 object-cover"
              />
              <div
                class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <button
                  type="button"
                  @click="removeImage"
                  class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  Remover imagem
                </button>
              </div>
            </div>
          </div>

          <p v-if="errors.image" class="text-red-400 text-sm">
            {{ errors.image }}
          </p>
        </div>
      </GlassCard>

      <!-- Basic Info -->
      <GlassCard
        variant="dark"
        :animated="true"
        :delay="100"
        title="Informações Básicas"
      >
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Título <span class="text-red-400">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-3 bg-black/30 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
              :class="errors.title ? 'border-red-500/50' : 'border-white/10'"
              placeholder="Nome do projeto"
            />
            <p v-if="errors.title" class="text-red-400 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descrição <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full px-4 py-3 bg-black/30 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
              :class="
                errors.description ? 'border-red-500/50' : 'border-white/10'
              "
              placeholder="Descrição do projeto"
            ></textarea>
            <p v-if="errors.description" class="text-red-400 text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Categoria <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.category"
                type="text"
                list="categories"
                class="w-full px-4 py-3 bg-black/30 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                :class="
                  errors.category ? 'border-red-500/50' : 'border-white/10'
                "
                placeholder="Ex: E-commerce, Landing Page"
              />
              <datalist id="categories">
                <option
                  v-for="cat in projectsStore.categories"
                  :key="cat"
                  :value="cat"
                />
              </datalist>
              <p v-if="errors.category" class="text-red-400 text-sm mt-1">
                {{ errors.category }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Link do Projeto <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.project_link"
                type="url"
                class="w-full px-4 py-3 bg-black/30 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                :class="
                  errors.project_link ? 'border-red-500/50' : 'border-white/10'
                "
                placeholder="https://..."
              />
              <p v-if="errors.project_link" class="text-red-400 text-sm mt-1">
                {{ errors.project_link }}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      <!-- Settings -->
      <GlassCard
        variant="dark"
        :animated="true"
        :delay="200"
        title="Configurações"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-white">Projeto Ativo</h4>
            <p class="text-gray-400 text-sm">
              Projetos inativos não aparecem no portfólio
            </p>
          </div>
          <button
            type="button"
            @click="form.is_active = !form.is_active"
            class="relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none"
            :class="form.is_active ? 'bg-green-500' : 'bg-gray-600'"
          >
            <span
              class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300"
              :class="form.is_active ? 'translate-x-6' : 'translate-x-0'"
            ></span>
          </button>
        </div>
      </GlassCard>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4">
        <NeonButton
          type="button"
          variant="ghost"
          @click="$router.back()"
          class="sm:flex-1"
        >
          Cancelar
        </NeonButton>
        <NeonButton
          type="submit"
          variant="primary"
          :loading="projectsStore.loading"
          class="sm:flex-1"
        >
          <template #icon>
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </template>
          {{ isEditing ? "Salvar Alterações" : "Criar Projeto" }}
        </NeonButton>
      </div>

      <div
        v-if="projectsStore.error"
        class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-center"
      >
        {{ projectsStore.error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useProjectsStore, type Project } from "../../stores";
import GlassCard from "../../components/ui/GlassCard.vue";
import NeonButton from "../../components/ui/NeonButton.vue";

const router = useRouter();
const projectsStore = useProjectsStore();

const props = defineProps<{
  id?: string;
}>();

const isEditing = computed(() => !!props.id);
const imageMode = ref<"upload" | "url">("url");

const form = ref<Project>({
  title: "",
  description: "",
  image_url: "",
  project_link: "",
  category: "",
  is_active: true,
});

const errors = ref<Record<string, string>>({});
const imageFile = ref<File | null>(null);
const imagePreview = ref("");
const fileInput = ref<HTMLInputElement>();

const onImageUrlInput = () => {
  errors.value.image = "";
  if (form.value.image_url && isValidUrl(form.value.image_url)) {
    imagePreview.value = form.value.image_url;
  } else {
    imagePreview.value = "";
  }
};

const onImageUrlError = () => {
  errors.value.image = "Não foi possível carregar a imagem desta URL";
};

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validate size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    errors.value.image = "Imagem deve ter no máximo 5MB";
    return;
  }

  // Validate type
  if (!file.type.startsWith("image/")) {
    errors.value.image = "Arquivo deve ser uma imagem";
    return;
  }

  imageFile.value = file;
  errors.value.image = "";

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = "";
  form.value.image_url = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const validate = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Título é obrigatório";
  }

  if (!form.value.description.trim()) {
    errors.value.description = "Descrição é obrigatória";
  }

  if (!form.value.category.trim()) {
    errors.value.category = "Categoria é obrigatória";
  }

  if (!form.value.project_link.trim()) {
    errors.value.project_link = "Link do projeto é obrigatório";
  } else if (!isValidUrl(form.value.project_link)) {
    errors.value.project_link = "Link inválido";
  }

  // Validação de imagem depende do modo
  if (imageMode.value === "url") {
    if (!isEditing.value && !form.value.image_url.trim()) {
      errors.value.image = "URL da imagem é obrigatória";
    } else if (form.value.image_url && !isValidUrl(form.value.image_url)) {
      errors.value.image = "URL da imagem inválida";
    }
  } else {
    if (!isEditing.value && !imageFile.value) {
      errors.value.image = "Imagem é obrigatória";
    }
  }

  return Object.keys(errors.value).length === 0;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const handleSubmit = async () => {
  if (!validate()) return;

  let success: boolean;

  if (imageMode.value === "url" || !imageFile.value) {
    // Enviar como JSON (funciona na Vercel)
    const jsonData = {
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      project_link: form.value.project_link,
      is_active: form.value.is_active,
      image_url: form.value.image_url || imagePreview.value,
    };

    if (isEditing.value && props.id) {
      success = await projectsStore.updateProject(Number(props.id), jsonData);
    } else {
      success = await projectsStore.createProject(jsonData);
    }
  } else {
    // Enviar como FormData (upload de arquivo - funciona apenas local)
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("description", form.value.description);
    formData.append("category", form.value.category);
    formData.append("project_link", form.value.project_link);
    formData.append("is_active", String(form.value.is_active));
    formData.append("image", imageFile.value);

    if (isEditing.value && props.id) {
      success = await projectsStore.updateProject(Number(props.id), formData);
    } else {
      success = await projectsStore.createProject(formData);
    }
  }

  if (success) {
    router.push("/admin/projects");
  }
};

// Load project data if editing
onMounted(async () => {
  if (isEditing.value && props.id) {
    const project = await projectsStore.getProject(Number(props.id));
    if (project) {
      form.value = { ...project };
      imagePreview.value = project.image_url;
      // Se já tem URL de imagem, usar modo URL
      if (project.image_url && isValidUrl(project.image_url)) {
        imageMode.value = "url";
      }
    } else {
      router.push("/admin/projects");
    }
  }
});
</script>
