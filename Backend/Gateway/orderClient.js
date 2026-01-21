const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../OrderMicroservice/protos/orderProto.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).orderProto;

const client = new orderProto.OrderService(
    "localhost:50052",
    grpc.credentials.createInsecure()
);

module.exports = client;
