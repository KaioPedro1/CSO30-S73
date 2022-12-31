# CSO30-S73
Projeto disciplina CSO30
Integrantes: Kaio Pedro de Souza,Jezreel Gonzalez 
ra:2307200	ra:2070391

Relatório final CSO 30-S73
Resumo
	Este relatório compreende o envio do projeto final da disciplina de sistemas operacionais pela turma de sistemas de informação do segundo semestre de 2022, nele, está presente uma breve introdução do que era esperado do trabalho, bem como toda informação necessária para a instalação do projeto, os seus requisitos, dificuldades no desenvolvimento e uma breve apresentação do conteúdo final do projeto.

Introdução
	O projeto requisitado pelo professor consiste na criação de um dashboard que permita visualizar os dados do sistema operacional. O dashboard deveria conter uma interface gráfica e demonstrar em tempo real as atualizações do sistema.
Durante o desenvolvimento do projeto, o grupo tratou os dados como dois tipos: dinâmicos e estáticos. 
Os dados dinâmicos consistem em: uso da cpu, uso de cada núcleo da cpu, uso da memória ram, uso da memória virtual, processos do sistema, dados recebidos e enviados da rede conectada, processos e detalhes das redes conectadas. Para a apresentação desses dados foram utilizados gráficos e tabelas que atualizam em tempo real. 
Já os dados estáticos consistem em: detalhes da cpu, sistema operacional, placa mãe, bios,disco, memória ram, placa de vídeo e USB conectados. A sua apresentação para o usuário foi feita por meio de tabelas e texto.
	
Requisitos do projeto
	
	Existem dois requisitos primordiais para a aplicação funcionar, NODEJS e acesso a internet. É possível gerar um “makefile” utilizando uma ferramenta embutida no próprio framework utilizado para o desenvolvimento do projeto(electron forge) que cria um executável para a instalação completa e automática, sendo necessário somente “cliques” do usuário em avançar. Entretanto, não nos aprofundamos nesse tema e “rodamos” o projeto em modo desenvolvedor. Infelizmente, para a execução em modo desenvolvedor é obrigatório outras dependências primordiais, essas dependências estão listadas abaixo e serão aprofundadas no tópico de instalação.
Lista de todas as dependências
NodeJS
Git
Gerenciador de pacotes do node (NPM ou YARN ou PNPM ou outro)
Electron
Bulma
Google line charts
NodeOS
Systeminformation
ShellJS
Os itens da lista em negrito são mandatórios para a instalação, os outros são instalados pelo node package manager(NPM) que será ensinado abaixo.

Instalação do software
	Como dito no tópico anterior, vamos tratar somente da instalação em modo desenvolvedor, e, para isso, vamos precisar ter na máquina o GIT, NODEJS e NPM instalado, para simplificar, vamos fazer a instalação por etapas assumindo que as três dependências já estão instaladas na máquina. 

Clonar o repositório presente na plataforma GitHub
	https://github.com/KaioPedro1/CSO30-S73
	Para essa etapa é obrigatório a ferramenta de versionamento de código git.
 Abra o seu gitbash ou, se preferir, o terminal no caminho em que deseja clonar o repositório e cole o seguinte comando GIT: 
git clone https://github.com/KaioPedro1/CSO30-S73

	Se tudo ocorrer bem, deve aparecer uma tela parecida com isso

Trocar de repositório e instalar as dependências pelo NPM/YARN/outro

Para essa etapa é mandatório ter um gerenciador de pacotes do node, para o nosso exemplo vamos utilizar o Node Package Manager(NPM).

Primeiro, dentro do próprio terminal, troque para a pasta raiz do projeto. No exemplo abaixo eu utilizei o linux, verifique o seu sistema operacional e troque de pasta de acordo
cd CSO30-S73

Após trocar de pasta, instale as dependências utilizando o gerenciador de pacote de sua escolha. No exemplo abaixo utilizamos o NPM, verifique qual é o seu versionador de pacote e atualize de acordo
npm install

	Se tudo ocorrer bem, uma tela similar ao print abaixo deve aparecer

Esse comando é responsável por instalar todas as dependências que não estão em negrito no tópico anterior.

Inicie o projeto
Mantenha-se na mesma pasta e execute o seguinte comando
npm start

	
	Nessa etapa ele verifica se tudo foi instalado corretamente e abre o programa em modo desenvolvimento. 

Apresentação do dashboard
	O resultado final do projeto foi um programa bem simples, no qual o grande foco foi a visualização dos dados, entretanto, adicionamos duas funcionalidades a mais: um botão para a abertura do terminal(somente linux) e dois botões que servem para matar um processo pelo pid ou nome. 
O programa consiste em uma tela inicial que serve como um redirecionar para telas secundárias, a tela inicial é a tela que mais se assemelha a um dashboard tradicional, nela, existem 6 caixas e cada caixa possui 1 botão que ao clicar redireciona para as telas secundárias, uma dessas caixas somente abre o terminal. Essa tela possui 3 gráficos que atualizam a cada 1 segundo, o primeiro gráfico é o gráfico de uso da cpu, o segundo gráfico o uso da memória ram e o terceiro o uso da internet.

Tela inicial
	Ao clicar no botão da caixa de Detalhes do hardware, o usuário é redirecionado para uma nova tela que possui um botão de voltar, para a tela inicial e 8 tabs clicáveis que mostram os dados estáticos do sistema de acordo com a tab selecionada.

	Tela de hardware
	Outro fluxo do programa é o usuário pressionar o botão de alguma caixa que contém um gráfico,devido a similaridade das telas originadas por tais cliques, vamos tratar as telas originadas como iguais. 

Tela de CPU,Memória e internet

	Por fim, caso o usuário pressione o botão da caixa de processos presente na tela inicial, o programa redireciona para outra interface que contém todos os processos abertos do sistema, nele temos 2 botões que servem para finalizar o processo dado um PID ou o nome do processo.

Tela de processo
Dificuldades no desenvolvimento
As dificuldades do projeto, primeiro foi aprender a linguagem de javascript muito pouco usada até o momento porém, com o projeto foi possível desenvolver novas habilidades com essa linguagem. também houve algumas dificuldades relacionadas a baixar os arquivos as vezes nao era possivel usar o arquivo porque ele era corrompido ou não servia para o nosso projeto, outro problema que tivemos foi na hora de desenvolver no vs code, porque às vezes ele pedia baixar algumas extensões que precisávamos porém mesmo com tais extensões o programa apresentava erros relacionados ao código e as bibliotecas.
