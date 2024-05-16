import { DeviceInterface } from "./DeviceInterface";
import { PortForward } from "./PortForward";

export interface Device {
    id: string;
    name: string;
    settings: {
        interfaceList: Array<DeviceInterface>,
        portForwards: Array<PortForward>
    }
}