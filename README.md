# Quem é esse Pokémon?

Este é um projeto Angular + Ionic que consome a PokéAPI e permite buscar informações de qualquer Pokémon pelo nome ou ID. A interface é responsiva, temática e amigável para fãs de Pokémon!
Este projeto é uma avaliação técnica desenvolvida utilizando componentes standalone, consumindo a PokeAPI para exibir, detalhar e favoritar Pokémons. O repositório segue boas práticas de versionamento, arquitetura e responsividade, e pode ser acompanhado em:
https://github.com/Ld36/quem_e_esse_pokemon.git

---

## 🖼️ Demonstração

![Tela inicial do app com tema Pokémon](./src/assets/images/telahome.png)

---

## 🚀 Funcionalidades

- Busca de Pokémon por nome ou ID
- Exibição de informações detalhadas do Pokémon
- Interface responsiva e temática
- Consumo da PokéAPI em tempo real

---

##  Abordagem e Padrões

1. Arquitetura modular: Estrutura baseada em features, separando responsabilidades em pastas como features, shared e core, facilitando manutenção e escalabilidade.
2. Componentes Standalone: Utilização do padrão standalone do Angular para simplificar a composição e importação de componentes e rotas.
3. Consumo de API RESTful: Integração com a PokeAPI para listar Pokémons, exibir detalhes e imagens, e manipular favoritos.
4. Paginação: Implementação de paginação para melhor usabilidade na listagem dos Pokémons.
5. Navegação e Rotas: Uso do Angular Router para navegação entre tela principal, detalhes e favoritos.
6. Favoritos: Usuário pode marcar/desmarcar Pokémons como favoritos, persistindo a seleção localmente.
7. Responsividade: Interface adaptada para diferentes tamanhos e orientações de tela, garantindo boa experiência em dispositivos móveis.
8. Injeção de dependência: Serviços são injetados via Angular DI, promovendo baixo acoplamento e fácil testabilidade.
9. Boas práticas de código: Commits frequentes e claros, código limpo, tipado e documentado.
10. Preparado para diferenciais: Estrutura pronta para testes unitários, documentação técnica e inclusão de mídia demonstrativa.
Sinta-se à vontade para explorar, sugerir melhorias ou utilizar como referência para projetos modernos com Ionic e Angular!

---

## 🛠️ Tecnologias Utilizadas

- [Angular 20](https://angular.io/)
- [Ionic 7](https://ionicframework.com/)
- [PokéAPI](https://pokeapi.co/)
- SCSS para temas e responsividade

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)
- [Ionic CLI](https://ionicframework.com/docs/cli) (opcional, mas recomendado)

Instale o Ionic CLI globalmente (opcional):
```bash
npm install -g @ionic/cli
```

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/quem-e-esse-pokemon.git
cd quem-e-esse-pokemon
npm install
```

---

## ▶️ Como rodar a aplicação

### Ambiente de desenvolvimento

```bash
ionic serve
```
ou, se preferir apenas Angular:
```bash
ng serve
```

Acesse no navegador:  
[http://localhost:4200](http://localhost:4200)

---

## 🖱️ Como usar

1. Digite o nome ou ID de um Pokémon no campo de busca (ex: `pikachu` ou `25`)
2. Clique em **Buscar**
3. Veja as informações detalhadas do Pokémon na tela

---

## 📝 Estrutura de Pastas

```
src/
  app/
    components/
      pokemon-info/
        pokemon-info.component.ts
        pokemon-info.component.html
        pokemon-info.component.scss
    home/
      home.page.ts
      home.page.html
      home.page.scss
    app.component.ts
    app.routes.ts
  assets/
    images/
      pokethemes.jpg
  styles.scss
```

---

## 🐞 Dicas e Solução de Problemas

- Se o tema de fundo não aparecer, verifique se a imagem está em `src/assets/images/pokethemes.jpg` e se o caminho no SCSS está correto.
- Se não conseguir digitar no input, confira se o `FormsModule` está nos imports do componente.
- Se a PokéAPI estiver fora do ar, o app pode não retornar resultados.

---

## 📄 Licença

Este projeto é open-source e está sob a licença MIT.

---

## 🤝 Contribua!

Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções ou novas funcionalidades!