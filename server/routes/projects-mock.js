// Versão temporária sem banco de dados - com persistência em JSON
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authenticateToken } = require("../middleware/auth");

// Caminho para o arquivo de dados persistentes
const DATA_FILE = path.join(__dirname, "../data/projects.json");
const DATA_DIR = path.join(__dirname, "../data");

const router = express.Router();

// Helper para gerar URL base
const getBaseUrl = (req) => {
  // Em produção, usar HTTPS
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : req.protocol;
  return `${protocol}://${req.get("host")}`;
};

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "project-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Tipo de arquivo não suportado. Apenas JPEG, PNG, GIF e WEBP são permitidos.",
      ),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// URLs das imagens reais do projeto (usando placeholder por enquanto)
const getPlaceholderUrl = (id) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23111131"/><rect x="40" y="40" width="720" height="520" rx="24" ry="24" fill="%231a1d28" stroke="%232c3142" stroke-width="2"/><text x="400" y="315" font-family="Arial, sans-serif" font-size="28" fill="%238a94b2" text-anchor="middle">Sem imagem</text></svg>`;

// Projetos padrão iniciais
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "MRV House",
    description:
      "Site imobiliário moderno com busca avançada de imóveis e interface elegante",
    image_url:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    project_link: "https://mrv-house.vercel.app/",
    category: "Imobiliário",
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Pet Shop",
    description:
      "E-commerce completo para pet shop com agendamento e catálogo de produtos",
    image_url:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
    project_link: "https://petshop-chi.vercel.app/",
    category: "E-commerce",
    is_active: true,
    created_at: "2024-01-20T14:30:00Z",
  },
  {
    id: 3,
    title: "Coffee Web",
    description:
      "Landing page elegante para cafeteria artesanal com cardápio digital",
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    project_link: "https://coffe-web-henna.vercel.app/",
    category: "Landing Page",
    is_active: true,
    created_at: "2024-02-01T09:15:00Z",
  },
  {
    id: 4,
    title: "Marcenaria",
    description:
      "Site institucional para marcenaria com galeria de trabalhos e orçamentos",
    image_url:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800",
    project_link: "https://marcenaria-vue.vercel.app/",
    category: "Institucional",
    is_active: true,
    created_at: "2024-02-05T11:00:00Z",
  },
  {
    id: 5,
    title: "Reza Vela",
    description:
      "E-commerce de velas artesanais com aromaterapia e produtos premium",
    image_url:
      "https://images.unsplash.com/photo-1602607688655-94e4730c5f2e?w=800",
    project_link: "https://reza-vela.vercel.app/",
    category: "E-commerce",
    is_active: true,
    created_at: "2024-02-10T16:45:00Z",
  },
  {
    id: 6,
    title: "Caetano Hidráulica",
    description:
      "Site corporativo para empresa de serviços hidráulicos com contato direto",
    image_url:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800",
    project_link: "https://caetano-hidraulica.vercel.app/",
    category: "Serviços",
    is_active: true,
    created_at: "2024-02-15T08:30:00Z",
  },
  {
    id: 7,
    title: "Burger Layout",
    description:
      "Cardápio digital para hamburgueria com design moderno e pedidos online",
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    project_link: "https://cardapio-hambuguer-three.vercel.app/",
    category: "Food & Drink",
    is_active: true,
    created_at: "2024-02-20T13:20:00Z",
  },
  {
    id: 8,
    title: "Barbearia",
    description:
      "Site institucional para barbearia com agendamento de horários e serviços",
    image_url:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800",
    project_link: "https://barbearia-react-eight.vercel.app/",
    category: "Beleza",
    is_active: true,
    created_at: "2024-02-25T10:00:00Z",
  },
  {
    id: 9,
    title: "Faster Food",
    description:
      "Delivery de comidas rápidas com cardápio interativo e promoções",
    image_url:
      "https://images.unsplash.com/photo-1561758033-d9a63f80764a?w=800",
    project_link: "https://faster-food-omega.vercel.app/",
    category: "Food & Drink",
    is_active: true,
    created_at: "2024-03-01T15:30:00Z",
  },
];

// Funções para persistência dos dados
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log("📁 Diretório de dados criado:", DATA_DIR);
  }
};

const loadProjects = () => {
  ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      const parsed = JSON.parse(data);
      console.log(
        `📂 ${parsed.projects.length} projetos carregados do arquivo`,
      );
      return parsed;
    }
  } catch (error) {
    console.error(
      "⚠️ Erro ao carregar projetos, usando padrão:",
      error.message,
    );
  }
  // Se não existir arquivo ou houver erro, usar projetos padrão
  return { projects: [...DEFAULT_PROJECTS], nextId: 10 };
};

const saveProjects = () => {
  ensureDataDir();
  try {
    const data = JSON.stringify({ projects, nextId }, null, 2);
    fs.writeFileSync(DATA_FILE, data, "utf8");
    console.log(`💾 ${projects.length} projetos salvos no arquivo`);
  } catch (error) {
    console.error("❌ Erro ao salvar projetos:", error.message);
    // Don't throw, just log
  }
};

// Carregar projetos persistidos ou usar padrão
const loadedData = loadProjects();
let projects = loadedData.projects;
let nextId = loadedData.nextId;

// GET /api/projects - Listar todos
router.get("/", async (req, res) => {
  try {
    const { category, active, search } = req.query;

    let filtered = [...projects];

    // Por padrão, mostrar apenas ativos
    if (active !== "false") {
      filtered = filtered.filter((p) => p.is_active);
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const project = projects.find((p) => p.id === parseInt(req.params.id));
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Projeto não encontrado" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/projects - Criar (protegido)
// Middleware condicional: só usa multer se for multipart/form-data
router.post(
  "/",
  authenticateToken,
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    console.log("Content-Type:", contentType);
    if (contentType.includes("multipart/form-data")) {
      upload.single("image")(req, res, (err) => {
        if (err) {
          console.error("Multer error:", err);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        next();
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      console.log("POST /api/projects - Body:", req.body);
      console.log("File:", req.file);
      const {
        title,
        description,
        project_link,
        category,
        is_active,
        image_url,
      } = req.body;

      console.log("Parsed data:", {
        title,
        description,
        project_link,
        category,
        is_active,
        image_url,
      });

      // URL da imagem: prioridade para upload, depois URL do body, depois placeholder
      let imageUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23111131"/><rect x="40" y="40" width="720" height="520" rx="24" ry="24" fill="%231a1d28" stroke="%232c3142" stroke-width="2"/><text x="400" y="315" font-family="Arial, sans-serif" font-size="28" fill="%238a94b2" text-anchor="middle">Sem imagem</text></svg>`;
      if (req.file) {
        imageUrl = `${getBaseUrl(req)}/uploads/${req.file.filename}`;
      } else if (
        image_url &&
        (image_url.startsWith("http://") ||
          image_url.startsWith("https://") ||
          image_url.startsWith("data:"))
      ) {
        imageUrl = image_url;
      }

      console.log("Image URL:", imageUrl);

      const newProject = {
        id: nextId++,
        title,
        description: description || "",
        image_url: imageUrl,
        project_link: project_link || "",
        category: category || "Outro",
        is_active: is_active !== "false" && is_active !== false,
        created_at: new Date().toISOString(),
      };

      console.log("New project:", newProject);

      projects.push(newProject);
      saveProjects(); // Persistir no arquivo

      console.log("✅ Projeto criado:", newProject);

      res.status(201).json({
        success: true,
        message: "Projeto criado com sucesso",
        data: newProject,
      });
    } catch (error) {
      console.error("❌ Erro ao criar projeto:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// PUT /api/projects/:id - Atualizar (protegido)
// Middleware condicional: só usa multer se for multipart/form-data
router.put(
  "/:id",
  authenticateToken,
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      upload.single("image")(req, res, next);
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = projects.findIndex((p) => p.id === id);

      if (index === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Projeto não encontrado" });
      }

      const {
        title,
        description,
        project_link,
        category,
        is_active,
        image_url,
      } = req.body;

      // Se tiver nova imagem, usar ela (upload ou URL do body)
      let imageUrl = projects[index].image_url;
      if (req.file) {
        imageUrl = `${getBaseUrl(req)}/uploads/${req.file.filename}`;
      } else if (image_url !== undefined) {
        imageUrl = image_url;
      }

      projects[index] = {
        ...projects[index],
        title: title !== undefined ? title : projects[index].title,
        description:
          description !== undefined ? description : projects[index].description,
        project_link:
          project_link !== undefined
            ? project_link
            : projects[index].project_link,
        category: category !== undefined ? category : projects[index].category,
        image_url: imageUrl,
        is_active:
          is_active !== undefined
            ? is_active === "true" || is_active === true
            : projects[index].is_active,
      };

      console.log("✅ Projeto atualizado:", projects[index]);
      saveProjects(); // Persistir no arquivo

      res.json({
        success: true,
        message: "Projeto atualizado com sucesso",
        data: projects[index],
      });
    } catch (error) {
      console.error("❌ Erro ao atualizar projeto:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// DELETE /api/projects/:id - Deletar (protegido)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Projeto não encontrado" });
    }

    projects.splice(index, 1);
    saveProjects(); // Persistir no arquivo

    res.json({ success: true, message: "Projeto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
