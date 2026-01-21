const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { placeOrder } = require("./orderService");

const PROTO_PATH = __dirname + '/protos/orderProto.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).orderProto;

const server = new grpc.Server();

server.addService(orderProto.OrderService.service, {
    PlaceOrder: placeOrder
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
        return console.error(err);
    }
    console.log(`gRPC running on ${port}`)
});
