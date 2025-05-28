import pool from '../db/connect.js';

//Criar Chamado
export async function createTicket(req, res) {
  const { titulo, descricao } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO chamados (titulo, descricao) VALUES ($1, $2) RETURNING *',
      [titulo, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).send('Erro no servidor');
  }
}

//Listar todos os chamados
export async function listTicket(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM chamados ORDER BY criado_em DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
    res.status(500).send('Erro no servidor');
  }
}

//Buscar chamado por ID
export async function listTicketById(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM chamados WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).send('Chamado não encontrado');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar chamado:', error);
    res.status(500).send('Erro no servidor');
  }
}

//Atualizar chamado
export async function updateTicket(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE chamados SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *',
      [titulo, descricao, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(400).send('Chamado não encontrado');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).send('Erro no servidor');
  }
}

//Deletar Chamado
export async function deleteTicket(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM chamados WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(400).send('Chamado não encontrado');
    }
    res.status(200).json({ message: 'Chamado deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar chamado:', error);
    res.status(500).send('Erro no Servidor');
  }
}
