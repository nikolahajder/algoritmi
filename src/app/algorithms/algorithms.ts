import { IPath } from "./paths";

export interface IAlgorithm {
    id: number;
    title: string;
    description: string;
    paths: IPath;
}