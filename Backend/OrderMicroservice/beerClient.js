const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + '/protos/beerProto.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const beerProto = grpc.loadPackageDefinition(packageDefinition).beerProto;

const beerClient = new beerProto.BeerService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = beerClient;