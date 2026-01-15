const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { getAllBeers, getBeer } = require("./beerService");

const PROTO_PATH = __dirname + '/protos/beerProto.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const beerProto = grpc.loadPackageDefinition(packageDefinition).beerProto;

const server = new grpc.Server();

server.addService(beerProto.BeerService.service, {
    GetAllBeers: getAllBeers,
    GetBeer: getBeer
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
        return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
});
