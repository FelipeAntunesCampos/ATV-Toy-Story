import dados from "./../models/dados.js";
const { toyStory } = dados;


const getAllToyStory = (req, res) => {
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.query;
  let resultado = toyStory;
  console.log(resultado);

  // Filtro por nome (busca parcial)
  if (nome) {
    resultado = resultado.filter((toy) =>
      toy.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // Filtro por tipo
  if (tipo) {
    resultado = resultado.filter(
      (toy) => toy.tipo.toLowerCase() === tipo.toLowerCase()
    );
  }

  // Filtro por ano Fabricação
  if (anoFabricacao) {
    resultado = resultado.find(
      (toy) => toy.anoFabricacao === anoFabricacao
    );
  }

  if (cor) {
    resultado = resultado.filter(
      (toy) => toy.cor.toLowerCase() === cor.toLowerCase()
    );
  }

  if (quantidadeEstoque) {
    resultado = resultado.find(
      (toy) => toy.quantidadeEstoque === quantidadeEstoque
    );
  }

  res.status(200).json({
    total: resultado.length,
    barbies: resultado,
  });
};

const getToyStoryById = (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  const toy = toyStory.find((b) => b.id === id);
  if (toy) {
    res.status(200).json(toy);
  } else {
    res.status(404).json({
      success: false,
      error: "ToyStory não encontrados",
      message: "Nenhum ToyStory",
      codigo: "WIZARD_NOT_FOUND",
    });
  }
};

const getToyStoryByEstoque = (req, res) => {
  const maxEstoque = Math.max(...toyStory.map(p => p.quantidadeEstoque));

  const personagensComMaisEstoque = toyStory.filter(p => p.quantidadeEstoque === maxEstoque);

  res.status(200).json({
    message: "Personagens com maior quantidade de estoque retornados com sucesso ",
    personagens: personagensComMaisEstoque,
  });
};


const createToyStory = (req, res) => {
  // Acessando dados do body
  //mudar o nodemon para node no package
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;
  console.log("Dados recebidos:", req.body);

  // Validação básica
  if (!nome || !tipo) {
    return res.status(400).json({
      success: false,
      message: "Nome e Tipo são obrigatórios para um ToyStory!",
    });
  }

  // Criar nova barbie
  const novaToy = {
    id: toyStory.length + 1,
    nome,
    tipo,
    anoFabricacao, 
    cor, 
    quantidadeEstoque
  };

  // Adicionar à lista de bruxos
  toyStory.push(novaToy);

  res.status(201).json({
    success: true,
    message: "Novo Toy adicionado a lista!",
    data: novaToy,
  });
};

//New
//Deletar um toyStory
const deleteToyStory = (req, res) => {
  let id = parseInt(req.params.id);

  //verificar se esse id existe!
  const toyParaRemover = toyStory.find((t) => t.id === id);

  if (!toyParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Este ToyStory não existe, ${id}`,
    });
  }
  const toyFiltrados = toyStory.filter((toy) => toy.id != id);

  toyStory.splice(0, toyStory.length, ...toyFiltrados);

  res.status(200).json({
    success: true,
    message: `Toy removido com sucesso`,
    ToyRemovido: toyParaRemover,
  });
};

// Atualizar um toy
const putToy = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

    const idParaEditar = id;
  
    // Verifica se a barbie foi encontrada
    if (isNaN === idParaEditar) {
      return res.status(400).json({ 
        success: false, 
        message: "O id deve ser um número válido!!!." 
      });
    }

  const toyExiste = toyStory.find(toy => toy.id === idParaEditar)

  if (!toyExiste) {
    return res.status(404).json({
      success: false,
      message: `ToyStory com Id: ${id} não existe`
    })
  }
 
  const toyAtualizados = toyStory.map(toy => toy.id === idParaEditar ? {
    ...toy,
    ...(nome && { nome }),
    ...(tipo && { tipo }),
    ...(anoFabricacao && { anoFabricacao: parseInt(anoFabricacao)}),
    ...(cor && { cor }),
    ...(quantidadeEstoque && { quantidadeEstoque: parseInt(quantidadeEstoque)})
  } : toy)

  //atualizar o array com splice
  toyStory.splice(0, toyStory.length, ...toyAtualizados);

  const toyNovo = toyStory.find(toy => toy.id === idParaEditar);
  res.status(200).json({
    success: true,
    message: `Dados do ToyStory id ${idParaEditar} atualizados com sucesso!`,
    toy: toyNovo
  })
  
}

export { getAllToyStory, getToyStoryById, createToyStory, deleteToyStory, putToy, getToyStoryByEstoque };
