import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";

type Props = {
    path: Array<string>;
};

interface PathMap {
    'Home': string, 
    'Login': string,
    'Agency List': string,
    'Agent List': string,
    'User List': string 
}

const pathMap = {
    'Home':'/agents', 
    'Login':'/auth/login',
    'Agency List': '/agencies',
    'Agent List': '/agents',
    'User List': '/users'
};

function createCrumbs(Path: Array<string>){
    const crumbs = Path.map((element, i, {length}) => {
        if (length-1 === i) {
            return <Breadcrumb.Item active>{element}</Breadcrumb.Item>
        }

        return <Breadcrumb.Item href={pathMap[element as keyof PathMap]}>{element}</Breadcrumb.Item>
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