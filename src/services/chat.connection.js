import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5075/chathub", {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();
export default connection;