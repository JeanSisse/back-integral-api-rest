const express = require("express");
const app = express();

app.use(express.json());


const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];


// a)

// app.get("/convidados", (req, res) => {
// 	res.json(convidados);
// });
 
// a) + b)

app.get("/convidados", (req, res) => {
	if (req.query.nome === undefined) {
		res.json(convidados);
	} else {
		const nomeConvidado = convidados.find(
			(nome) => nome === req.query.nome);

		const objMensagem = nomeConvidado === undefined ? 
			{"mensagem": "O convidado buscado não está presente na lista."} : 
			{"mensagem": "Convidado presente."}

		res.json(objMensagem);
	}
});

// c)

app.post("/convidados", (req, res) => {
	const nomeConvidado = convidados.find(nome => nome === req.body.nome);
	let objMensagem = {};

	if(nomeConvidado !== undefined){
		objMensagem = { "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."}
		
	} else {
		convidados.push(req.body.nome);
		objMensagem = {"mensagem": "Convidado adicionado."}
	}

	res.json(objMensagem);
});

// d)

app.delete("/convidados/:nome", (req, res) => {
	const nomeConvidado = convidados.find(nome => nome === req.params.nome);

	let objMensagem = {};

	if(nomeConvidado === undefined){
		objMensagem = {"mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."}
		
	} else {
		const index = convidados.indexOf(objMensagem);
		convidados.splice(index, 1);
		objMensagem = {"mensagem": "Convidado removido."}
	}

	res.json(objMensagem);
});

app.listen(8000);