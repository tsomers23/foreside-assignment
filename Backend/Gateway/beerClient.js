const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoPath = path.join(__dirname, "./proto/beerProto.proto");

const packageDef = protoLoader.loadSync(protoPath);
const beerProto = grpc.loadPackageDefinition(packageDef).beerProto;

const client = new beerProto.BeerService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;
