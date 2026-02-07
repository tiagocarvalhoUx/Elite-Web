const express = require('express');
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'project-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado. Apenas JPEG, PNG, GIF e WEBP são permitidos.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// GET /api/projects - Listar todos os projetos (público)
router.get('/', async (req, res) => {
  try {
    const { category, active, search, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (active !== undefined) {
      query += ' AND is_active = ?';
      params.push(active === 'true' ? 1 : 0);
    } else {
      // Por padrão, mostrar apenas ativos
      query += ' AND is_active = 1';
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [projects] = await pool.execute(query, params);

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET /api/projects/:id - Obter projeto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [projects] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      data: projects[0]
    });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST /api/projects - Criar novo projeto (protegido)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, project_link, category, is_active } = req.body;

    // Validações
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Título é obrigatório'
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.execute(
      `INSERT INTO projects (title, description, image_url, project_link, category, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        imageUrl,
        project_link || null,
        category || null,
        is_active !== undefined ? (is_active === 'true' ? 1 : 0) : 1
      ]
    );

    const [newProject] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Projeto criado com sucesso',
      data: newProject[0]
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT /api/projects/:id - Atualizar projeto (protegido)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, project_link, category, is_active } = req.body;

    // Verificar se projeto existe
    const [existingProjects] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    const existingProject = existingProjects[0];

    // Construir query dinâmica
    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title);
    }

    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description);
    }

    if (req.file) {
      updates.push('image_url = ?');
      params.push(`/uploads/${req.file.filename}`);
    }

    if (project_link !== undefined) {
      updates.push('project_link = ?');
      params.push(project_link);
    }

    if (category !== undefined) {
      updates.push('category = ?');
      params.push(category);
    }

    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active === 'true' || is_active === true ? 1 : 0);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar'
      });
    }

    params.push(id);

    await pool.execute(
      `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    const [updatedProject] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: updatedProject[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/projects/:id - Deletar projeto (protegido)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se projeto existe
    const [existingProjects] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    await pool.execute('DELETE FROM projects WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
