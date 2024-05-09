// seleciona os elementos html
const characterId = document.getElementById('characterId');
const btn = document.getElementById('btn');
const content = document.getElementById('content');
const reset = document.getElementById('reset');

// Função para fazer uma requisição à API e retornar os dados do personagem
const buscaApi = (value) => {
  return fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json()) // Converte a resposta para JSON
    .then((data) => {
      return data; // Retorna os dados obtidos da API
    });
};

// Lista das chaves (propriedades) que desejamos exibir do objeto retornado pela API
const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];

// Mapeamento dos nomes das chaves para nomes mais descritivos
const newName = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Origem',
  episode: 'Episódio',
};

// Função para exibir os resultados na página com base nas chaves selecionadas
const resultados = (result, keys) => {
  keys.forEach((key) => {
    // Itera sobre cada chave do array 'keys'
    const element = document.getElementById(key); // Obtém o checkbox correspondente à chave
    if (element.checked) {
      // Verifica se o checkbox está marcado
      const novoElemento = document.createElement('p'); // Cria um novo elemento parágrafo
      const newNameKey = newName[key] || key; // Obtém o nome descritivo da chave, se definido em 'newName'
      if (Array.isArray(result[key])) {
        // Verifica se o valor da chave é um array
        novoElemento.innerHTML = `${newNameKey}: ${result[key].join(', ')}`; // Exibe o array como uma string separada por vírgulas
      } else if (typeof result[key] === 'object') {
        // Verifica se o valor da chave é um objeto
        novoElemento.innerHTML = `${newNameKey}: ${JSON.stringify(
          result[key],
        )}`; // Exibe o objeto como uma string JSON
      } else {
        // Se o valor não for um array nem um objeto
        novoElemento.innerHTML = `${newNameKey}: ${result[key]}`; // Exibe o valor normalmente
      }
      content.appendChild(novoElemento); // Adiciona o novo elemento à div de conteúdo na página
    }
  });
};

// Adiciona um event listener para o botão de busca
btn.addEventListener('click', async (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  if (characterId.value === '') {
    // Verifica se o campo de ID está vazio
    return (content.innerHTML = 'É necessário colocar um filtro'); // Exibe uma mensagem de erro na página
  }
  const result = await buscaApi(characterId.value); // Faz a requisição à API e espera pelos resultados
  content.innerHTML = ''; // Limpa o conteúdo anterior na div de conteúdo
  img.src = `${result.image}`;
  resultados(result, keys); // Exibe os resultados na página
});

reset.addEventListener('click', () => location.reload()); // adiciona a função de refresh da pagina quando clicado
