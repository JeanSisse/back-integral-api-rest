const express = require('express');
const app = express();

app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];

// a)
app.get("/livros", (req, res) => {
	res.json(livros);
});

// b)
app.get("/livros/:id", (req, res) => {
	let objMensagem = {};

	if(isNaN(req.params.id)){
		objMensagem = {"mensagem": "O valor do parâmetro ID da URL não é um número válido."};
		res.json(objMensagem);
	} else {
		const livro = livros.find(livro => livro.id === Number(req.params.id));

		if(livro){
			res.json(livro);
		} else {
			objMensagem = {"mensagem": "Não existe livro para o ID informado."};
			res.json(objMensagem);
		}
	}
});

// c)

app.post("/livros", (req, res) => {
	const novoLivro = {
		id: (livros.length + 1),
		titulo: req.body.titulo,
		autor: req.body.autor,
		ano: req.body.ano,
		numPaginas: req.body.numPaginas
	};

	livros.push(novoLivro);
	res.json(novoLivro);
});

// d)

app.put("/livros/:id", (req, res) => {
	const livro = livros.find(
		(livro) => livro.id === Number(req.params.id));

	let objMensagem = {};

	if (livro) {
		livro.titulo = req.body.titulo;
		livro.autor = req.body.autor;
		livro.ano = req.body.ano;
		livro.numPaginas = req.body.numPaginas;

		objMensagem = {"mensagem": "Livro substituído."};
		res.json(objMensagem);

	} else {
		objMensagem = {"mensagem": "Não existe livro a ser substituído para o ID informado."}
		res.json(objMensagem);
	}
});

// e)

app.patch("/livros/:id", (req, res) => {
	const livro = livros.find(
		(livro) => livro.id === Number(req.params.id));

	let objMensagem = {};

	if (livro === undefined) {
		objMensagem = {"mensagem": "Não existe livro a ser alterado para o ID informado."};
	} else {
		if(req.body.titulo !== undefined){
			livro.titulo = req.body.titulo;
		}

		if(req.body.autor !== undefined){
			livro.autor = req.body.autor;
		}

		if(req.body.ano !== undefined){
			livro.ano = req.body.ano;
		}

		if(req.body.numPaginas !== undefined){
			livro.numPaginas = req.body.numPaginas;
		}

		objMensagem = {"mensagem": "Livro alterado."};
	}

	res.json(objMensagem);
});


// f)

app.delete("/livros/:id", (req, res) => {
	const livro = livros.find(
		(livro) => livro.id === Number(req.params.id));
	let objMensagem = {};
	
	if (livro) {
		const index = livros.indexOf(livro);
		livros.splice(index, 1);

		objMensagem = {"mensagem": "Livro removido."};
	} else {
		objMensagem = {"mensagem": "Não existe livro a ser removido para o ID informado."};
	}

	res.json(objMensagem);
});

app.listen(8000);