export interface PortForward {
    wanPort: number;
    lanHost: string;
    lanHostPort: number;
    hairpinNAT: boolean;
}