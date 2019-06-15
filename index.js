const restify = require('restify');

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
});

var knex = require('knex')({
	client:'mysql',
	connection:{
		host:'127.0.0.1',
		user:'root',
		password : '',
    	database : 'sistemadistribuido'
	}
});

const errs = require('restify-errors')

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(8080, function(){
	console.log('%s listening at %s', server.name, server.url);
});

//rotas rest

server.get('/',(req, res, next) =>{
	knex('emprego').then((dados) =>{
		res.send(dados)
	},next)
});

server.post('/create', (req, res, next) =>{

	knex('emprego')
	.insert(req.body)
	.then((dados) =>{
		res.send(dados)
	},next)
});

server.get('/show/:id', (req, res, next) =>{
	const { id } = req.params;

	knex('emprego')
	.where('id',id)
	.first()
	.then((dados) => {
		if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
		res.send(dados);
	},next)
});

server.put('/update/:id',(req, res, next) => {
	const { id } = req.params;

	knex('emprego')
	.where('id',id)
	.update(req.body)
	.then((dados) => {
		if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
		res.send(dados);
	},next)
});

server.del('/delete/:id',(req, res, next) => {
	const { id } = req.params;

	knex('emprego')
	.where('id',id)
	.delete()
	.then((dados) => {
		if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
		res.send("Registro Excluido");
	},next)
});

server.get('/positions.json',(req, res, next)=>{
	const { description, location, full_time } = req.query;

	console.log(req.query)

	console.log(description, location, full_time);

	if(description != null && !location && !full_time) {
		knex('emprego')
		.where('description',description)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	} else 	if(!description && location!=null && !full_time) {
		knex('emprego')
		.where('location',location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	
	}else 	if(!description && !location && full_time != null) {
		knex('emprego')
		.where('fulltime',full_time)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	
	}else if(description != null && location != null && !full_time) {
		knex('emprego')
		.where('description',description)
		.where('location', location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}else if(description != null && !location && full_time != null) {
		knex('emprego')
		.where('description',description)
		.where('location', location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}  else if(description != null && location != null && full_time !=null) {
		knex('emprego')
		.where('description',description)
		.where('location', location)
		.where('fulltime',full_time)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}
	// knex('emprego')
	// .whereNotNull('description',description)
	// .whereNotNull('location', location)
	// .whereNotNull('fulltime', full_time)
	// .then((dados) => {
	// 	if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
	// 	res.send(dados);
	// },next)
});


server.get('/postions/:id.json',(req, res, next)=>{
	const { id } = req.params;

	knex('emprego')
	.where('idEmprego',id)
	.first()
	.then((dados) => {
		if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
		res.send(dados);
	},next)
});