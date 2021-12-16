import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";

type Props = {
    path: Array<string>;
};

function createCrumbs(Path: Array<string>){
    const crumbs = Path.map((element, i, {length}) => {
        if (length-1 === i) {
            return <Breadcrumb.Item active>{element}</Breadcrumb.Item>
        }

        return <Breadcrumb.Item href="#">{element}</Breadcrumb.Item>
    });
    return crumbs;
}

export const BreadcrumbComponent: FC<Props> = ({path}) => {
    return (
    <Breadcrumb>
        {createCrumbs(path)}
    </Breadcrumb>
    );
};